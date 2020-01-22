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
        if (key.value === symbol) {
    ***REMOVED*** [key.value]
      ***REMOVED***

        if (key.withAltGr === symbol) {
    ***REMOVED*** ['Alt', key.value]
      ***REMOVED***

        if (key.withShift === symbol) {
    ***REMOVED*** ['Shift', key.value]
      ***REMOVED***

        if (key.withShiftAltGr === symbol) {
    ***REMOVED*** ['Shift', 'Alt', key.value]
      ***REMOVED***

  ***REMOVED*** null
  ***REMOVED***
      .filter()
      .first()
***REMOVED***

***REMOVED***
