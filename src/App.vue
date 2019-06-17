<template>
  <div id="app">
  <Krs></Krs>
  </div>
</template>


<script>
import Krs from './components/Krs.vue';

export default {
  name: 'app',
  components:
  {
    Krs,
  },
  methods: {
  },
  created() {
    Object.assign(window, { SVGPathElement: () => {} });
  },
};
</script>

<style lang="scss">
@import 'assets/krs.scss';
</style>
