<template>
  <div class="container">
    <div class="pageTitle">
      {{ recipe.title }}

      <div class="actions">
        <button *ngIf="!recipe.is_mine">Save to my recipe library</button>
        <button *ngIf="recipe.is_mine">Edit</button>
        <button *ngIf="recipe.is_mine">Delete</button>
      </div>
    </div>
    <br />

    Description: {{ recipe.description }}<br /><br />
    Ingedients: <br />
    {{ recipe.ingredients }}<br /><br />
    Instructions: <br />
    {{ recipe.instructions }}<br />
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'ViewRecipe',
  data() {
    return {
      recipe: {},
      error: '',
    };
  },
  methods: {
    duplicate() {
      ApiConnectorService.recipes.duplicate(this.$route.params.id, (response) => {
        window.location.href = `/#/recipes/${response._id}`;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
  },
  beforeMount() {
    ApiConnectorService.recipes.getById(this.$route.params.id, (response) => {
      this.recipe = response;
    }, (err) => {
      this.error = `There was an error... ${err.response.data.msg}`;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
