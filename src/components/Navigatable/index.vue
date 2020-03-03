<script>
import collect from 'collect.js'
import Store from '@/services/Store'

export default {
  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,

    showFrequentlyUsedGlyphs: {
      type: Boolean,
      default: true,
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      selection: {
        x: 0,
        y: 0,
    ***REMOVED***,
      element: null,
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
      if (!this.showFrequentlyUsedGlyphs) {
  ***REMOVED*** []
    ***REMOVED***

***REMOVED*** collect(this.usage)
        .sortByDesc('count')
        .map(item => this.formattedGlyphs.find(glyph => glyph.symbol === item.symbol))
        .filter()
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
      const defaultSetName = 'Other Glyphs'
      const sortOrder = [
        'Dashes',
        'Fractions',
        'Quotes',
        'Currencies',
        'Spaces',
        'Arrows',
        'Emojis',
        defaultSetName,
      ]

      if (!this.showFrequentlyUsedGlyphs) {
  ***REMOVED*** this.chunkGlyphs(this.formattedGlyphs).map((row, index, array) => {
          if (index === array.length - 1) {
      ***REMOVED*** {
              ...row,
              height: this.glyphRowHeight + this.expandedHeight + 20,
          ***REMOVED***
        ***REMOVED***

    ***REMOVED*** {
            ...row,
            height: this.glyphRowHeight,
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***

***REMOVED*** collect(this.formattedGlyphs)
        .mapToGroups(item => [item.set, item])
        .map((glyphs, set) => ([{
          glyphs,
          set: set || defaultSetName,
      ***REMOVED***]))
        .flatten(1)
        .sort((a, b) => {
          const indexA = sortOrder.indexOf(a.set)
          const indexB = sortOrder.indexOf(b.set)
          const hugeNumber = 1000 // TODO: ugly

    ***REMOVED*** (indexA >= 0 ? indexA : hugeNumber)
              - (indexB >= 0 ? indexB : hugeNumber)
    ***REMOVED***
        .map(group => this.chunkGlyphs(group.glyphs).map((row, index) => {
          if (index === 0) {
      ***REMOVED*** {
              ...row,
              title: group.set,
              height: this.glyphRowWithTitleHeight,
          ***REMOVED***
        ***REMOVED***

    ***REMOVED*** {
            ...row,
            height: this.glyphRowHeight,
        ***REMOVED***
    ***REMOVED***)
        .flatten(1)
        .map((row, index, array) => {
          if (index === array.length - 1) {
      ***REMOVED*** {
              ...row,
              height: this.glyphRowHeight + this.expandedHeight + 20,
          ***REMOVED***
        ***REMOVED***

    ***REMOVED*** row
    ***REMOVED***
        .toArray()
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
      const containerHeight = this.isMac ? 496 : 486 // TODO
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

  mounted() {
    this.updateVisibleRows()
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  provide() {
    const navigatable = {
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
    return this.$scopedSlots.default({
      rows: this.rows,
      selectedGlyph: this.selectedGlyph,
***REMOVED***
***REMOVED***,
}
</script>
