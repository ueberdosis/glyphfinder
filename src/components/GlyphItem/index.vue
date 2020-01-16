<template>
  <button
    class="glyph-item"
    type="button"
    @keydown.enter="copyToClipboard"
    @dblclick="copyToClipboard"
    :title="glyph.description"
  >
    {{ glyph.symbol }}
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  methods: {
    copyToClipboard() {
      const copied = copy(this.glyph.symbol)
      if (copied) {
        console.log('copied', this.glyph)
    ***REMOVED*** else {
        console.log('copy failed')
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
