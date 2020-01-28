<script>
import collect from 'collect.js'
import Store from '@/services/Store'

export default {
  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      selectedIndex: 0,
      startRow: 0,
      showRows: 8,
      itemsPerRow: 5,
      glyphRowHeight: 62,
      titleRowHeight: 30,
      firstFullyVisibleRow: 0,
      lastFullyVisibleRow: 0,
      isExpanded: Store.get('expanded', false),
      usage: Store.get('usage', []),
      scrollPosition: {
        offset: 0,
    ***REMOVED***,
  ***REMOVED***
***REMOVED***,

  computed: {
    frequentlyUsedGlyphs() {
***REMOVED*** collect(this.usage)
        .sortByDesc('count')
        .map(item => this.glyphs.find(glyph => glyph.symbol === item.symbol))
        .take(10)
        .toArray()
  ***REMOVED***,

    hasFrequentlyUsedGlyphs() {
***REMOVED*** this.frequentlyUsedGlyphs.length
  ***REMOVED***,

    glyphRows() {
***REMOVED*** this.chunkGlyphs(this.glyphs)
  ***REMOVED***,

    frequentlyUsedGlyphRows() {
***REMOVED*** this.chunkGlyphs(this.frequentlyUsedGlyphs)
  ***REMOVED***,

    rows() {
***REMOVED*** [
        ...(this.hasFrequentlyUsedGlyphs ? [
          {
            title: 'Frequently used',
        ***REMOVED***,
          ...this.frequentlyUsedGlyphRows,
          {
            title: 'Glyphs',
        ***REMOVED***,
        ] : []),
        ...this.glyphRows,
      ]
  ***REMOVED***,

    selectedGlyph() {
      if ((this.glyphs.length - 1) < this.selectedIndex) {
  ***REMOVED*** null
    ***REMOVED***

***REMOVED*** this.glyphs[this.selectedIndex]
  ***REMOVED***,

    selectedRow() {
***REMOVED*** Math.floor(this.selectedIndex / this.itemsPerRow)
  ***REMOVED***,

    visibleRows() {
***REMOVED*** this.showRows - (this.isExpanded ? 2 : 1)
  ***REMOVED***,
***REMOVED***,

  watch: {
    glyphs: {
      immediate: true,
      handler() {
        this.selectedIndex = 0
        this.startRow = 0
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  methods: {
    chunkGlyphs(glyphs) {
***REMOVED*** collect(glyphs)
        .chunk(this.itemsPerRow)
        .filter(items => items.toArray().length)
        .map(items => ({
          glyphs: items.toArray(),
    ***REMOVED***)
        .toArray()
  ***REMOVED***,

    toggleExpand() {
      this.isExpanded = !this.isExpanded
      Store.set('expanded', this.isExpanded)
      this.updateVisibleRows()
  ***REMOVED***,

    handleScroll(scrollPosition) {
      this.scrollPosition = scrollPosition
      this.updateVisibleRows()
  ***REMOVED***,

    updateVisibleRows() {
      this.firstFullyVisibleRow = Math.ceil(this.scrollPosition.offset / this.glyphRowHeight)

      const firstVisibleRow = Math.floor(this.scrollPosition.offset / this.glyphRowHeight)
      const scrolledOverFirstRow = this.scrollPosition.offset
        - firstVisibleRow
        * this.glyphRowHeight

      this.lastFullyVisibleRow = this.firstFullyVisibleRow
        + this.visibleRows
        - (scrolledOverFirstRow > 0 ? 2 : 1)
  ***REMOVED***,

    maybeUpdateStartRow() {
      if (this.selectedRow < this.firstFullyVisibleRow) {
        this.startRow = Math.max(this.startRow - this.visibleRows, 0)
    ***REMOVED***

      if (this.selectedRow > this.lastFullyVisibleRow) {
        this.startRow = this.selectedRow
    ***REMOVED***
  ***REMOVED***,

    selectGlyph(glyph) {
      this.selectedIndex = this.glyphs.findIndex(item => item.symbol === glyph.symbol)
  ***REMOVED***,

    handleKeyDown(event) {
      const { key } = event

      if (key.startsWith('Arrow')) {
        event.preventDefault()
    ***REMOVED***

      if (key === 'ArrowDown') {
        this.changeIndex(this.itemsPerRow)
    ***REMOVED*** else if (key === 'ArrowUp') {
        this.changeIndex(-this.itemsPerRow)
    ***REMOVED*** else if (key === 'ArrowRight') {
        this.changeIndex(1)
    ***REMOVED*** else if (key === 'ArrowLeft') {
        this.changeIndex(-1)
    ***REMOVED***
  ***REMOVED***,

    changeIndex(change = 0) {
      const min = 0
      const max = this.glyphs.length - 1
      const newIndex = Math.min(Math.max(parseInt(this.selectedIndex + change, 10), min), max)

      this.selectedIndex = newIndex
      this.maybeUpdateStartRow()
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.updateVisibleRows()
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  provide() {
    const navigatable = {
      selectGlyph: this.selectGlyph,
      handleScroll: this.handleScroll,
      toggleExpand: this.toggleExpand,
  ***REMOVED***

    Object.defineProperties(navigatable, {
      selectedGlyph: {
        enumerable: true,
        get: () => this.selectedGlyph,
    ***REMOVED***,
      startRow: {
        enumerable: true,
        get: () => this.startRow,
    ***REMOVED***,
      showRows: {
        enumerable: true,
        get: () => this.showRows,
    ***REMOVED***,
      itemsPerRow: {
        enumerable: true,
        get: () => this.itemsPerRow,
    ***REMOVED***,
      glyphRowHeight: {
        enumerable: true,
        get: () => this.glyphRowHeight,
    ***REMOVED***,
      titleRowHeight: {
        enumerable: true,
        get: () => this.titleRowHeight,
    ***REMOVED***,
      isExpanded: {
        enumerable: true,
        get: () => this.isExpanded,
    ***REMOVED***,
***REMOVED***

    return { navigatable }
***REMOVED***,

  render() {
    return this.$scopedSlots.default({
      selectedGlyph: this.selectedGlyph,
      rows: this.rows,
***REMOVED***
***REMOVED***,
}
</script>
