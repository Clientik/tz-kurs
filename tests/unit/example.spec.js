// import { expect } from 'chai';
// import { mount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Компонент Krs', () => {
  const wrapper = mount(App);
  // также легко проверить наличие других элементов
  it('имеет кнопку', () => {
    wrapper.find('btn btn-start').trigger('click');
  });
});
