<script>
import axios from 'axios';

export default {
  users: {
    login(username, password, success, error) {
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
    register(name, username, password, success, error) {
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
  },
  recipes: {
    fetch(success, error) {
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
  },
};
</script>
