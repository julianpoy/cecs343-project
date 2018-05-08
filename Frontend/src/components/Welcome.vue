<template>
  <div class="container">
    <div class="pageTitle">
      Welcome
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {};
  },
  beforeMount() {
    if (localStorage.getItem('token')) {
      window.location.href = '/#/recipes';
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 20px;
  }
</style>
