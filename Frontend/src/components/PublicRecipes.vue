<template>
  <div class="container">
    <div class="pageTitle">
      Public Recipes
    </div>
    <div class="recipeListContainer">
      <div
        class="recipe"
        v-for="recipe in recipes"
        :key="recipe._id"
        v-on:click="openRecipe(recipe._id)">
        <b>{{ recipe.title }}</b><br /><br />
        {{ recipe.description }}
      </div>
    </div>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'PublicRecipes',
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
    ApiConnectorService.recipes.fetch({
      listPublic: true,
    }, (recipes) => {
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
  flex-wrap: wrap;
}

.recipeListContainer .recipe {
  padding: 15px;
  margin: 10px;
  box-shadow: 1px 1px 7px rgba(0,0,0,0.7);
  min-width: 300px;
}

@media screen and (max-width: 600px) {
  .recipeListContainer .recipe {
    min-width: 0;
    width: 100%;
  }
}
</style>
