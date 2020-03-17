import path from 'path'
import { menubar } from 'menubar'
import {
  Menu,
  app,
  globalShortcut,
  ipcMain,
  BrowserWindow,
} from 'electron'
***REMOVED***
import User from './User'
import Setapp from './Setapp'
import Updater from './Updater'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

***REMOVED***
  getShortcut() {
    const electronKeyMap = {
      Meta: 'CmdOrCtrl',
  ***REMOVED***

    const shortcut = Store.get('shortcut')
      .map(key => (electronKeyMap[key] ? electronKeyMap[key] : key))
      .join('+')

    return shortcut
***REMOVED***

  create(windowOptions = {}) {
    return new Promise((resolve, reject) => {
      if (
        this.menubar
        // || !User.isVerified
        || !Store.get('showMenubar', true)
      ) {
        reject()
  ***REMOVED***
    ***REMOVED***

      const { titleBarStyle, trafficLightPosition, ...options } = windowOptions

      this.menubar = menubar({
        index: process.env.WEBPACK_DEV_SERVER_URL
          ? process.env.WEBPACK_DEV_SERVER_URL
          : 'app://./index.html',
        browserWindow: {
          ...options,
          movable: false,
          alwaysOnTop: isDevelopment,
      ***REMOVED***,
        /* global __static */
        icon: path.join(__static, 'MenuIconTemplate.png'),
        preloadWindow: true,
        showDockIcon: false,
        tooltip: 'Glyphfinder',
  ***REMOVED***

      this.menubar.on('after-create-window', () => {
        const contextMenu = Menu.buildFromTemplate([
          { role: 'about' },
          { type: 'separator' },
          {
            label: 'Preferences',
            click: () => {
              BrowserWindow
                .getAllWindows()
                .forEach(browserWindow => {
                  browserWindow.webContents.send('showPreferences')
                  browserWindow.show()
            ***REMOVED***
          ***REMOVED***,
        ***REMOVED***,
          { type: 'separator' },
          ...(!Setapp.isActive ? [
            {
              label: 'Check for Updates',
              click(menuItem) {
                Updater.checkForUpdates(menuItem)
            ***REMOVED***,
          ***REMOVED***,
          ] : []),
          { type: 'separator' },
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

        resolve(this.getWindow())
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

      this.menubar.on('ready', () => {
        if (!User.isVerified) {
          this.show()
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
***REMOVED***

  isWindowVisible(window) {
    return !window.isDestroyed() && window.isVisible()
***REMOVED***

  getWindow() {
    return this.menubar.window
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
