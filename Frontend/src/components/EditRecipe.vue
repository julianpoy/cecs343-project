<template>
  <div class="container">
    <div class="pageTitle">
      Editing {{ recipe.title }}
    </div>
    <br />
    <b>Title:</b><br />
    <input v-model="recipe.title" placeholder="Title" /><br />
    <b>Description:</b><br />
    <textarea cols="40" rows="1" v-model="recipe.description" placeholder="Description" /><br />
    <b>Instructions:</b><br />
    <textarea cols="40" rows="6" v-model="recipe.instructions" placeholder="Instructions" /><br />
    <b>Ingredients:</b><br />
    <textarea cols="40" rows="6" v-model="recipe.ingredients" placeholder="Ingredients" /><br />
    <b>Notes:</b><br />
    <textarea cols="40" rows="4" v-model="recipe.notes" placeholder="Notes" /><br />
    <div><input id="isPublic" v-model="recipe.is_public" type="checkbox" />
    <label for="isPublic">Make public</label></div><br /><br />
    <button v-on:click="save()">Save</button>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: {},
      error: '',
    };
  },
  methods: {
    save() {
      ApiConnectorService.recipes.update(this.recipe._id, this.recipe, (response) => {
        window.location.href = `/#/recipes/${response._id}`;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
    fetchRecipe(id) {
      ApiConnectorService.recipes.getById(id, (response) => {
        this.recipe = response;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
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
#isPublic {
  width: auto;
}
</style>
