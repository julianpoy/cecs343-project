<template>
  <div class="container">
    <div class="pageTitle">
      New Recipe
    </div>
    <br />
    <input v-model="recipe.title" placeholder="Title" /><br />
    <textarea cols="40" v-model="recipe.description" placeholder="Description" /><br />
    <textarea cols="40" v-model="recipe.instructions" placeholder="Instructions" /><br />
    <textarea cols="40" v-model="recipe.ingredients" placeholder="Ingredients" /><br />
    <textarea cols="40" v-model="recipe.notes" placeholder="Notes" /><br /><br />
    <button v-on:click="save()">Save</button>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'NewRecipe',
  data() {
    return {
      recipe: {},
      error: ''
    };
  },
  methods: {
    save() {
      ApiConnectorService.recipes.create(this.recipe, (response) => {
        window.location.href = `/#/recipes/${response['_id']}`;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input, textarea {
  width: calc(100% - 20px);
}
</style>
