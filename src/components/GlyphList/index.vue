<template>
  <div class="glyph-list">
    <virtual-list
      :size="50"
      :remain="8"
      :item="item"
      :itemcount="count"
      :itemprops="getItemprops"
    />
  </div>
</template>

<script>
import collect from 'collect.js'
import VirtualList from 'vue-virtual-scroll-list'
import GlyphRow from '@/components/GlyphRow'

export default {
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
      item: GlyphRow,
      itemsPerRow: 5,
  ***REMOVED***
***REMOVED***,

  computed: {
    count() {
***REMOVED*** this.rows.length
  ***REMOVED***,

    rows() {
***REMOVED*** collect(this.glyphs)
        .chunk(this.itemsPerRow)
        .toArray()
  ***REMOVED***,
***REMOVED***,

  methods: {
    getItemprops(itemIndex) {
***REMOVED*** {
        props: {
          glyphs: this.rows[itemIndex],
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>
