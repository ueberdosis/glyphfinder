<template>
  <div class="glyph-list">
    <virtual-list
      :start="navigatable.startRow"
      :size="navigatable.rowHeight"
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
  ***REMOVED***
***REMOVED***,

  computed: {
    rowsCount() {
***REMOVED*** this.rows.length
  ***REMOVED***,

    rows() {
***REMOVED*** collect(this.glyphs)
        .chunk(this.navigatable.itemsPerRow)
        .toArray()
  ***REMOVED***,
***REMOVED***,

  methods: {
    getItemProps(itemIndex) {
***REMOVED*** {
        props: {
          glyphs: this.rows[itemIndex],
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED***,

    onScroll(event, data) {
      this.navigatable.handleScroll(data)
  ***REMOVED***,
***REMOVED***,
}
</script>
