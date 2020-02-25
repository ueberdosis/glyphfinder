import collect from 'collect.js'
import keymap from 'native-keymap'

const isISOKeyboard = keymap.isISOKeyboard()
const basicKeyMap = keymap.getKeyMap()

// swap Backquote and IntlBackslash
// see: https://github.com/microsoft/vscode/issues/24153
if (isISOKeyboard) {
  const { Backquote, IntlBackslash } = basicKeyMap

  basicKeyMap.IntlBackslash = Backquote
  basicKeyMap.Backquote = IntlBackslash
}

***REMOVED***

  keymap = Object
    .entries(basicKeyMap)
    .map(([code, data]) => ({
      code,
      ...data,
***REMOVED***)

  get(symbol) {
    return collect(this.keymap)
      .map(key => {
        const value = key.value === ' ' ? '␣' : key.value

        if (key.value === symbol) {
    ***REMOVED*** [value]
      ***REMOVED***

        if (key.withAltGr === symbol) {
    ***REMOVED*** ['⌥', value]
      ***REMOVED***

        if (key.withShift === symbol) {
    ***REMOVED*** ['⇧', value]
      ***REMOVED***

        if (key.withShiftAltGr === symbol) {
    ***REMOVED*** ['⇧', '⌥', value]
      ***REMOVED***

  ***REMOVED*** null
  ***REMOVED***
      .filter()
      .first()
***REMOVED***

***REMOVED***
