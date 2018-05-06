import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Auth';
import Recipes from '@/components/Recipes';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: Recipes,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
    },
  ],
});
