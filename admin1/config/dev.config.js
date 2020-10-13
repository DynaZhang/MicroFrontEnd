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
      'app': path.resolve(__dirname, '../src/entry/main.dev.js')
    },
  }
}
