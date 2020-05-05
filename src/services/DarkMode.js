import { nativeTheme, BrowserWindow, ipcMain } from 'electron'
***REMOVED***

***REMOVED***
  init() {
    this.set()

    nativeTheme.on('updated', this._handleUpdate.bind(this))
    ipcMain.on('darkModePreferenceChanged', this._handleUpdate.bind(this))
***REMOVED***

  get() {
    const preference = Store.get('darkMode')

    return preference === 'system'
      ? nativeTheme.shouldUseDarkColors
      : preference === 'true'
***REMOVED***

  set() {
    this.isDarkMode = this.get()

    BrowserWindow
      .getAllWindows()
      .forEach(browserWindow => {
        browserWindow.isDarkMode = this.isDarkMode
  ***REMOVED***
***REMOVED***

  _handleUpdate() {
    this.set()

    BrowserWindow
      .getAllWindows()
      .forEach(browserWindow => {
        browserWindow.webContents.send('darkModeChanged', this.isDarkMode)
  ***REMOVED***
***REMOVED***
}
