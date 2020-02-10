import { dialog, app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
***REMOVED***
import Setapp from './Setapp'

***REMOVED***

***REMOVED***
    autoUpdater.autoDownload = false

    // logs to ~/Library/Logs/Mouseless/log.log
    autoUpdater.logger = log
    autoUpdater.logger.transports.file.level = 'info'

    this.menuItem = null
    this.silent = false

    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    autoUpdater.on('error', this.onError.bind(this))
    autoUpdater.on('update-available', this.onUpdateAvailable.bind(this))
    autoUpdater.on('update-not-available', this.onUpdateNotAvailable.bind(this))
    autoUpdater.on('download-progress', this.onDownloadProgress.bind(this))
    autoUpdater.on('update-downloaded', this.onUpdateDownloaded.bind(this))
    autoUpdater.on('checking-for-update', this.onCheckingForUpdate.bind(this))
***REMOVED***

  sendStatusToWindow(text) {
    this.browserWindows.forEach(browserWindow => {
      browserWindow.webContents.send('log', text)
***REMOVED***
***REMOVED***

  get browserWindows() {
    return BrowserWindow.getAllWindows()
***REMOVED***

  enableMenuItem() {
    if (this.menuItem) {
      this.menuItem.enabled = true
  ***REMOVED***
***REMOVED***

  disableMenuItem() {
    if (this.menuItem) {
      this.menuItem.enabled = false
  ***REMOVED***
***REMOVED***

  silentlyCheckForUpdates() {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    this.silent = true
    this.disableMenuItem()
    autoUpdater.checkForUpdates()
***REMOVED***

  checkForUpdates(menuItem = null) {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    this.menuItem = menuItem
    this.silent = false
    this.disableMenuItem()
    autoUpdater.checkForUpdates()
***REMOVED***

  ensureSafeQuitAndInstall() {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    app.removeAllListeners('window-all-closed')
    this.browserWindows.forEach(browserWindow => browserWindow.removeAllListeners('close'))
    autoUpdater.quitAndInstall()
***REMOVED***

  onError(error) {
    this.enableMenuItem()
    this.sendStatusToWindow(`Error in auto-updater. ${error}`)
***REMOVED***

  async onUpdateAvailable() {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    this.sendStatusToWindow('Update available.')

    const { response } = await dialog.showMessageBox({
      type: 'info',
      message: 'Oh, there\'s a newer version of this app available.',
      detail: 'Do you want to update now?',
      buttons: ['Yes, Download', 'Later'],
      defaultId: 0,
***REMOVED***

    if (response === 0) {
      autoUpdater.downloadUpdate()
  ***REMOVED*** else {
      this.enableMenuItem()
  ***REMOVED***
***REMOVED***

  onUpdateNotAvailable() {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    this.sendStatusToWindow('Update not available.')

    this.enableMenuItem()

    if (this.silent) {
***REMOVED***
  ***REMOVED***

    dialog.showMessageBox({
      message: 'No Updates available.',
      detail: 'You already have the latest version installed.',
***REMOVED***
***REMOVED***

  async onUpdateDownloaded() {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    this.sendStatusToWindow('Update downloaded.')

    const { response } = await dialog.showMessageBox({
      message: 'Download completed.',
      detail: 'To install the update, the application needs to be restarted.',
      buttons: ['Restart', 'Later'],
      defaultId: 0,
***REMOVED***

    if (response === 0) {
      setImmediate(() => {
        this.ensureSafeQuitAndInstall()
  ***REMOVED***
  ***REMOVED***
***REMOVED***

  onCheckingForUpdate() {
    this.sendStatusToWindow('Checking for update…')
***REMOVED***

  onDownloadProgress(progress) {
    if (Setapp.isActive) {
***REMOVED***
  ***REMOVED***

    let logMessage = `Download speed: ${progress.bytesPerSecond}`
    logMessage = `${logMessage} - Downloaded ${progress.percent}%`
    logMessage = `${logMessage} (${progress.transferred}/${progress.total})`
    this.sendStatusToWindow(logMessage)

    this.browserWindows.forEach(browserWindow => {
      browserWindow.setProgressBar(progress.percent / 100)
***REMOVED***
***REMOVED***

***REMOVED***
