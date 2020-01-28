<template>
  <button
    class="glyph-item"
    :class="{
      'is-active': isSelected,
      'is-emoji': isEmoji,
      'is-space': isSpace,
  ***REMOVED***"
    type="button"
    @click="handleClick"
    @dblclick="copyToClipboard"
    :title="glyph.name"
  >
    <span class="glyph-item__symbol">{{ glyph.symbol }}</span>
  </button>
</template>

<script>
import collect from 'collect.js'
import copy from 'copy-to-clipboard'
import Store from '@/services/Store'

export default {
  inject: ['navigatable'],

  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,

    x: {
      type: Number,
      default: 0,
  ***REMOVED***,

    y: {
      type: Number,
      default: 0,
  ***REMOVED***,
***REMOVED***,

  computed: {
    isSelected() {
***REMOVED*** this.navigatable.selectedGlyph
        ? this.navigatable.selectedGlyph.id === this.glyph.id
        : false
  ***REMOVED***,

    isEmoji() {
***REMOVED*** this.glyph.tags.includes('emoji')
  ***REMOVED***,

    isSpace() {
***REMOVED*** !/[^\s]/.test(this.glyph.symbol)
        && this.glyph.code !== 5760
        && this.glyph.code !== '5760'
  ***REMOVED***,
***REMOVED***,

  methods: {
    copyToClipboard() {
      const copied = copy(this.glyph.symbol)
      this.increaseUsage()

      if (copied) {
        console.log('copied', this.glyph)
    ***REMOVED*** else {
        console.log('copy failed')
    ***REMOVED***
  ***REMOVED***,

    increaseUsage() {
      const usage = Store.get('usage', [])
      const usageItem = usage.find(item => item.symbol === this.glyph.symbol) || {
        symbol: this.glyph.symbol,
        count: 0,
    ***REMOVED***
      const newUsageItem = {
        ...usageItem,
        count: usageItem.count + 1,
    ***REMOVED***
      const newUsage = collect(usage)
        .filter(item => item.symbol !== this.glyph.symbol)
        .push(newUsageItem)
        .toArray()

      Store.set('usage', newUsage)
  ***REMOVED***,

    handleClick() {
      this.navigatable.setSelection(this.x, this.y)
  ***REMOVED***,

    handleKeyDown(event) {
      if (!this.isSelected) {
  ***REMOVED***
    ***REMOVED***

      if (
        event.key === 'Enter'
        || (this.isMac && event.key === 'c' && event.metaKey)
        || (this.isWindows && event.key === 'c' && event.ctrlKey)
      ) {
        this.copyToClipboard()
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
