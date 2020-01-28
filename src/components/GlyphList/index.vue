<template>
  <div class="glyph-list">
    <virtual-list
      :scrollelement="scrollelement"
      :start="navigatable.startRow"
      :size="navigatable.glyphRowHeight"
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
import VirtualList from 'vue-virtual-scroll-list'
import GlyphRow from '@/components/GlyphRow'

export default {
  inject: ['navigatable'],

  components: {
    VirtualList,
***REMOVED***,

  props: {
    rows: {
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
***REMOVED***,

  methods: {
    getVariableHeight(index) {
***REMOVED*** this.rows[index].title
        ? this.navigatable.glyphRowWithTitleHeight
        : this.navigatable.glyphRowHeight
  ***REMOVED***,

    getItemProps(index) {
***REMOVED*** {
        props: {
          ...this.rows[index],
          y: index,
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
