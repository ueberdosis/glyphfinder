***REMOVED***

***REMOVED***
    this.isActive = process.env.VUE_APP_IS_SETAPP === 'true'

    // eslint-disable-next-line
    console.log('is setapp:', this.isActive)
***REMOVED***

  init() {
    if (!this.isActive) {
***REMOVED***
  ***REMOVED***

    this.setapp = require('../../setapp-nodejs-wrapper/build/Release/setapp.node')
***REMOVED***

  reportUsageEvent(name = null) {
    if (!this.isActive || !this.setapp || !name) {
***REMOVED***
  ***REMOVED***

    this.setapp.SCReportUsageEvent(name)
***REMOVED***

***REMOVED***
