require('dotenv').config()
const { notarize } = require('electron-notarize')

module.exports = async context => {
  const { electronPlatformName, appOutDir } = context
  const appName = context.packager.appInfo.productFilename

  if (electronPlatformName !== 'darwin') {
    return
***REMOVED***

  try {
    await notarize({
      appBundleId: process.env.VUE_APP_IS_SETAPP === 'true'
        ? 'com.ueberclub.mouseless-setapp'
        : 'com.glyphfinder.app',
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASS,
***REMOVED***
***REMOVED*** catch (err) {
    console.error(err)
***REMOVED***
}
