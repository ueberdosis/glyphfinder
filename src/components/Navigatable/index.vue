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
      selectedGlyph: null,
  ***REMOVED***
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
        if (!this.glyphs.length) {
    ***REMOVED***
      ***REMOVED***

        const [firstGlyph] = this.glyphs

        this.selectedGlyph = firstGlyph
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,

  render() {
    return this.$scopedSlots.default()
***REMOVED***,
}
</script>
