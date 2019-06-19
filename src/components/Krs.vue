
<template>
  <div class="main-block">
    КУРС ВАЛЮТ (ТЕСТОВОЕ ЗАДАНИЕ)
    <div class="cb-curs">
      <div class="cb-list">
        <table
          v-bind:class="['cb-list__table cb-list__table--scroll scroll-style',
         { 'scroll-active': modevisor === 1 },
         { 'scroll-deactive': modevisor === 0 }]"
        >
          <thead>
            <tr>
              <td>Дата</td>
              <td colspan="2">Курс ЦБ РФ</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mnlist in filteredCurs" v-bind:key="mnlist.id" class="cb-list__item">
              <td>{{mnlist.date}}</td>
              <td>{{mnlist.value}}</td>
            </tr>
          </tbody>
        </table>
        <tfoot class="cb-list__tfoot">
          <div class="cb-list__input">
            <label>От</label>
            <input v-model="sortinput.startdate" type="date">
          </div>
          <div class="cb-list__input">
            <label>До</label>
            <input v-model="sortinput.enddate" type="date">
          </div>
          <button v-on:click="setfilter" class="btn btn-start">Показать</button>
        </tfoot>
      </div>
      <div class="cb-graph">
        <div class="cb-graph__div" ref="chartdiv"></div>
        <div class="cb-graph__selector">
          <span class="cb-graph__title">Период:</span>
          <ul class="cb-graph__list">
            <li
              v-for="period in lperiod"
              v-bind:key="period"
              v-bind:class="['cb-graph__item', { 'cb-graph__item--active': actperiod === period }]"
              v-on:click="setactive(period);"
            >
              <span>{{ period }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/krs.scss';
</style>
<script src="./Krs.js"></script>
