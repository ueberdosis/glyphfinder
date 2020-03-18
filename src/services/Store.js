import Store from 'electron-store'
import { app, remote } from 'electron'
import DB from './DB'
import { isMac } from '../helpers'

export default new Store({
  // configName: process.env.NODE_ENV === 'development'
  //   ? 'config_dev'
  //   : 'config',
  projectVersion: (app && app.getVersion)
    ? app.getVersion()
    : remote.app.getVersion(),
  migrations: {
    '1.0.0': store => {
      DB.removeAll()
      store.clear()
  ***REMOVED***,
    '1.1.0': store => {
      if (isMac) {
        store.set('shortcut', ['Shift', 'Meta', 'g'])
    ***REMOVED*** else {
        store.set('shortcut', ['Control', 'Shift', 'g'])
    ***REMOVED***
      store.set('showMenubar', true)
      store.set('autoStart', true)
  ***REMOVED***,
***REMOVED***,
})
