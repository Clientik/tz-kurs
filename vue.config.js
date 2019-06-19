module.exports = {
  publicPath: './', // Фикc белого экрана из-за кривых путей
  configureWebpack: {
    externals: {
      canvas: {},
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
