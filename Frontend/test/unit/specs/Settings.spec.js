import Vue from 'vue';
import Settings from '@/components/Settings';

describe('Settings.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Settings);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#app > div.container').textContent)
      .to.contain('Login');
  });
});
