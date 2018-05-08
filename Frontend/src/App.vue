<template>
  <div id="app">
    <div class="nav">
      <div class="nav-header">
        RecipeMe
      </div>
      <div class="nav-content">
        <div class="item" v-if="isLoggedIn()" v-on:click="goTo('recipes')">
          Recipes
        </div>
        <div class="item" v-if="isLoggedIn()" v-on:click="goTo('settings')">
          Settings
        </div>
        <div class="item" v-if="isLoggedIn()" v-on:click="logout()">
          Logout
        </div>
        <div class="item" v-if="!isLoggedIn()" v-on:click="goTo('auth')">
          Login or Register
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    goTo(route) {
      window.location.href = `/#/${route}`;
    },
    logout() {
      localStorage.removeItem('token');
      this.goTo('auth');
    },
    isLoggedIn() {
      return localStorage.getItem('token');
    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

html {
  background: #f9f9f9;
}

body {
  background: white;
  box-shadow: 1px 1px 7px rgba(0,0,0,0.7);
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
}

.nav {
  box-shadow: 1px 1px 7px rgba(0,0,0,0.7);
  background: #222f3e;
  color: white;
}

.nav .nav-header {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.nav .nav-content {
  float: right;
  text-align: right;
}

.nav .nav-content .item {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

.container {
  padding: 20px;
}

.pageTitle {
  font-size: 25px;

  margin-bottom: 50px;
}

.pageTitle .actions {
  float: right;
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

@media screen and (max-width: 600px) {
  .nav .nav-content {
    padding-right: 5px;
  }

  .nav .nav-content .item {
    padding-left: 5px;
    padding-right: 5px;
  }
}

</style>
