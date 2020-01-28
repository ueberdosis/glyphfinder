<template>
  <div class="glyph-row" :style="`height:${height}px`">
    <div class="glyph-row__title" :style="`height:${titleHeight}px`" v-if="title">
      {{ title }}
    </div>
    <glyph-item
      v-for="(glyph, index) in glyphs"
      :key="glyph.symbol"
      :glyph="glyph"
      :y="y"
      :x="index"
    />
  </div>
</template>

<script>
import GlyphItem from '@/components/GlyphItem'

export default {
  inject: ['navigatable'],

  components: {
    GlyphItem,
***REMOVED***,

  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,

    title: {
      type: String,
      default: null,
  ***REMOVED***,

    y: {
      type: Number,
      default: 0,
  ***REMOVED***,
***REMOVED***,

  computed: {
    height() {
***REMOVED*** this.title
        ? this.navigatable.glyphRowWithTitleHeight
        : this.navigatable.glyphRowHeight
  ***REMOVED***,

    titleHeight() {
***REMOVED*** this.navigatable.glyphRowWithTitleHeight - this.navigatable.glyphRowHeight
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
