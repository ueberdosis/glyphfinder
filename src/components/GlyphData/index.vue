<template>
  <div class="glyph-data">
    <div class="glyph-data__name">
      {{ glyph.name }}
    </div>
    <div v-if="showShortcut">
      Shortcut: {{ shortcut }}
    </div>
  </div>
</template>

<script>
import Shortcut from '@/services/Shortcut'

export default {
  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  computed: {
    shortcut() {
***REMOVED*** Shortcut.get(this.glyph.symbol)
  ***REMOVED***,

    showShortcut() {
***REMOVED*** this.shortcut && this.shortcut.length > 1
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
