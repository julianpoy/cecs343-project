import Vue from 'vue';
import PublicRecipes from '@/components/Auth';

describe('PublicRecipes.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PublicRecipes);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#app > div.container').textContent)
      .to.contain('Login');
  });
});
