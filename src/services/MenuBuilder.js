import { app, Menu, BrowserWindow } from 'electron'
import Updater from './Updater'
import Setapp from './Setapp'
import { isMac } from '../helpers'

export default new class {

  template() {
    return [
      {
        label: app.getName(),
        submenu: [
          ...(isMac ? [
            { role: 'about' },
            { type: 'separator' },
          ] : []),
          {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+,',
            click() {
              BrowserWindow
                .getAllWindows()
                .forEach(browserWindow => {
                  browserWindow.webContents.send('showPreferences')
                  browserWindow.show()
                })
            },
          },
          ...(isMac ? [
            { type: 'separator' },
          ] : []),
          ...(!Setapp.isActive ? [
            {
              label: 'Check for Updates',
              click(menuItem) {
                Updater.checkForUpdates(menuItem)
              },
            },
          ] : []),
          ...(isMac ? [
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
          ] : []),
          { role: 'quit' },
        ],
      },
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
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { type: 'separator' },
          {
            label: 'Show Developer Tools',
            accelerator: 'Alt+CmdOrCtrl+I',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.toggleDevTools()
              }
            },
          },
        ],
      },
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
      },
    ]
  }

  setMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template()))
  }

}()
