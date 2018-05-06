<template>
  <div class="container">
    <div class="pageTitle">
      Recipes
    </div>
    <div class="newRecipe">
      <button class="standard" v-on:click="createRecipe()">New Recipe</button>
    </div>
    <br />
    <div class="recipe" v-for="recipe in recipes" :key="recipe._id">
      {{ recipe.title }}
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
  .container {
    padding: 20px;
  }

  .recipe {
    border: 1px solid blue;
    padding: 5px;
    margin: 10px;
  }
  
  .pageTitle {
    display: inline-block;
    
    font-size: 25px;
    
    margin-bottom: 50px;
  }
  
  .newRecipe {
    float: right;
  }
  
  button {
    border: none;
    padding: 10px;
    background: #273c75;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
