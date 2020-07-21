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

export default new class {

  keymap = Object
    .entries(basicKeyMap)
    .map(([code, data]) => ({
      code,
      ...data,
    }))

  get(symbol) {
    return collect(this.keymap)
      .map(key => {
        const value = key.value === ' ' ? 'space' : key.value

        if (key.value === symbol) {
          return [value]
        }

        if (key.withAltGr === symbol) {
          return ['alt', value]
        }

        if (key.withShift === symbol) {
          return ['shift', value]
        }

        if (key.withShiftAltGr === symbol) {
          return ['shift', 'alt', value]
        }

        return null
      })
      .filter()
      .first()
  }

}()
