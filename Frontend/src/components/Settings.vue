<template>
  <div class="container">
    <button v-on:click="exportRecipes()">Export my recipes</button>
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';

export default {
  name: 'Settings',
  data() {
    return {};
  },
  methods: {
    exportRecipes() {
      ApiConnectorService.recipes.openExport();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    text-align: center;
  }
</style>
