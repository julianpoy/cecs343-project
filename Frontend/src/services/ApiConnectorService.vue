<script>
import axios from 'axios';

/* global localStorage */
const apiBase = localStorage.getItem('base') || 'http://localhost:3000/';

function getTokenQuery() {
  return `?token=${localStorage.getItem('token')}`;
}

export default {
  users: {
    login(username, password, success, error) {
      axios.post(`${apiBase}users/login`, {
        username,
        password,
      })
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
    register(name, username, password, success, error) {
      axios.post(`${apiBase}users/join`, {
        screenname: name,
        username,
        password,
      })
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
  },
  recipes: {
    fetch(payload, success, error) {
      axios.get(`${apiBase}recipes${getTokenQuery()}`, {
        params: payload || {}
      })
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
    getById(id, success, error) {
      axios.get(`${apiBase}recipes/${id}${getTokenQuery()}`)
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
    create(payload, success, error) {
      axios.post(`${apiBase}recipes${getTokenQuery()}`, payload)
        .then((response) => {
          success(response.data);
        })
        .catch((e) => {
          error(e);
        });
    },
    openExport() {
      window.open(`${apiBase}recipes/export${getTokenQuery()}`);
    },
  },
};
</script>
