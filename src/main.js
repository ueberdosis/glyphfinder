import { ipcRenderer, remote } from 'electron'
import Vue from 'vue'
import keyboardSymbol from 'keyboard-symbol'
import Wrapper from '@/components/Wrapper'
import Store from '@/services/Store'
import { isMac, uppercase } from './helpers'

const customTitlebar = require('custom-electron-titlebar')

Vue.config.productionTip = false

Vue.filter('key', name => keyboardSymbol(name, isMac ? 'mac' : 'win'))

Vue.filter('uppercase', value => uppercase(value))

Vue.mixin({
  data() {
    return {
      isMac,
      isWindows: !isMac,
  ***REMOVED***
***REMOVED***,
})

new Vue({
  render: h => h(Wrapper),
  mounted() {
    const showMenubar = Store.get('showMenubar')

    document.documentElement.classList.add(this.isWindows ? 'is-windows' : 'is-mac')

    this.setDarkMode(remote.getCurrentWindow().isDarkMode)

    ipcRenderer.on('darkModeChanged', (event, isDarkMode) => {
      this.setDarkMode(isDarkMode)
***REMOVED***

    if (showMenubar) {
      document.documentElement.classList.add('is-menubar')
  ***REMOVED***

    if (this.isWindows && !showMenubar) {
      this.titleBar = new customTitlebar.Titlebar({
        icon: './icon.png',
        backgroundColor: customTitlebar.Color.fromHex('#000'),
        itemBackgroundColor: customTitlebar.Color.fromHex('#111'),
        maximizable: false,
  ***REMOVED***

      this.titleBar.updateTitle(' ')
  ***REMOVED***
***REMOVED***,

  methods: {
    setDarkMode(value) {
      if (value) {
        document.documentElement.classList.add('is-dark-mode')
    ***REMOVED*** else {
        document.documentElement.classList.remove('is-dark-mode')
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  beforeDestroy() {
    if (this.titleBar) {
      this.titleBar.dispose()
  ***REMOVED***
***REMOVED***,
}).$mount('#app')
