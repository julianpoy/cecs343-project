<template>
  <div class="container">
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
  .recipe {
    border: 1px solid blue;
    padding: 5px;
    margin: 10px;
  }
</style>
