import Vue from 'vue';
import EditRecipe from '@/components/EditRecipe';

describe('EditRecipe.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(EditRecipe);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#app > div.container').textContent)
      .to.contain('Login');
  });
});
