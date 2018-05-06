<template>
  <div class="container">
    {{ recipe.title }}
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
  beforeMount() {
    ApiConnectorService.save(this.recipe, (response) => {
      this.recipe = response;
    }, (err) => {
      this.error = `There was an error... ${err.response.data.msg}`;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
