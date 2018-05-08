<template>
  <div class="container">
    <div class="pageTitle">
      {{ recipe.title }}
      
      <div class="actions">
        <button>Edit</button>
        <button>Delete</button>
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
      error: ''
    };
  },
  beforeMount() {
    ApiConnectorService.recipes.getById(this.$route.params.id, (response) => {
      this.recipe = response;
    }, (err) => {
      this.error = `There was an error... ${err.response.data.msg}`;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
