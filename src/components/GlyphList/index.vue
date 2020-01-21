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
import VirtualList from 'vue-virtual-scroll-list'
import GlyphItem from '@/components/GlyphItem'

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
      item: GlyphItem,
  ***REMOVED***
***REMOVED***,

  computed: {
    count() {
***REMOVED*** this.glyphs.length
  ***REMOVED***,
***REMOVED***,

  methods: {
    getItemprops(itemIndex) {
***REMOVED*** {
        props: {
          glyph: this.glyphs[itemIndex],
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>
