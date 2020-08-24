const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  publicPath: '//localhost:8082/',
  css: {
    extract: false
  },
  configureWebpack: {
    devtool: 'none',
    output: {
      library: 'singleVue',
      libraryTarget: 'window'
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentBase: './',
      compress: true
    },
    plugins: [
      new StatsPlugin("stats.json", {
        chunkModules: false,
        entryPoints:true,
        source: false,
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
  devServer: {
    contentBase: './',
    compress: true
  }
}
