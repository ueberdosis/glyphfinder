import { app } from 'electron'
***REMOVED***

const isProduction = process.env.NODE_ENV === 'production'

***REMOVED***

  init() {
    if (isProduction) {
      app.setLoginItemSettings({
        openAtLogin: Store.get('autoStart', true),
        openAsHidden: true,
        path: app.getPath('exe'),
  ***REMOVED***
  ***REMOVED***
***REMOVED***

***REMOVED***
