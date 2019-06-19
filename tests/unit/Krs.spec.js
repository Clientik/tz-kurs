import { shallowMount, mount } from '@vue/test-utils';
import App from '@/components/Krs.vue';

describe('Проверка прогрузки элементов', () => {
  const wrapper = mount(App);
  it('Кнопка "Показать"', () => {
    expect(wrapper.html()).toContain('<button class="btn btn-start">Показать</button>');
  });
  it('Поля ввода ДО и ПОСЛЕ', () => {
    const input = wrapper.findAll('.cb-list__input').at(1);
    expect(input.is('.cb-list__input')).toBe(true);
  });
  it('Курс-список', () => {
    expect(wrapper.find('.cb-list__table').exists()).toBe(true);
  });
  it('Селектор выбора периода(активный)', () => {
    expect(wrapper.find('.cb-graph__item--active').exists()).toBe(true);
  });
});
describe('Проверка основных функций', () => {
  const wrapper = mount(App);
  it('Проверка первичного отображения списка-фильтрации"', () => {
    const tlenght = (wrapper.vm.filteredCurs).length - 1;
    const input = wrapper.findAll('.cb-list__item').at(tlenght);
    expect(input.is('.cb-list__item')).toBe(true);
  });
  it('Проверка взаимодействия с полями дат"', () => {
    const inpto = wrapper.vm.cb[0].date;
    const inpdo = wrapper.vm.cb[7].date;
    wrapper.vm.sortinput.startdate = inpto.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.vm.sortinput.enddate = inpdo.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.find('.btn-start').trigger('click');
    expect(wrapper.vm.sortdate.startdate).toBe(inpto);
    expect(wrapper.vm.sortdate.enddate).toBe(inpdo);
  });
  it('Проверка корректности отображения списка-фильрации"', () => {
    const inpto = wrapper.vm.cb[0].date;
    const inpdo = wrapper.vm.cb[7].date;
    wrapper.vm.sortinput.startdate = inpto.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.vm.sortinput.enddate = inpdo.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.find('.btn-start').trigger('click');
    const filteredArrayTo = wrapper
      .findAll('tr')
      .filter(w => !w.classes('.cb-list__item')).at(1);
    const filteredArrayDo = wrapper
      .findAll('tr')
      .filter(w => !w.classes('.cb-list__item')).at(8);
    expect(filteredArrayTo.text()).toContain(inpto);
    expect(filteredArrayDo.text()).toContain(inpdo);
  });
  it('Проверка активации скролла"', () => {
    const inpto = wrapper.vm.cb[0].date;
    let inpdo = wrapper.vm.cb[3].date;
    wrapper.vm.sortinput.startdate = inpto.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.vm.sortinput.enddate = inpdo.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.find('.btn-start').trigger('click');
    expect(wrapper.find('.scroll-deactive').exists()).toBe(true);
    expect(wrapper.vm.modevisor).toBe(0);
    inpdo = wrapper.vm.cb[10].date;
    wrapper.vm.sortinput.startdate = inpto.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.vm.sortinput.enddate = inpdo.toString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
    wrapper.find('.btn-start').trigger('click');
    expect(wrapper.vm.modevisor).toBe(1);
    expect(wrapper.find('.scroll-active').exists()).toBe(true);
  });
  it('Проверка активации периода отображения графика"', () => {
    for (let a = 0; a < (wrapper.vm.lperiod).length; a += 1) {
      const period = wrapper.findAll('.cb-graph__item').at(a);
      period.trigger('click');
      expect(wrapper.html()).toContain('<desc>JavaScript chart by amCharts</desc>');
      const periodAct = wrapper.find('.cb-graph__item--active');
      expect(periodAct.text()).toBe(wrapper.vm.actperiod);
    }
  });
});
