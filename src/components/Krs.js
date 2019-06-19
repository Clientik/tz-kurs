import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes from '@amcharts/amcharts4/themes/dataviz';

am4core.useTheme(am4themes); // Установка темы

export default {
  name: 'Krs',
  data() {
    return {
      actperiod: 'все',
      lperiod: ['неделя', 'месяц', 'квартал', 'год', 'все'],
      cb: [],
      modevisor: 1,
      sortinput: {
        startdate: '',
        enddate: '',
      },
      sortdate: {
        startdate: '',
        enddate: '',
      },
      resizegraph: 0,
    };
  },
  watch: {
    resizegraph() {
      this.createchart();
    },
    cb() {
      this.createchart();
    },
    filteredCurs() {
      if (this.filteredCurs.length <= 7) {
        this.modevisor = 0;
      } else {
        this.modevisor = 1;
      }
    },
  },
  methods: {
    /*
    Функция createchart() обеспечивает создание графика,
    а именно отрисовку и первичную настройку этого графика.
     */
    createchart() {
      // eslint-disable-next-line prefer-const
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.paddingRight = 20;
      chart.zoomOutButton.disabled = true;
      chart.dateFormatter.inputDateFormat = 'dd.MM.yyyy';
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.tooltipDateFormat = 'dd.MM.yyyy';
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'value';
      series.dataFields.dateX = 'date';
      series.tooltipText = '{value}';
      series.strokeWidth = 2;
      series.minBulletDistance = 10;
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.strokeOpacity = 0;
      series.tooltip.pointerOrientation = 'vertical';
      series.tooltip.label.minWidth = 40;
      series.tooltip.label.minHeight = 40;
      series.tooltip.label.textAlign = 'middle';
      series.tooltip.label.textValign = 'middle';

      series.tooltipText = '{valueY.value} руб';
      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      chart.data = this.cb;
      this.chart = chart;
      let scrollTimer;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.chart.scrollbarX.start = this.resizegraph + 0.000001;
      }, 500); // Задержка для корректности отображения
    },
    /*
    Функция gendata() обеспечивает генерацию фейк данных о курсах.
     */
    gendata() {
      this.$cb = null;
      let money = 10;
      const d1 = new Date('12/26/2013'); // Промежуток генерации даты 1
      const d2 = new Date('12/26/2015'); // Промежуток генерации даты 2
      const oneDay = 24 * 3600 * 1000;
      for (let ms = d1 * 1, last = d2 * 1; ms < last; ms += oneDay) {
        money += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        if (money < 1) {
          money *= -1;
        }
        const s1 = new Date(ms);
        let month = `${s1.getMonth() + 1}`;
        let day = `${s1.getDate()}`;
        const year = s1.getFullYear();

        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;

        this.cb.push({
          date: `${day}.${month}.${year}`,
          name: `name${money * 0.1}`,
          value: money,
        });
      }
      this.setbasic();
    },
    /*
    Функция setfilter() конвертирует формат даты из поля ввода в формат,
    подходящий для алгоритма фильтрации.
     */
    setfilter() {
      this.sortdate.startdate = this.sortinput.startdate
        .toString()
        .replace(/(\d*)-(\d*)-(\d*)/, '$3.$2.$1');
      this.sortdate.enddate = this.sortinput.enddate
        .toString()
        .replace(/(\d*)-(\d*)-(\d*)/, '$3.$2.$1');
    },
    /*
    Функция setbasic() задание первичного интервала фильтрации из данных курса.
     */
    setbasic() {
      this.sortinput.startdate = this.cb[this.cb.length - 7].date
        .toString()
        .replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
      this.sortinput.enddate = this.cb[this.cb.length - 1].date
        .toString()
        .replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');
      this.setfilter();
    },
    /*
    Функция setactive() - делает активным интервал дат на графики,
    путем изменения внутренних свойсвт сгенерированного графика.
     */
    setactive(b) {
      this.actperiod = b;
      const zoomid = this.lperiod.indexOf(b);
      switch (zoomid) {
        case 0:
          // 0.993 //7 дней
          this.resizegraph = 0.993;
          break;
        case 1:
          // 0.971 //месяц
          this.resizegraph = 0.971;
          break;
        case 2:
          // 0.911 //квартал
          this.resizegraph = 0.911;
          break;
        case 3:
          // 0.635 //год
          this.resizegraph = 0.635;
          break;
        case 4:
          this.resizegraph = 0;
          break;
        default:
          break;
      }
    },
    /*
    Функция autoresize() - активируется при изменении пользовательского окна
    и генерирует новый график, под текущие настройки пользоательского экрана.
    Задержка стоит для того, чтобы явно дождаться от пользователся конца ресайза окна.
     */
    autoresize() {
      let resizeTimer;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.createchart();
      }, 150); // Задержка для авторесайза
    },
  },
  computed: {
    /*
    Функция filteredCurs() - является фильтрующей функцией, которая конвертирует
    даты и устанавливает фильтрующему масству данные, которые находятся в промежутке
    между датой От и До.
     */
    filteredCurs() {
      const fC1 = this.sortdate.startdate
        .toString()
        .replace(/(\d*).(\d*).(\d*)/, '$2.$1.$3');
      const fC2 = this.sortdate.enddate
        .toString()
        .replace(/(\d*).(\d*).(\d*)/, '$2.$1.$3');
      return this.cb.filter((kurs) => {
        if (
          new Date(
            kurs.date.toString().replace(/(\d*).(\d*).(\d*)/, '$2.$1.$3'),
          ) >= new Date(fC1)
            && new Date(
              kurs.date.toString().replace(/(\d*).(\d*).(\d*)/, '$2.$1.$3'),
            ) <= new Date(fC2)
        ) {
          return true;
        }
        return false;
      });
    },
  },
  mounted() {
    this.gendata();
    window.addEventListener('resize', this.autoresize); // Установка ивента при ресайзе пользовательского окна браузера
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
