import path from 'path'
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import LicenseCheck from './services/LicenseCheck'
import Updater from './services/Updater'
import MenuBuilder from './services/MenuBuilder'
import Setapp from './services/Setapp'
import MenuBar from './services/MenuBar'
import AutoStart from './services/AutoStart'
import DarkMode from './services/DarkMode'
import Store from './services/Store'
import { isProduction, isDevelopment, isWindows } from './helpers'

Setapp.init()

const isMenubar = Store.get('showMenubar')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

AutoStart.update()

function getWindow() {
  return new Promise(resolve => {
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
      },
      transparent: !isWindows,
      backgroundColor: DarkMode.get() ? '#000000' : '#F3F3F3',
      webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        nodeIntegrationInWorker: process.env.ELECTRON_NODE_INTEGRATION,
        enableRemoteModule: true,
        backgroundThrottling: false, // allows repaint when window is hidden
      },
      icon: path.resolve(__dirname, isWindows ? '../build/icon.ico' : '../public/icon.png'),
    }

    if (!process.env.WEBPACK_DEV_SERVER_URL) {
      createProtocol('app')
    }

    if (isMenubar) {
      MenuBar.create(windowOptions).then(browserWindow => {
        win = browserWindow
        resolve()
      })
    } else {
      win = new BrowserWindow(windowOptions)
      resolve()
    }
  })
}

function createWindow() {
  MenuBuilder.setMenu()

  getWindow().then(() => {
    LicenseCheck.setWindow(win)
    DarkMode.init()

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST && !isMenubar) win.webContents.openDevTools()
    } else {
      // Load the index.html when not in development
      win.loadURL('app://./index.html')
    }

    if (!isMenubar) {
      win.show()
    }

    if (isProduction && !Setapp.isActive) {
      Updater.silentlyCheckForUpdates()
    }

    win.on('closed', () => {
      win = null
    })

    win.on('hide', () => {
      win.webContents.send('windowHidden')
    })
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
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
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
