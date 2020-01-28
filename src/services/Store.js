import Store from 'electron-store'
import { app, remote } from 'electron'

export default new Store({
  // configName: process.env.NODE_ENV === 'development'
  //   ? 'config_dev'
  //   : 'config',
  projectVersion: (app && app.getVersion)
    ? app.getVersion()
    : remote.app.getVersion(),
  migrations: {
    '1.0.0': store => {
      store.clear()
  ***REMOVED***,
***REMOVED***,
})
