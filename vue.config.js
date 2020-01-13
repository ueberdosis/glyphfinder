module.exports = {
  // devServer: {
  //   overlay: {
  //     warnings: false,
  //     errors: false,
  // ***REMOVED***,
  // },

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/variables.scss";',
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  chainWebpack: config => {
    config.module
      .rule('node')
      .test(/\.yaml$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader')
      .end()

    config.resolve.extensions.prepend('.yaml')
***REMOVED***,
}
