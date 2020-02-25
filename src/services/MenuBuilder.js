import { app, Menu, BrowserWindow } from 'electron'
import Updater from './Updater'
import Setapp from './Setapp'

const isMac = process.platform === 'darwin'

***REMOVED***

  template() {
    return [
      {
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+,',
            click() {
              BrowserWindow
                .getAllWindows()
                .forEach(browserWindow => {
                  browserWindow.webContents.send('showPreferences')
            ***REMOVED***
          ***REMOVED***,
        ***REMOVED***,
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
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
          { role: 'quit' },
        ],
    ***REMOVED***,
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
          ] : []),
          { role: 'selectAll' },
          { role: 'delete' },
        ],
    ***REMOVED***,
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
          {
            label: 'Show Developer Tools',
            accelerator: 'Alt+CmdOrCtrl+I',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.toggleDevTools()
            ***REMOVED***
          ***REMOVED***,
        ***REMOVED***,
        ],
    ***REMOVED***,
      {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' },
          { role: 'minimize' },
          { role: 'zoom' },
          { type: 'separator' },
          { role: 'front' },
        ],
    ***REMOVED***,
    ]
***REMOVED***

  setMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template()))
***REMOVED***

***REMOVED***
