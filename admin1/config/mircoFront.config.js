const selectorNamespace = require('postcss-selector-namespace')
const path = require('path')
const StatsPlugin = require('stats-webpack-plugin')


module.exports = {
  publicPath: '//localhost:8083',
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          selectorNamespace({
            namespace() {
              /* 无需添加的样式 */
              return "#speiyou-splat";    // 返回css选择器
            }
          })
        ]
      }
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '^/dev-api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    entry: {
      'app': path.resolve(__dirname, '../src/entry/main.mirco.js')
    },
    output: { // 重点： 将其导出为library库文件
      library: 'admin1', // 导出名称
      libraryTarget: 'umd' // 挂载目标
    },
    plugins: [
      new StatsPlugin('stats.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
}
