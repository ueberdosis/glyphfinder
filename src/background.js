import path from 'path'
import {
  app, protocol, BrowserWindow,
} from 'electron'
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib'

import LicenseCheck from './services/LicenseCheck'
import Updater from './services/Updater'
import MenuBuilder from './services/MenuBuilder'
import Setapp from './services/Setapp'
import MenuBar from './services/MenuBar'
import Store from './services/Store'

Setapp.init()

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction
const isWindows = process.platform === 'win32'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {

  MenuBuilder.setMenu()

  const windowOptions = {
    title: 'Glyphfinder',
    width: 340 + (isWindows ? 6 : 0),
    height: 580,
    resizable: false,
    fullscreen: false,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 16,
      y: 24,
  ***REMOVED***,
    transparent: !isWindows,
    backgroundColor: '#000',
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.ELECTRON_NODE_INTEGRATION,
  ***REMOVED***,
    icon: path.resolve(__dirname, isWindows ? 'build/icon.ico' : 'build/icon.icns'),
***REMOVED***

  if (Store.get('showMenubar', false)) {
    MenuBar.create(windowOptions)
    win = MenuBar.menubar.window
***REMOVED*** else {
    win = new BrowserWindow(windowOptions)
***REMOVED***

  LicenseCheck.setWindow(win)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
***REMOVED*** else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
***REMOVED***

  win.show()

  if (isProduction && !Setapp.isActive) {
    Updater.silentlyCheckForUpdates()
***REMOVED***

  win.on('closed', () => {
    win = null
***REMOVED***)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
***REMOVED***
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
***REMOVED***
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools()
  ***REMOVED*** catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
  ***REMOVED***
***REMOVED***

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
    ***REMOVED***
***REMOVED***
***REMOVED*** else {
    process.on('SIGTERM', () => {
      app.quit()
***REMOVED***
***REMOVED***
}
