<template>
  <button
    class="glyph-item"
    :class="{ 'is-active': isSelected }"
    type="button"
    @keydown.enter="copyToClipboard"
    @click="handleClick"
    @dblclick="copyToClipboard"
    :title="glyph.name"
  >
    {{ glyph.symbol }}
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  inject: ['navigatable'],

  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  computed: {
    isSelected() {
***REMOVED*** this.navigatable.selectedGlyph
        ? this.navigatable.selectedGlyph.symbol === this.glyph.symbol
        : false
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

    handleClick() {
      this.navigatable.selectGlyph(this.glyph)
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
