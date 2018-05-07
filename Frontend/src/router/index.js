import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Auth';
import Welcome from '@/components/Welcome';
import Settings from '@/components/Settings';

import Recipes from '@/components/Recipes';
import ViewRecipe from '@/components/ViewRecipe';
import EditRecipe from '@/components/EditRecipe';
import NewRecipe from '@/components/NewRecipe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes,
    },
    {
      path: '/recipes/new',
      name: 'NewRecipe',
      component: NewRecipe,
    },
    {
      path: '/recipes/:id',
      name: 'ViewRecipe',
      component: ViewRecipe,
    },
    {
      path: '/recipes/edit/:id',
      name: 'EditRecipe',
      component: EditRecipe,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
  ],
});
