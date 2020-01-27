<template>
  <div class="glyph-row" :style="`height:${height}px`">
    <div class="glyph-row__title" v-if="title">
      {{ title }}
    </div>
    <glyph-item
      v-for="glyph in glyphs"
      :key="glyph.symbol"
      :glyph="glyph"
      v-else
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
***REMOVED***,

  computed: {
    height() {
***REMOVED*** this.title
        ? this.navigatable.titleRowHeight
        : this.navigatable.rowHeight
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
