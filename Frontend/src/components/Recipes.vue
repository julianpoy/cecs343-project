<template>
  <div class="container">
    <div class="pageTitle">
      Recipes
      
      <div class="actions">
        <button v-on:click="createRecipe()">New Recipe</button>
      </div>
    </div>
    <div class="recipeListContainer">
      <div class="recipe" v-for="recipe in recipes" :key="recipe._id" v-on:click="openRecipe(recipe._id)">
        <b>{{ recipe.title }}</b><br /><br />
        {{ recipe.description }}
      </div>
    </div>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'Recipes',
  data() {
    return {
      recipes: [],
      error: '',
    };
  },
  methods: {
    createRecipe() {
      window.location.href = '/#/recipes/new';
    },
    openRecipe(id) {
      window.location.href = `/#/recipes/${id}`;
    },
  },
  beforeMount() {
    ApiConnectorService.recipes.fetch((recipes) => {
      this.recipes = recipes;
    }, (err) => {
      this.error = `There was an error... ${err.message}`;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recipeListContainer {
  display: flex;
}

.recipeListContainer .recipe {
  padding: 15px;
  margin: 10px;
  box-shadow: 1px 1px 7px rgba(0,0,0,0.7);
  min-width: 300px;
}
</style>
