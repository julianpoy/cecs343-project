<template>
  <div class="container">
    <div class="pageTitle">
      {{ recipe.title }}

      <div class="actions">
        <button
          v-if="!recipe.is_mine"
          v-on:click="duplicateRecipe()">Save to my recipe library</button>
        <button
          v-if="recipe.is_mine"
          v-on:click="editRecipe()">Edit</button>
        <button
          v-if="recipe.is_mine"
          v-on:click="deleteRecipe()">Delete</button>
      </div>
    </div>
    <br />

    <b>Description:</b><br />
    <div class="preserveWhitespace">{{ recipe.description }}</div><br /><br />
    <b>Ingedients:</b> <br />
    <div
      class="preserveWhitespace"
      v-for="ingredient in ingredients"
      :key="ingredient"
      v-html="ingredient"></div><br />
    <b>Ingedient Scale:</b> <br />
    <input type="text" v-model="scaleInput" /><br /><br />
    <b>Instructions:</b> <br />
    <div class="preserveWhitespace">{{ recipe.instructions }}</div><br /><br />
    <b>Notes:</b> <br />
    <div class="preserveWhitespace">{{ recipe.notes }}</div><br /><br /><br />

    <b>Last updated:</b><br />
    {{ new Date(recipe.updated_at).toLocaleString() }}<br /><br />

    <b>Created:</b><br />
    {{ new Date(recipe.created_at).toLocaleString() }}<br /><br />

    <b>This recipe is {{ recipe.is_public ? 'public' : 'private' }}.</b><br />

    <b v-if="recipe.is_mine">This recipe is yours.</b>
    <b v-if="!recipe.is_mine">
      This recipe was posted by {{ (recipe.user_id || {}).screenname || 'another user' }}.
      You can save this recipe to your libary.
    </b>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';
import fractionjs from 'fraction.js';

export default {
  name: 'ViewRecipe',
  data() {
    return {
      recipe: {},
      scaleInput: 1,
      scale: 1,
      ingredients: '',
      error: '',
    };
  },
  methods: {
    duplicateRecipe() {
      ApiConnectorService.recipes.duplicate(this.$route.params.id, (response) => {
        window.location.href = `/#/recipes/${response._id}`;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
    editRecipe() {
      window.location.href = `/#/recipes/edit/${this.recipe._id}`;
    },
    deleteRecipe() {
      ApiConnectorService.recipes.delete(this.recipe._id, () => {
        window.location.href = '/#/recipes';
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
    fetchRecipe(id) {
      ApiConnectorService.recipes.getById(id, (response) => {
        this.recipe = response;
        this.applyScale();
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
    setScale(scale) {
      let adjustedScale = scale;
      if (!adjustedScale || adjustedScale <= 0) adjustedScale = 1;

      adjustedScale = parseFloat(adjustedScale) || 1;

      this.scale = adjustedScale;

      const me = this;
      setTimeout(() => {
        me.applyScale();
      }, 0);
    },
    applyScale() {
      if (!this.recipe.ingredients) return;

      const lines = this.recipe.ingredients.match(/[^\r\n]+/g);

      // eslint-disable-next-line
      let measurementRegexp = /((\d+ )?\d+([\/\.]\d+)?((-)|( to )|( - ))(\d+ )?\d+([\/\.]\d+)?)|((\d+ )?\d+[\/\.]\d+)|\d+/;

      for (let i = 0; i < lines.length; i += 1) {
        const matches = lines[i].match(measurementRegexp);
        if (matches && matches.length > 0) {
          const measurement = matches[0];

          try {
            const measurementParts = measurement.split(/-|to/);

            for (let j = 0; j < measurementParts.length; j += 1) {
              let scaledMeasurement = fractionjs(measurementParts[j].trim()).mul(this.scale);

              // Preserve original fraction format if entered
              if (measurementParts[j].indexOf('/') > -1) {
                scaledMeasurement = scaledMeasurement.toFraction(true);
              }

              measurementParts[j] = `<b>${scaledMeasurement}</b>`;
            }

            lines[i] = lines[i].replace(measurementRegexp, measurementParts.join(' to '));
          } catch (e) {
            // eslint-disable-next-line
            console.log('failed to parse', e);
          }
        }
      }

      this.ingredients = lines;
    },
  },
  watch: {
    scaleInput(val) {
      this.setScale(val);
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchRecipe(to.params.id);
    next();
  },
  beforeMount() {
    this.fetchRecipe(this.$route.params.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
