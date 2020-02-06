module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        // 修改它的选项...
        options.name = 'img/[name].[ext]'
        return options
      })
  }
}
