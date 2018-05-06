<template>
  <div class="container">
    
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
      ApiConnectorService.save(this.recipe, (response) => {
        window.location.href = `/#/recipes/${response._id}`;
      }, (err) => {
        this.error = `There was an error... ${err.response.data.msg}`;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
