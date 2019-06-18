import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Прогружены элементы', () => {
  const wrapper = mount(App);
  it('Кнопка "Показать"', () => {
    expect(wrapper.find('.cb-graph__div').exists()).toBe(true);
  });
});
