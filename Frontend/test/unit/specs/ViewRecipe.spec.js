import Vue from 'vue';
import ViewRecipe from '@/components/Auth';

describe('ViewRecipe.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ViewRecipe);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#app > div.container').textContent)
      .to.contain('Login');
  });
});
