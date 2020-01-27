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
  ***REMOVED***
***REMOVED***,

  computed: {
    rowsCount() {
***REMOVED*** this.rows.length
  ***REMOVED***,

    rows() {
      const glyphRows = collect(this.glyphs)
        .chunk(this.navigatable.itemsPerRow)
        .map(glyphs => ({
          glyphs: glyphs.toArray(),
    ***REMOVED***)
        .toArray()

***REMOVED*** [
        {
          title: 'Frequently used',
      ***REMOVED***,
        {
          title: 'Glyphs',
      ***REMOVED***,
        ...glyphRows,
      ]
  ***REMOVED***,
***REMOVED***,

  methods: {
    getVariableHeight(index) {
***REMOVED*** this.rows[index].title
        ? this.navigatable.titleRowHeight
        : this.navigatable.rowHeight
  ***REMOVED***,

    getItemProps(index) {
***REMOVED*** {
        props: {
          title: this.rows[index].title,
          glyphs: this.rows[index].glyphs,
      ***REMOVED***,
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
