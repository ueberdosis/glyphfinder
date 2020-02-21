import fs from 'fs'
import path from 'path'
import Store from 'electron-store'
import { app, remote } from 'electron'

const userDataPath = (app || remote.app).getPath('userData')
const dbPath = path.join(userDataPath, 'db.json')

export default new Store({
  // configName: process.env.NODE_ENV === 'development'
  //   ? 'config_dev'
  //   : 'config',
  projectVersion: (app && app.getVersion)
    ? app.getVersion()
    : remote.app.getVersion(),
  migrations: {
    '1.0.0': store => {
      fs.unlinkSync(dbPath)
      store.clear()
  ***REMOVED***,
***REMOVED***,
})
