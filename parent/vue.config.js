const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '^/dev-api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    entry: {
      'app': path.resolve(__dirname, './src/main.js'),
      'common': path.resolve(__dirname, './src/common.js')
    },
    output: {
      filename: '[name].[hash:10].js'
    }
  }
}
