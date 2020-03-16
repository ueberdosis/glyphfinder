import path from 'path'
import { menubar } from 'menubar'
import {
  Menu,
  app,
  globalShortcut,
  ipcMain,
} from 'electron'
***REMOVED***
import User from './User'
import Setapp from './Setapp'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

***REMOVED***

***REMOVED***
    this.mainWindow = null
***REMOVED***

  getShortcut() {
    const electronKeyMap = {
      Meta: 'CommandOrControl',
  ***REMOVED***

    const shortcut = Store.get('shortcut')
      .map(key => (electronKeyMap[key] ? electronKeyMap[key] : key))
      .join('+')

    return shortcut
***REMOVED***

  create() {
    if (
      this.menubar
      || !User.isVerified
      || !Store.get('showMenubar', true)
    ) {
***REMOVED***
  ***REMOVED***

    const isWindows = process.platform === 'win32'

    this.menubar = menubar({
      index: process.env.WEBPACK_DEV_SERVER_URL
        ? process.env.WEBPACK_DEV_SERVER_URL
        : 'app://./index.html',
      browserWindow: {
        transparent: true,
        backgroundColor: '#000',
        width: 340 + (isWindows ? 6 : 0),
        height: 580,
        movable: false,
        alwaysOnTop: isDevelopment,
        webPreferences: {
          nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
          nodeIntegrationInWorker: process.env.ELECTRON_NODE_INTEGRATION,
      ***REMOVED***,
    ***REMOVED***,
      /* global __static */
      icon: path.join(__static, 'MenuIconTemplate.png'),
      preloadWindow: true,
      showDockIcon: true,
      tooltip: 'Glyphfinder',
***REMOVED***

    this.menubar.on('after-create-window', () => {
      // this.menubar.window.webContents.executeJavaScript('window.location.hash = "/shortcuts"')

      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Quit',
          click: () => {
            this.menubar.app.quit()
        ***REMOVED***,
      ***REMOVED***,
      ])

      this.menubar.tray.on('right-click', () => {
        Setapp.reportUsageEvent('user-interaction')
        this.menubar.tray.popUpContextMenu(contextMenu)
  ***REMOVED***
***REMOVED***

    this.menubar.on('show', () => {
      Setapp.reportUsageEvent('user-interaction')

      if (isDevelopment) {
        this.menubar.window.openDevTools()
    ***REMOVED***
***REMOVED***

    this.menubar.on('hide', () => {
      if (isDevelopment) {
        this.menubar.window.closeDevTools()
    ***REMOVED***
***REMOVED***

    this.menubar.on('after-hide', () => {
      // restore focus of previous app only if there is no main window of mouseless
      if (!this.isWindowVisible(this.mainWindow)) {
        this.menubar.app.hide()
    ***REMOVED***
***REMOVED***

    this.addShortcutListener()

    ipcMain.on('shortcutChanged', () => {
      this.addShortcutListener()
***REMOVED***

    app.on('will-quit', () => {
      globalShortcut.unregisterAll()
***REMOVED***
***REMOVED***

  isWindowVisible(window) {
    return !window.isDestroyed() && window.isVisible()
***REMOVED***

  setMainWindow(win) {
    this.mainWindow = win
***REMOVED***

  show() {
    if (!this.menubar) {
***REMOVED***
  ***REMOVED***

    this.menubar.showWindow()
***REMOVED***

  hide() {
    if (!this.menubar) {
***REMOVED***
  ***REMOVED***

    this.menubar.hideWindow()
***REMOVED***

  addShortcutListener() {
    // unregister previously added event listener
    globalShortcut.unregisterAll()

    const shortcut = this.getShortcut()

    globalShortcut.register(shortcut, () => {
      if (this.isWindowVisible(this.menubar.window)) {
        this.hide()
    ***REMOVED*** else {
        this.show()
    ***REMOVED***
***REMOVED***

    // globalShortcut.register('escape', () => {
    //   if (this.isWindowVisible(this.menubar.window)) {
    //     this.hide()
    // ***REMOVED***
    // })
***REMOVED***

***REMOVED***
