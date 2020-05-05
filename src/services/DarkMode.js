import { nativeTheme, BrowserWindow} from 'electron'
***REMOVED***

***REMOVED***
  init() {
    this.set()
    nativeTheme.on('updated', this._handleUpdate.bind(this))
***REMOVED***

  set() {
    const preference = Store.get('darkMode')

    this.isDarkMode = true
    // this.isDarkMode = preference === 'system'
    //   ? nativeTheme.shouldUseDarkColors
    //   : preference === 'true'

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
