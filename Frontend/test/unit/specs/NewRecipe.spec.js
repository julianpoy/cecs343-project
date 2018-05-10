import Vue from 'vue';
import NewRecipe from '@/components/Auth';

describe('NewRecipe.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(NewRecipe);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#app > div.container').textContent)
      .to.contain('Login');
  });
});
