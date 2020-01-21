<script>
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
  ***REMOVED***
***REMOVED***,

  computed: {
    selectedGlyph() {
      if ((this.glyphs.length - 1) < this.selectedIndex) {
  ***REMOVED*** null
    ***REMOVED***

***REMOVED*** this.glyphs[this.selectedIndex]
  ***REMOVED***,
***REMOVED***,

  provide() {
    const navigatable = {}

    Object.defineProperty(navigatable, 'selectedGlyph', {
      enumerable: true,
      get: () => this.selectedGlyph,
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
