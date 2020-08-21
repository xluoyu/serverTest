const path = require("path")

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/mis' : '',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'MIS后台管理'
    }
  },
  devServer: {
    proxy: {
        "/api": {
            target: "http://0.0.0.0:3000/"
        }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/style/base.less")]
    }
  }
}