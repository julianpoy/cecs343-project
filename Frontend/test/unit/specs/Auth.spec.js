import Vue from 'vue';
import Auth from '@/components/Auth';

describe('Auth.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Auth);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('div.container').textContent)
      .to.contain('Login');
  });
});
