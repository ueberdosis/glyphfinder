***REMOVED***
import { app, isProduction } from '../helpers'

***REMOVED***
  update() {
    if (isProduction) {
      app.setLoginItemSettings({
        openAtLogin: Store.get('autoStart', true),
        openAsHidden: true,
        path: app.getPath('exe'),
  ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***