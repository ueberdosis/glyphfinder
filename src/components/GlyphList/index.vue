<template>
  <div class="glyph-list">
    <virtual-list
      :start="navigatable.startRow"
      :size="50"
      :remain="navigatable.showRows"
      :item="rowComponent"
      :itemcount="rowsCount"
      :itemprops="getItemProps"
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
***REMOVED***,
}
</script>
