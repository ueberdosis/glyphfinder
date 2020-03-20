module.exports = {
  lintOnSave: process.env.NODE_ENV === 'production',

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/variables.scss";',
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  chainWebpack: config => {
    // const nodeLoader = process.env.NODE_ENV === 'development'
    //   ? 'node-loader'
    //   : 'native-ext-loader'

    const nodeLoader = 'native-ext-loader'

    // config.node.set('__dirname', true)

    config
      .output
      .globalObject('(typeof self !== "undefined" ? self : this)')

    config.module
      .rule('node')
      .test(/\.node$/)
      .use(nodeLoader)
      .loader(nodeLoader)
      .end()

    config.module
      .rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
      .end()

    config.resolve.extensions.prepend('.node')
***REMOVED***,

  pluginOptions: {
    electronBuilder: {
      // externals: ['native-keymap'],
      nodeIntegration: true,
      chainWebpackMainProcess: config => {
        const nodeLoader = process.env.NODE_ENV === 'development'
          ? 'node-loader'
          : 'native-ext-loader'

        config.module
          .rule('node')
          .test(/\.node$/)
          .use(nodeLoader)
          .loader(nodeLoader)
          .end()

        config.resolve.extensions.add('.js').add('.node')
    ***REMOVED***,
      builderOptions: {
        appId: process.env.VUE_APP_IS_SETAPP === 'true'
          ? 'com.ueberclub.glyphfinder-setapp'
          : 'com.glyphfinder.app',
        artifactName: '${productName}-${version}-${os}.${ext}', // eslint-disable-line
        afterSign: 'src/notarize.js',
        productName: 'Glyphfinder',
        mac: {
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: 'build/entitlements.mac.plist',
          entitlementsInherit: 'build/entitlements.mac.plist',
          extendInfo: {
            NSUserNotificationAlertStyle: 'alert',
        ***REMOVED***,
          publish: [
            {
              provider: 'spaces',
              name: 'ueber',
              region: 'fra1',
              channel: 'latest',
              path: '/glyphfinder/mac',
              acl: 'public-read',
          ***REMOVED***,
          ],
      ***REMOVED***,
        win: {
          publisherName: 'überdosis GbR',
          publish: [
            {
              provider: 'spaces',
              name: 'ueber',
              region: 'fra1',
              channel: 'latest',
              path: '/glyphfinder/win',
              acl: 'public-read',
          ***REMOVED***,
          ],
      ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,
}
