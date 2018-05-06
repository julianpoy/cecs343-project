<template>
  <div class="container">
    <button v-on:click="exportRecipes()">Export my recipes</button>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {};
  },
  methods: {
    exportRecipes() {
      alert("Placeholder - Will take user to external link to download")
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
