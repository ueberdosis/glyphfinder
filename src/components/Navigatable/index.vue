<script>
import { ipcRenderer } from 'electron'
import collect from 'collect.js'
import Store from '@/services/Store'

export default {
  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
    },

    showFrequentlyUsedGlyphs: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      selection: {
        x: 0,
        y: 0,
      },
      element: null,
      showRows: 8,
      itemsPerRow: 5,
      glyphRowHeight: 62,
      glyphRowWithTitleHeight: 92,
      firstFullyVisibleRowIndex: 0,
      lastFullyVisibleRowIndex: 0,
      isExpanded: Store.get('expanded'),
      expandedHeight: 101,
      usage: Store.get('usage'),
      scrollPosition: {
        offset: 0,
      },
    }
  },

  computed: {
    isEmpty() {
      return this.glyphs.length === 0
    },

    formattedGlyphs() {
      return this.glyphs.map(glyph => ({
        ...glyph,
        id: glyph.symbol,
      }))
    },

    frequentlyUsedGlyphs() {
      if (!this.showFrequentlyUsedGlyphs) {
        return []
      }

      return collect(this.usage)
        .sortByDesc('count')
        .map(item => this.formattedGlyphs.find(glyph => glyph.symbol === item.symbol))
        .filter()
        .map(glyph => ({
          ...glyph,
          id: `frequently_used_${glyph.symbol}`,
        }))
        .take(10)
        .toArray()
    },

    hasFrequentlyUsedGlyphs() {
      return this.frequentlyUsedGlyphs.length
    },

    glyphRows() {
      const defaultSetName = 'Other Glyphs'
      const sortOrder = [
        'Dashes',
        'Fractions',
        'Quotes',
        'Keys',
        'Spaces',
        'Currencies',
        'Arrows',
        'Emojis',
        defaultSetName,
      ]

      if (!this.showFrequentlyUsedGlyphs) {
        return this.chunkGlyphs(this.formattedGlyphs).map((row, index, array) => {
          if (index === array.length - 1) {
            return {
              ...row,
              height: this.glyphRowHeight + this.expandedHeight + 20,
            }
          }

          return {
            ...row,
            height: this.glyphRowHeight,
          }
        })
      }

      return collect(this.formattedGlyphs)
        .mapToGroups(item => [item.set, item])
        .map((glyphs, set) => ([{
          glyphs,
          set: set || defaultSetName,
        }]))
        .flatten(1)
        .sort((a, b) => {
          const indexA = sortOrder.indexOf(a.set)
          const indexB = sortOrder.indexOf(b.set)
          const hugeNumber = 1000 // TODO: ugly

          return (indexA >= 0 ? indexA : hugeNumber)
              - (indexB >= 0 ? indexB : hugeNumber)
        })
        .map(group => this.chunkGlyphs(group.glyphs).map((row, index) => {
          if (index === 0) {
            return {
              ...row,
              title: group.set,
              height: this.glyphRowWithTitleHeight,
            }
          }

          return {
            ...row,
            height: this.glyphRowHeight,
          }
        }))
        .flatten(1)
        .map((row, index, array) => {
          if (index === array.length - 1) {
            return {
              ...row,
              height: this.glyphRowHeight + this.expandedHeight + 20,
            }
          }

          return row
        })
        .toArray()
    },

    frequentlyUsedGlyphRows() {
      return this.chunkGlyphs(this.frequentlyUsedGlyphs)
        .map((row, index) => {
          if (index === 0) {
            return {
              ...row,
              title: 'Frequently used',
              height: this.glyphRowWithTitleHeight,
            }
          }

          return {
            height: this.glyphRowHeight,
            ...row,
          }
        })
    },

    rows() {
      return [
        ...this.frequentlyUsedGlyphRows,
        ...this.glyphRows,
      ]
    },

    offsets() {
      const offsets = []
      let offset = 0

      this.rows.forEach((row, index) => {
        const size = row.height

        offsets.push({
          index,
          size,
          offset,
        })

        offset += size
      })

      return offsets
    },

    selectedGlyph() {
      if (this.isEmpty) {
        return null
      }

      const { x, y } = this.selection
      const row = this.rows[y]
      const glyph = row.glyphs[x]

      return glyph
    },
  },

  watch: {
    glyphs: {
      immediate: true,
      handler() {
        this.resetView()
      },
    },
  },

  methods: {
    setElement(element) {
      this.element = element
    },

    chunkGlyphs(glyphs) {
      return collect(glyphs)
        .chunk(this.itemsPerRow)
        .filter(items => items.toArray().length)
        .map(items => ({
          glyphs: items.toArray(),
        }))
        .toArray()
    },

    toggleExpand() {
      this.isExpanded = !this.isExpanded
      Store.set('expanded', this.isExpanded)
      this.updateVisibleRows()
    },

    handleScroll(scrollPosition) {
      this.scrollPosition = scrollPosition
      this.updateVisibleRows()
    },

    updateVisibleRows() {
      const containerHeight = this.isMac ? 496 : 486 // TODO
      const visibleScrollHeight = containerHeight - (this.isExpanded ? this.expandedHeight : 54)
      const firstFullyVisibleRow = collect(this.offsets)
        .filter(item => item.offset >= this.scrollPosition.offset)
        .first()

      if (firstFullyVisibleRow) {
        this.firstFullyVisibleRowIndex = firstFullyVisibleRow.index
      }

      const lastFullyVisibleRow = collect(this.offsets)
        .filter(item => item.offset <= (this.scrollPosition.offset + visibleScrollHeight))
        .last()

      if (lastFullyVisibleRow) {
        this.lastFullyVisibleRowIndex = lastFullyVisibleRow.index - 1
      }
    },

    maybeUpdateScrollPosition() {
      const { y } = this.selection

      if (!this.offsets[y]) {
        return
      }

      if (y < this.firstFullyVisibleRowIndex || y > this.lastFullyVisibleRowIndex) {
        this.element.scrollTop = this.offsets[y].offset
      }
    },

    setSelection(x, y) {
      this.selection = {
        x,
        y,
      }
    },

    resetSelection() {
      this.setSelection(0, 0)
    },

    handleKeyDown(event) {
      const { key, ctrlKey } = event

      if (key.startsWith('Arrow')) {
        event.preventDefault()
      }

      if (key === 'ArrowDown' || (ctrlKey && key === 'n')) {
        this.moveSelection('down')
      } else if (key === 'ArrowUp' || (ctrlKey && key === 'p')) {
        this.moveSelection('up')
      } else if (key === 'ArrowRight' || (ctrlKey && key === 'f')) {
        this.moveSelection('right')
      } else if (key === 'ArrowLeft' || (ctrlKey && key === 'b')) {
        this.moveSelection('left')
      }
    },

    moveSelection(direction) {
      const { x, y } = this.selection
      const row = this.rows[y]

      if (!row) {
        return
      }

      if (direction === 'right') {
        if (row.glyphs[x + 1]) {
          this.selection = {
            x: x + 1,
            y,
          }
        } else if (this.rows[y + 1]) {
          this.selection = {
            x: 0,
            y: y + 1,
          }
        }
      } else if (direction === 'left') {
        if (row.glyphs[x - 1]) {
          this.selection = {
            x: x - 1,
            y,
          }
        } else if (this.rows[y - 1]) {
          this.selection = {
            x: this.rows[y - 1].glyphs.length - 1,
            y: y - 1,
          }
        }
      } else if (direction === 'down') {
        const newRow = this.rows[y + 1]
        if (newRow && newRow.glyphs[x]) {
          this.selection = {
            x,
            y: y + 1,
          }
        } else if (newRow) {
          this.selection = {
            x: newRow.glyphs.length - 1,
            y: y + 1,
          }
        }
      } else if (direction === 'up') {
        const newRow = this.rows[y - 1]
        if (newRow && newRow.glyphs[x]) {
          this.selection = {
            x,
            y: y - 1,
          }
        } else if (newRow) {
          this.selection = {
            x: newRow.glyphs.length - 1,
            y: y - 1,
          }
        }
      }

      this.maybeUpdateScrollPosition()
    },

    resetView() {
      this.resetSelection()
      this.updateVisibleRows()
      this.maybeUpdateScrollPosition()
      // console.log(this.glyphs.map(glyph => glyph.symbol).join(' '))
    },

    handleWindowHidden() {
      this.usage = Store.get('usage')

      if (Store.get('clearSearchOnHide')) {
        this.resetView()
      }
    },
  },

  mounted() {
    this.updateVisibleRows()
    document.addEventListener('keydown', this.handleKeyDown)
    ipcRenderer.on('windowHidden', this.handleWindowHidden)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
    ipcRenderer.removeListener('windowHidden', this.handleWindowHidden)
  },

  provide() {
    const navigatable = {
      setElement: this.setElement,
      setSelection: this.setSelection,
      handleScroll: this.handleScroll,
      toggleExpand: this.toggleExpand,
    }

    Object.defineProperties(navigatable, {
      rows: {
        enumerable: true,
        get: () => this.rows,
      },
      selectedGlyph: {
        enumerable: true,
        get: () => this.selectedGlyph,
      },
      showRows: {
        enumerable: true,
        get: () => this.showRows,
      },
      itemsPerRow: {
        enumerable: true,
        get: () => this.itemsPerRow,
      },
      glyphRowHeight: {
        enumerable: true,
        get: () => this.glyphRowHeight,
      },
      glyphRowWithTitleHeight: {
        enumerable: true,
        get: () => this.glyphRowWithTitleHeight,
      },
      isExpanded: {
        enumerable: true,
        get: () => this.isExpanded,
      },
    })

    return { navigatable }
  },

  render() {
    return this.$scopedSlots.default({
      rows: this.rows,
      selectedGlyph: this.selectedGlyph,
    })
  },
}
</script>
