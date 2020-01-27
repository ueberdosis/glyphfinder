<template>
  <div class="glyph-list">
    <virtual-list
      :scrollelement="scrollelement"
      :start="navigatable.startRow"
      :size="navigatable.rowHeight"
      :variable="getVariableHeight"
      :remain="navigatable.showRows"
      :item="rowComponent"
      :itemcount="rowsCount"
      :itemprops="getItemProps"
      :onscroll="onScroll"
    />
  </div>
</template>

<script>
import collect from 'collect.js'
import VirtualList from 'vue-virtual-scroll-list'
import GlyphRow from '@/components/GlyphRow'
import Store from '@/services/Store'

export default {
  inject: ['navigatable'],

  components: {
    VirtualList,
***REMOVED***,

  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      rowComponent: GlyphRow,
      scrollelement: null,
      usage: Store.get('usage', []),
  ***REMOVED***
***REMOVED***,

  computed: {
    rowsCount() {
***REMOVED*** this.rows.length
  ***REMOVED***,

    frequentlyUsedGlyphs() {
***REMOVED*** collect(this.usage)
        .sortByDesc('count')
        .map(item => this.glyphs.find(glyph => glyph.symbol === item.symbol))
        .take(10)
        .toArray()
  ***REMOVED***,

    rows() {
      const allGlyphRows = this.chunkGlyphs(this.glyphs)
      const frequentlyUsedGlyphRows = this.chunkGlyphs(this.frequentlyUsedGlyphs)

***REMOVED*** [
        ...(this.frequentlyUsedGlyphs.length ? [
          {
            title: 'Frequently used',
        ***REMOVED***,
          ...frequentlyUsedGlyphRows,
          {
            title: 'Glyphs',
        ***REMOVED***,
        ] : []),
        ...allGlyphRows,
      ]
  ***REMOVED***,
***REMOVED***,

  methods: {
    chunkGlyphs(glyphs) {
***REMOVED*** collect(glyphs)
        .chunk(this.navigatable.itemsPerRow)
        .filter(items => items.toArray().length)
        .map(items => ({
          glyphs: items.toArray(),
    ***REMOVED***)
        .toArray()
  ***REMOVED***,

    getVariableHeight(index) {
***REMOVED*** this.rows[index].title
        ? this.navigatable.titleRowHeight
        : this.navigatable.rowHeight
  ***REMOVED***,

    getItemProps(index) {
***REMOVED*** {
        props: this.rows[index],
    ***REMOVED***
  ***REMOVED***,

    onScroll(event, data) {
      this.navigatable.handleScroll(data)
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.scrollelement = this.$el
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
