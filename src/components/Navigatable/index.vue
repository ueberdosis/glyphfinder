<script>
export default {
  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,
***REMOVED***,

  data() {
    const showRows = 8

    return {
      selectedIndex: 0,
      startRow: 0,
      showRows,
      itemsPerRow: 5,
      rowHeight: 50,
      firstFullyVisibleRow: 0,
      lastFullyVisibleRow: showRows - 1,
  ***REMOVED***
***REMOVED***,

  computed: {
    selectedGlyph() {
      if ((this.glyphs.length - 1) < this.selectedIndex) {
  ***REMOVED*** null
    ***REMOVED***

***REMOVED*** this.glyphs[this.selectedIndex]
  ***REMOVED***,

    selectedRow() {
***REMOVED*** Math.floor(this.selectedIndex / this.itemsPerRow)
  ***REMOVED***,
***REMOVED***,

  provide() {
    const navigatable = {
      selectGlyph: this.selectGlyph,
      handleScroll: this.handleScroll,
  ***REMOVED***

    Object.defineProperty(navigatable, 'selectedGlyph', {
      enumerable: true,
      get: () => this.selectedGlyph,
***REMOVED***

    Object.defineProperty(navigatable, 'startRow', {
      enumerable: true,
      get: () => this.startRow,
***REMOVED***

    Object.defineProperty(navigatable, 'showRows', {
      enumerable: true,
      get: () => this.showRows,
***REMOVED***

    Object.defineProperty(navigatable, 'itemsPerRow', {
      enumerable: true,
      get: () => this.itemsPerRow,
***REMOVED***

    Object.defineProperty(navigatable, 'rowHeight', {
      enumerable: true,
      get: () => this.rowHeight,
***REMOVED***

    return { navigatable }
***REMOVED***,

  watch: {
    glyphs: {
      immediate: true,
      handler() {
        this.selectedIndex = 0
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  methods: {
    handleScroll(data) {
      this.firstFullyVisibleRow = Math.ceil(data.offset / this.rowHeight)

      const firstVisibleRow = Math.floor(data.offset / this.rowHeight)
      const scrolledOverFirstRow = data.offset - firstVisibleRow * this.rowHeight

      this.lastFullyVisibleRow = this.firstFullyVisibleRow
        + this.showRows
        - (scrolledOverFirstRow > 0 ? 2 : 1)
  ***REMOVED***,

    maybeUpdateStartRow() {
      if (this.selectedRow < this.firstFullyVisibleRow) {
        this.startRow = this.startRow - this.showRows
    ***REMOVED***

      if (this.selectedRow > this.lastFullyVisibleRow) {
        this.startRow = this.selectedRow
    ***REMOVED***
  ***REMOVED***,

    selectGlyph(glyph) {
      const index = this.glyphs.findIndex(item => item.symbol === glyph.symbol)

      this.selectedIndex = index
  ***REMOVED***,

    handleKeyDown(event) {
      const { key } = event

      if (key.startsWith('Arrow')) {
        event.preventDefault()
    ***REMOVED***

      if (key === 'ArrowDown') {
        this.changeIndex(5)
    ***REMOVED*** else if (key === 'ArrowUp') {
        this.changeIndex(-5)
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
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  render() {
    return this.$scopedSlots.default()
***REMOVED***,
}
</script>
