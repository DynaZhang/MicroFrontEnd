const path = require('path')

const StatsPlugin = require('stats-webpack-plugin');
const selectorNamespace = require('postcss-selector-namespace');

const config = {
  configureWebpack: {
    devtool: 'none',
    output: {
      library: 'course',
      libraryTarget: 'umd',
      filename: '[name].[hash:10].js'
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentBase: './',
      compress: true,
      port: 8082
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
  }
}

const mode = 'production'

if (mode === 'development') {
  config.configureWebpack.entry = {
    'app': path.resolve(__dirname, './src/main.dev.js')
  }
} else {
  config.publicPath = '//localhost:8082'
  config.css =  {
    extract: false,
      loaderOptions: {
      postcss: {
        plugins: [
          selectorNamespace({
            namespace(css) {
              /* 无需添加的样式 */
              // if (css.includes("element-variables.scss")) return "";
              return "#speiyou-course";
            }
          })
        ]
      }
    }
  }
  config.configureWebpack.entry = {
    'app': path.resolve(__dirname, './src/main.pro.js')
  }
  config.configureWebpack.externals = ['vue-router', 'element-ui']
}

module.exports = config
