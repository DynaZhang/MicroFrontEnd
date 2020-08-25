const StatsPlugin = require('stats-webpack-plugin')
const selectorNamespace = require('postcss-selector-namespace')

module.exports = {
  publicPath: '//localhost:8081/',
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          selectorNamespace({
            namespace(css) {
              /* 无需添加的样式 */
              // if (css.includes("element-variables.scss")) return "";
              return "#speiyou-teacher";
            }
          })
        ]
      }
    }
  },
  configureWebpack: {
    devtool: 'none',
    output: {
      library: 'teacher',
      libraryTarget: 'umd'
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
