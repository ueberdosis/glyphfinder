import collect from 'collect.js'
import keymap from 'native-keymap'
import Emitter from '@/services/Emitter'
import { findDuplicatesInArray, isSameArray, getArrayDepth } from '@/helpers'
import Store from '@/services/Store'

const isISOKeyboard = keymap.isISOKeyboard()
const basicKeyMap = keymap.getKeyMap()

// swap Backquote and IntlBackslash
// see: https://github.com/microsoft/vscode/issues/24153
if (isISOKeyboard) {
  const { Backquote, IntlBackslash } = basicKeyMap

  basicKeyMap.IntlBackslash = Backquote
  basicKeyMap.Backquote = IntlBackslash
}

// eslint-disable-next-line
// console.table(basicKeyMap)

export default class Keyboard {

  static specialKeyNames = [
    'Shift',
    'Control',
    'Alt',
    'Meta',
  ]

  static blockedKeys = [
    'NumpadDivide',
    'NumpadMultiply',
    'NumpadSubtract',
    'NumpadAdd',
    'NumpadDecimal',
    'NumpadEqual',
  ]

  static blockedShortcuts = [
    ['Meta', 'Tab'], // switch app
    ['Meta', 'Shift', '4'], // screenshot
    ['Meta', 'Shift', '5'], // screenshot
    ['Meta', 'Shift', '6'], // screenshot
    ['Alt', 'Meta', 'Escape'], // force quit
    ['F11'], // show desktop
    ['Meta', 'Space'], // spotlight
    ['Control', 'ArrowUp'], // window navigation
    ['Control', 'ArrowDown'], // window navigation
    ['Control', 'ArrowLeft'], // window navigation
    ['Control', 'ArrowRight'], // window navigation
    ['Control', 'Meta', 'd'], // dictionary
    ['Alt', 'Meta', 'd'], // toggle dock
    Store.get('shortcut', []), // mouseless shortcut
  ]

  static keymap = Object
    .entries(basicKeyMap)
    .map(([code, data]) => ({
      code,
      ...data,
***REMOVED***)
    // maybe this will break something
    .filter(key => !this.blockedKeys.includes(key.code))

  static formats = {
    CapsLock: '⇪',
    Shift: '⇧',
    Control: '⌃',
    Alt: '⌥',
    Meta: '⌘',
    ArrowUp: '↑',
    ArrowRight: '→',
    ArrowDown: '↓',
    ArrowLeft: '←',
    Enter: '↩',
    Backspace: '⌫',
    Delete: '⌦',
    Escape: '⎋',
    Tab: '⇥',
    PageUp: '⇞',
    PageDown: '⇟',
    Space: '␣',
***REMOVED***

  static formatKeyCode(name) {
    return this.formats[name] ? this.formats[name] : name
***REMOVED***

***REMOVED***
    this.emitter = new Emitter()
    this.specialKeys = []
    this.regularKeys = []
    this.keydownHandler = this.handleKeydown.bind(this)
    this.keyupHandler = this.handleKeyup.bind(this)
    window.addEventListener('keydown', this.keydownHandler)
    window.addEventListener('keyup', this.keyupHandler)
***REMOVED***

  on(...args) {
    this.emitter.on(...args)
***REMOVED***

  off(...args) {
    this.emitter.off(...args)
***REMOVED***

  setSpecialKeys(event) {
    const keys = []

    if (event.shiftKey) {
      keys.push('Shift')
  ***REMOVED***

    if (event.ctrlKey) {
      keys.push('Control')
  ***REMOVED***

    if (event.altKey) {
      keys.push('Alt')
  ***REMOVED***

    if (event.metaKey) {
      keys.push('Meta')
  ***REMOVED***

    this.specialKeys = keys
***REMOVED***

  get keys() {
    return [...this.specialKeys, ...this.regularKeys]
***REMOVED***

  get resolvedKeys() {
    return collect(this.constructor.resolveCodesFromKeys(this.keys))
      .unique()
      .toArray()
***REMOVED***

  getKeyValue(event) {
    const key = this.constructor.keymap.find(item => item.code === event.code)

    if (!key) {
***REMOVED*** event.code
  ***REMOVED***

    let { value } = key

    if (this.specialKeys.length === 1 && this.specialKeys.includes('Shift')) {
      value = key.withShift
  ***REMOVED***

    if (this.specialKeys.length === 1 && this.specialKeys.includes('Alt')) {
      value = key.withAltGr
  ***REMOVED***

    if (this.specialKeys.includes('Shift') && this.specialKeys.includes('Alt')) {
      value = key.withShiftAltGr
  ***REMOVED***

    if (value === ' ' || value === ' ') {
***REMOVED*** 'Space'
  ***REMOVED***

    if (value === '') {
***REMOVED*** key.code
  ***REMOVED***

    return value
***REMOVED***

  static resolveCodesFromKeys(data = []) {
    const groups = getArrayDepth(data) > 1 ? data : [data]
    const resolvedGroups = groups.map(keys => {
      const resolvedKeys = keys.map(key => {
        let match = null

        match = this.keymap.find(item => item.value === key)

        if (match) {
    ***REMOVED*** match.value
      ***REMOVED***

        match = this.keymap.find(item => item.withShift === key)

        if (match) {
    ***REMOVED*** ['Shift', match.value]
      ***REMOVED***

        match = this.keymap.find(item => item.withAltGr === key)

        if (match) {
    ***REMOVED*** ['Alt', match.value]
      ***REMOVED***

        match = this.keymap.find(item => item.withShiftAltGr === key)

        if (match) {
    ***REMOVED*** ['Shift', 'Alt', match.value]
      ***REMOVED***

  ***REMOVED*** key
  ***REMOVED***

      // https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/keyboard/#keyboard-shortcuts
      const sortOrder = ['Control', 'Alt', 'Shift', 'Meta']

***REMOVED*** collect(resolvedKeys)
        .flatten()
        .filter()
        .sort((a, b) => {
          const indexA = sortOrder.indexOf(a)
          const indexB = sortOrder.indexOf(b)
          const hugeNumber = 1000 // TODO: ugly

    ***REMOVED*** (indexA >= 0 ? indexA : hugeNumber)
            - (indexB >= 0 ? indexB : hugeNumber)
    ***REMOVED***
        .toArray()
***REMOVED***

    return collect(resolvedGroups)
      .sortBy(keys => keys.length)
      .first()
***REMOVED***

  static isPossible(keys = []) {
    // duplicated keys
    if (findDuplicatesInArray(keys).length) {
***REMOVED*** false
  ***REMOVED***

    // only modifier keys
    if (keys.every(key => this.specialKeyNames.includes(key))) {
***REMOVED*** false
  ***REMOVED***

    // blocked system shortcuts
    if (this.blockedShortcuts.some(blockedShortcut => isSameArray(blockedShortcut, keys))) {
***REMOVED*** false
  ***REMOVED***

    return true
***REMOVED***

  handleKeydown(event) {
    this.setSpecialKeys(event)
    const value = this.getKeyValue(event)

    if (this.isPressed(value)) {
***REMOVED***
  ***REMOVED***

    this.emitter.emit('update', event)

    if (this.constructor.specialKeyNames.includes(event.key)) {
***REMOVED***
  ***REMOVED***

    this.regularKeys.push(value)
    this.emitter.emit('shortcut', event)
    this.regularKeys = []
    this.specialKeys = []
***REMOVED***

  handleKeyup(event) {
    this.setSpecialKeys(event)
    this.emitter.emit('update', event)
***REMOVED***

  is(keys = []) {
    const checkedKeys = keys.map(key => key.toLowerCase())
    const pressedKeys = this.resolvedKeys.map(key => key.toLowerCase())
    return isSameArray(checkedKeys, pressedKeys)
***REMOVED***

  isPressed(name = null) {
    return !!this.regularKeys.find(key => key.toLowerCase() === name.toLowerCase())
***REMOVED***

  destroy() {
    this.emitter.destroy()
    window.removeEventListener('keydown', this.keydownHandler)
    window.removeEventListener('keyup', this.keyupHandler)
***REMOVED***

}
