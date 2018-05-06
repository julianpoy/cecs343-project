<template>
  <div class="container">
    <br /><br /><br />
    {{ isRegistering ? 'Register' : 'Login' }}
    <br /><br />
    <input v-if="isRegistering" v-model="name" class="name" placeholder="Name" type="text" />
    <br />
    <input v-model="username" class="username" placeholder="Username" type="text" />
    <br />
    <input v-model="password" class="password" placeholder="Password" type="password" />
    <br v-if="isRegistering" />
    <input
      v-if="isRegistering"
      v-model="confirm"
      class="password"
      placeholder="Confirm password"
      type="password" />
    <br /><br />
    <button class="submit" v-on:click="auth">{{ isRegistering ? 'Register' : 'Login' }}</button>
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
        }, (err) => {
          this.error = `There was an error... ${err.message}`;
        });
      } else {
        ApiConnectorService.users.login(this.username, this.password, (response) => {
          localStorage.setItem('token', response.token);
        }, (err) => {
          this.error = `There was an error... ${err.message}`;
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

  input {
    padding: 5px;
    margin: 5px;
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

  a {
    cursor: pointer;
    font-size: 12px;
    text-decoration: underline;
  }
</style>
