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
  name: 'Auth',
  data() {
    return {
      recipe: {},
      error: ''
    };
  },
  methods: {
    save() {
      ApiConnectorService.create(this.recipe, (response) => {
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
  .container {
    padding: 20px;
  }
  
  .pageTitle {
    display: inline-block;
    
    font-size: 25px;
    
    margin-bottom: 50px;
  }
  
  input, textarea {
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width: calc(100% - 20px);
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
