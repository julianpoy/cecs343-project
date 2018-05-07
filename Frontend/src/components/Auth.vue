<template>
  <div class="container">
    <br /><br /><br />
    {{ isRegistering ? 'Register' : 'Login' }}
    <br /><br />
    <form onsubmit="return false">
      <input v-if="isRegistering" v-model="name" class="standard name" placeholder="Name" type="text" />
      <br />
      <input v-model="username" class="standard username" placeholder="E-Mail" type="text" />
      <br />
      <input v-model="password" class="standard password" placeholder="Password" type="password" />
      <br v-if="isRegistering" />
      <input
        v-if="isRegistering"
        v-model="confirm"
        class="password"
        placeholder="Confirm password"
        type="password" />
      <br /><br />
      <button type="submit" class="standard submit" v-on:click="auth">{{ isRegistering ? 'Register' : 'Login' }}</button>
    </form>
    <br /><br />
    <a v-if="!isRegistering" v-on:click="isRegistering = true">Register Instead</a>
    <a v-if="isRegistering" v-on:click="isRegistering = false">Login Instead</a>
    <br /><br />
    {{ error }}
  </div>
</template>

<script>
import ApiConnectorService from '@/services/ApiConnectorService';
/* global localStorage */

export default {
  name: 'Auth',
  data() {
    return {
      isRegistering: false,
      name: '',
      username: '',
      password: '',
      confirm: '',
      error: '',
    };
  },
  methods: {
    auth() {
      if (this.isRegistering) {
        if (this.password !== this.confirm) {
          this.error = 'Passwords do not match.';
          return;
        }

        ApiConnectorService.users.register(this.name, this.username, this.password, (response) => {
          localStorage.setItem('token', response.token);

          window.location.href = '/#/recipes';
        }, (err) => {
          this.error = `There was an error... ${err.response.data.msg}`;
        });
      } else {
        ApiConnectorService.users.login(this.username, this.password, (response) => {
          localStorage.setItem('token', response.token);

          window.location.href = '/#/recipes';
        }, (err) => {
          this.error = `There was an error... ${err.response.data.msg}`;
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    text-align: center;
  }

  a {
    cursor: pointer;
    font-size: 12px;
    text-decoration: underline;
  }
  
  input, textarea {
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
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
