module.exports = {
  configureWebpack: {
    externals: {
      canvas: {},
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    // очищаем все существующие загрузчики.
    // если вы этого не сделаете, загрузчик ниже будет добавлен
    // к уже существующим загрузчикам для этого правила.
    svgRule.uses.clear();

    // добавляем загрузчик для замены
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
