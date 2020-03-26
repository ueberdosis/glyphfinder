import path from 'path'
import { menubar } from 'menubar'
import {
  Menu,
  app,
  globalShortcut,
  ipcMain,
  BrowserWindow,
  systemPreferences,
  // screen,
} from 'electron'
***REMOVED***
import User from './User'
import Setapp from './Setapp'
import Updater from './Updater'
import { isMac } from '../helpers'

***REMOVED***
  getShortcut() {
    return Store.get('shortcut').join('+')
***REMOVED***

  getIcon() {
    if (isMac) {
***REMOVED*** 'MenuIconTemplate.png'
  ***REMOVED***

    if (systemPreferences.isDarkMode()) {
***REMOVED*** 'MenuIconTemplateDarkMode.png'
  ***REMOVED***

    return 'MenuIconTemplate@2x.png'
***REMOVED***

  create(windowOptions = {}) {
    return new Promise((resolve, reject) => {
      if (
        this.menubar
        || !Store.get('showMenubar')
      ) {
        reject()
  ***REMOVED***
    ***REMOVED***

      const { titleBarStyle, trafficLightPosition, ...options } = windowOptions

      // const { bounds } = screen.getPrimaryDisplay()
      // const x = Math.ceil(bounds.x + ((bounds.width - options.width) / 2))
      // const y = Math.ceil(bounds.y + ((bounds.height - options.height) / 2))

      this.menubar = menubar({
        index: process.env.WEBPACK_DEV_SERVER_URL
          ? process.env.WEBPACK_DEV_SERVER_URL
          : 'app://./index.html',
        browserWindow: {
          ...options,
          movable: false,
          // x,
          // y,
          // alwaysOnTop: isDevelopment,
      ***REMOVED***,
        /* global __static */
        icon: path.join(__static, this.getIcon()),
        preloadWindow: true,
        showDockIcon: false,
        tooltip: 'Glyphfinder',
  ***REMOVED***

      this.menubar.on('after-create-window', () => {
        const contextMenu = Menu.buildFromTemplate([
          ...(isMac ? [
            { role: 'about' },
            { type: 'separator' },
          ] : []),
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

        // if (isDevelopment) {
        //   this.menubar.window.openDevTools()
        // }
  ***REMOVED***

      this.menubar.on('hide', () => {
        // if (isDevelopment) {
        //   this.menubar.window.closeDevTools()
        // }
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
***REMOVED***

***REMOVED***
