<script>
import collect from 'collect.js'
import Store from '@/services/Store'
import Glyphs from '@/services/Glyphs'
import GlyphIndex from '@/services/GlyphIndex'


// const { glyphs, searchIndex } = GlyphIndex.getDB()

// const glyphIndex = new Glyphs(glyphs)

// console.time('importIndex')
// glyphIndex.importIndex(searchIndex)
// console.timeEnd('importIndex')

// console.time('createIndex')
// glyphIndex.createIndex()
// console.timeEnd('createIndex')

export default {

  // props: {
  //   glyphIndex: {
  //     default: null,
  //     // required: true,
  // ***REMOVED***,
  // },

  data() {
    return {
      // glyphIndex: null,
      query: '',
      // glyphs: [],
      selection: {
        x: 0,
        y: 0,
    ***REMOVED***,
      element: null,
      startRow: 0,
      showRows: 8,
      itemsPerRow: 5,
      glyphRowHeight: 62,
      glyphRowWithTitleHeight: 92,
      firstFullyVisibleRowIndex: 0,
      lastFullyVisibleRowIndex: 0,
      isExpanded: Store.get('expanded', false),
      expandedHeight: 101,
      usage: Store.get('usage', []),
      scrollPosition: {
        offset: 0,
    ***REMOVED***,
  ***REMOVED***
***REMOVED***,

  computed: {
    glyphs() {
      // console.log('computed glyphs')
***REMOVED*** Glyphs.search(this.query)
      // return this.glyphIndex.search(this.query)
      // return this.glyphIndex
      //   ? this.glyphIndex.search(this.query)
      //   : []
  ***REMOVED***,

    isSearch() {
***REMOVED*** this.query ? !!this.query.length : false
  ***REMOVED***,

    isEmpty() {
***REMOVED*** this.glyphs.length === 0
  ***REMOVED***,

    formattedGlyphs() {
***REMOVED*** this.glyphs.map(glyph => ({
        ...glyph,
        id: glyph.symbol,
  ***REMOVED***)
  ***REMOVED***,

    frequentlyUsedGlyphs() {
      if (this.isSearch) {
  ***REMOVED*** []
    ***REMOVED***

***REMOVED*** collect(this.usage)
        .sortByDesc('count')
        .map(item => this.formattedGlyphs.find(glyph => glyph.symbol === item.symbol))
        .map(glyph => ({
          ...glyph,
          id: `frequently_used_${glyph.symbol}`,
    ***REMOVED***)
        .take(10)
        .toArray()
  ***REMOVED***,

    hasFrequentlyUsedGlyphs() {
***REMOVED*** this.frequentlyUsedGlyphs.length
  ***REMOVED***,

    glyphRows() {
***REMOVED*** this.chunkGlyphs(this.formattedGlyphs)
        .map((row, index, array) => {
          if (index === 0 && !this.isSearch && this.hasFrequentlyUsedGlyphs) {
      ***REMOVED*** {
              ...row,
              title: 'Glyphs',
              height: this.glyphRowWithTitleHeight,
          ***REMOVED***
        ***REMOVED***

          if (index === array.length - 1) {
      ***REMOVED*** {
              height: this.glyphRowHeight + this.expandedHeight + 20,
              ...row,
          ***REMOVED***
        ***REMOVED***

    ***REMOVED*** {
            height: this.glyphRowHeight,
            ...row,
        ***REMOVED***
    ***REMOVED***
  ***REMOVED***,

    frequentlyUsedGlyphRows() {
***REMOVED*** this.chunkGlyphs(this.frequentlyUsedGlyphs)
        .map((row, index) => {
          if (index === 0) {
      ***REMOVED*** {
              ...row,
              title: 'Frequently used',
              height: this.glyphRowWithTitleHeight,
          ***REMOVED***
        ***REMOVED***

    ***REMOVED*** {
            height: this.glyphRowHeight,
            ...row,
        ***REMOVED***
    ***REMOVED***
  ***REMOVED***,

    rows() {
***REMOVED*** [
        ...this.frequentlyUsedGlyphRows,
        ...this.glyphRows,
      ]
  ***REMOVED***,

    offsets() {
      const offsets = []
      let offset = 0

      this.rows.forEach((row, index) => {
        const size = row.height

        offsets.push({
          index,
          size,
          offset,
    ***REMOVED***

        offset += size
  ***REMOVED***

***REMOVED*** offsets
  ***REMOVED***,

    selectedGlyph() {
      if (this.isEmpty) {
  ***REMOVED*** null
    ***REMOVED***

      const { x, y } = this.selection
      const row = this.rows[y]
      const glyph = row.glyphs[x]

***REMOVED*** glyph
  ***REMOVED***,
***REMOVED***,

  watch: {
    // query: {
    //   immediate: true,
    //   handler() {
    //     this.updateGlyphs()
    // ***REMOVED***,
    // },

    glyphs: {
      immediate: true,
      handler() {
        this.selection = {
          x: 0,
          y: 0,
      ***REMOVED***

        this.updateVisibleRows()
        this.maybeUpdateScrollPosition()
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  methods: {
    // updateGlyphs() {
    //   if (!this.glyphIndex) {
    //     this.glyphs = []
    //     return
    // ***REMOVED***

    //   this.glyphs = this.glyphIndex.search(this.query)
    // },

    setQuery(query) {
      this.query = query
  ***REMOVED***,

    setElement(element) {
      this.element = element
  ***REMOVED***,

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
      const containerHeight = 506 // TODO
      const visibleScrollHeight = containerHeight - (this.isExpanded ? this.expandedHeight : 54)
      const firstFullyVisibleRow = collect(this.offsets)
        .filter(item => item.offset >= this.scrollPosition.offset)
        .first()

      if (firstFullyVisibleRow) {
        this.firstFullyVisibleRowIndex = firstFullyVisibleRow.index
    ***REMOVED***

      const lastFullyVisibleRow = collect(this.offsets)
        .filter(item => item.offset <= (this.scrollPosition.offset + visibleScrollHeight))
        .last()

      if (lastFullyVisibleRow) {
        this.lastFullyVisibleRowIndex = lastFullyVisibleRow.index - 1
    ***REMOVED***
  ***REMOVED***,

    maybeUpdateScrollPosition() {
      const { y } = this.selection

      if (!this.offsets[y]) {
  ***REMOVED***
    ***REMOVED***

      if (y < this.firstFullyVisibleRowIndex || y > this.lastFullyVisibleRowIndex) {
        this.element.scrollTop = this.offsets[y].offset
    ***REMOVED***
  ***REMOVED***,

    setSelection(x, y) {
      this.selection = {
        x,
        y,
    ***REMOVED***
  ***REMOVED***,

    handleKeyDown(event) {
      const { key } = event

      if (key.startsWith('Arrow')) {
        event.preventDefault()
    ***REMOVED***

      if (key === 'ArrowDown') {
        this.moveSelection('down')
    ***REMOVED*** else if (key === 'ArrowUp') {
        this.moveSelection('up')
    ***REMOVED*** else if (key === 'ArrowRight') {
        this.moveSelection('right')
    ***REMOVED*** else if (key === 'ArrowLeft') {
        this.moveSelection('left')
    ***REMOVED***
  ***REMOVED***,

    moveSelection(direction) {
      const { x, y } = this.selection
      const row = this.rows[y]

      if (!row) {
  ***REMOVED***
    ***REMOVED***

      if (direction === 'right') {
        if (row.glyphs[x + 1]) {
          this.selection = {
            x: x + 1,
            y,
        ***REMOVED***
      ***REMOVED*** else if (this.rows[y + 1]) {
          this.selection = {
            x: 0,
            y: y + 1,
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (direction === 'left') {
        if (row.glyphs[x - 1]) {
          this.selection = {
            x: x - 1,
            y,
        ***REMOVED***
      ***REMOVED*** else if (this.rows[y - 1]) {
          this.selection = {
            x: this.rows[y - 1].glyphs.length - 1,
            y: y - 1,
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (direction === 'down') {
        const newRow = this.rows[y + 1]
        if (newRow && newRow.glyphs[x]) {
          this.selection = {
            x,
            y: y + 1,
        ***REMOVED***
      ***REMOVED*** else if (newRow) {
          this.selection = {
            x: newRow.glyphs.length - 1,
            y: y + 1,
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (direction === 'up') {
        const newRow = this.rows[y - 1]
        if (newRow && newRow.glyphs[x]) {
          this.selection = {
            x,
            y: y - 1,
        ***REMOVED***
      ***REMOVED*** else if (newRow) {
          this.selection = {
            x: newRow.glyphs.length - 1,
            y: y - 1,
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

      this.maybeUpdateScrollPosition()
  ***REMOVED***,
***REMOVED***,

  // created() {
  //   // const { glyphs, searchIndex } = GlyphIndex.getDB()

  //   // const glyphIndex = new Glyphs(glyphs)
  //   // glyphIndex.importIndex(searchIndex)

  //   // this.glyphIndex = glyphIndex
  //   // this.glyphIndex.createIndex()

  //   // this.updateGlyphs()
  // },

  mounted() {
    this.updateVisibleRows()
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  provide() {
    const navigatable = {
      setQuery: this.setQuery,
      setElement: this.setElement,
      setSelection: this.setSelection,
      handleScroll: this.handleScroll,
      toggleExpand: this.toggleExpand,
  ***REMOVED***

    Object.defineProperties(navigatable, {
      rows: {
        enumerable: true,
        get: () => this.rows,
    ***REMOVED***,
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
      glyphRowWithTitleHeight: {
        enumerable: true,
        get: () => this.glyphRowWithTitleHeight,
    ***REMOVED***,
      isExpanded: {
        enumerable: true,
        get: () => this.isExpanded,
    ***REMOVED***,
***REMOVED***

    return { navigatable }
***REMOVED***,

  render() {
    return this.$scopedSlots.default()
***REMOVED***,
}
</script>
