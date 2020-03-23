import Vue from 'vue'
import Bowser from 'bowser'
import Wrapper from '@/components/Wrapper'
import Store from '@/services/Store'
import { isMac, uppercase } from './helpers'

const customTitlebar = require('custom-electron-titlebar')

Vue.config.productionTip = false

const { os } = Bowser.parse(window.navigator.userAgent)

Vue.filter('key', name => {
  const formattedName = name.toLowerCase()
  const formats = {
    capslock: '⇪',
    shift: '⇧',
    control: isMac ? '⌃' : 'Ctrl',
    alt: isMac ? '⌥' : 'Alt',
    meta: isMac ? '⌘' : '❖',
    super: isMac ? '⌘' : '❖',
    command: isMac ? '⌘' : '❖',
    arrowup: '↑',
    arrowright: '→',
    arrowdown: '↓',
    arrowleft: '←',
    enter: '↩',
    backspace: '⌫',
    delete: '⌦',
    escape: '⎋',
    tab: '⇥',
    pageup: '⇞',
    pagedown: '⇟',
    space: '␣',
***REMOVED***

  return formats[formattedName] ? formats[formattedName] : name
})

Vue.filter('uppercase', value => uppercase(value))

Vue.mixin({
  data() {
    return {
      isWindows: os.name === 'Windows',
      isMac: os.name === 'macOS',
  ***REMOVED***
***REMOVED***,
})

new Vue({
  render: h => h(Wrapper),
  mounted() {
    const showMenubar = Store.get('showMenubar', true)

    document.documentElement.classList.add(this.isWindows ? 'is-windows' : 'is-mac')

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

  beforeDestroy() {
    if (this.titleBar) {
      this.titleBar.dispose()
  ***REMOVED***
***REMOVED***,
}).$mount('#app')
