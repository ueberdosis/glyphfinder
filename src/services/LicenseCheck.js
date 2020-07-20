import axios from 'axios'
import { ipcMain } from 'electron'
import log from 'electron-log'
import Store from './Store'
import { nestedValue } from '../helpers'

log.transports.file.getFile()

export default new class {

  constructor() {
    this.limit = process.env.NODE_ENV === 'development'
      ? Infinity
      : 1

    ipcMain.on('verifyLicenseKey', (_, licenseKey) => {
      this.verifyLicenseKey(licenseKey)
    })
  }

  setWindow(win) {
    this.win = win
  }

  verifyLicenseKey(licenseKey) {
    if (process.env.MASTER_KEY && licenseKey === process.env.MASTER_KEY) {
      Store.set('verification', {
        success: true,
        purchase: {
          license_key: licenseKey,
        },
      })
      this.emitSuccess()
      return
    }

    axios
      .post('https://api.gumroad.com/v2/licenses/verify', {
        product_permalink: process.env.VUE_APP_GUMROAD_PRODUCT_ID,
        license_key: licenseKey,
        increment_uses_count: true,
      })
      .then(response => {
        const limit = parseInt(nestedValue(response, 'data.purchase.variants').replace(/\D/g, ''), 10) * 2
          || this.limit * 2
        const uses = nestedValue(response, 'data.uses')

        if (uses > limit) {
          this.emitError(`Sorry. This license is already in use on ${limit} ${limit > 1 ? 'devices' : 'device'}.`)
          return
        }

        const refunded = nestedValue(response, 'data.purchase.refunded')

        if (refunded) {
          this.emitError('Sorry. This purchase has been refunded.')
          return
        }

        const chargebacked = nestedValue(response, 'data.purchase.chargebacked')

        if (chargebacked) {
          this.emitError('Sorry. This purchase has been chargebacked.')
          return
        }

        Store.set('verification', response.data)
        this.emitSuccess()
      })
      .catch(error => {
        if (!error.response) {
          this.emitError('Please check your internet connection.')
          log.error('license check failed. maybe no internet connection.', error)
        } else if (error.response.status && error.response.status >= 500) {
          this.emitError('Oh no. Gumroad can\'t be reached. Please try again later.')
          log.error('license check failed. maybe gumroad down.', error)
        } else {
          this.emitError('Sorry. This license does not exist.')
          log.error('license check failed.', error)
        }
      })
  }

  emitSuccess() {
    this.win.webContents.send('verifyLicenseKey:succeeded')
  }

  emitError(errorMessage = null) {
    this.win.webContents.send('verifyLicenseKey:failed', errorMessage)
  }

}()
