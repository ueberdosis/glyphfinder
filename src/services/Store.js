import Store from 'electron-store'
import DB from './DB'
import { isMac, app, isSameArray } from '../helpers'

export default new Store({
  // configName: process.env.NODE_ENV === 'development'
  //   ? 'config_dev'
  //   : 'config',
  projectVersion: app.getVersion(),
  migrations: {
    '1.0.0': store => {
      DB.removeAll()
      store.clear()
  ***REMOVED***,
    '1.1.0': store => {
      if (isMac) {
        store.set('shortcut', ['shift', 'super', 'g'])
    ***REMOVED*** else {
        store.set('shortcut', ['control', 'shift', 'g'])
    ***REMOVED***

      store.set('showMenubar', false)
      store.set('autoStart', false)
      store.set('hideAfterCopy', false)
  ***REMOVED***,
    '1.1.1': store => {
      store.set('showMenubar', true)
      store.set('autoStart', true)
      store.set('hideAfterCopy', true)
  ***REMOVED***,
    '1.2.0': store => {
      // fix missing default usage
      const usage = store.get('usage', [])
      store.set('usage', usage)

      // fix missing default expanded
      const expanded = store.get('expanded', false)
      store.set('expanded', expanded)

      DB.removeSearchIndex()
      store.set('clearSearchOnHide', true)

      const isBadShortcut = shortcut => {
        if (isMac) {
    ***REMOVED*** isSameArray(shortcut, ['shift', 'super', 'g'])
      ***REMOVED***
  ***REMOVED*** isSameArray(shortcut, ['control', 'shift', 'g'])
    ***REMOVED***

      if (isBadShortcut(store.get('shortcut'))) {
        store.set('shortcut', ['control', 'super', 'g'])
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
})
