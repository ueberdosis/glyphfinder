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
    },
    '1.1.0': store => {
      if (isMac) {
        store.set('shortcut', ['shift', 'super', 'g'])
      } else {
        store.set('shortcut', ['control', 'shift', 'g'])
      }

      store.set('showMenubar', false)
      store.set('autoStart', false)
      store.set('hideAfterCopy', false)
    },
    '1.1.1': store => {
      store.set('showMenubar', true)
      store.set('autoStart', true)
      store.set('hideAfterCopy', true)
    },
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
          return isSameArray(shortcut, ['shift', 'super', 'g'])
        }
        return isSameArray(shortcut, ['control', 'shift', 'g'])
      }

      if (isBadShortcut(store.get('shortcut'))) {
        store.set('shortcut', ['control', 'super', 'g'])
      }
    },
    '1.3.0': store => {
      store.set('darkMode', 'system')
      DB.removeSearchIndex()
    },
    '1.4.0': () => {
      DB.removeSearchIndex()
    },
  },
})
