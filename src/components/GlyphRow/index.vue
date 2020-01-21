<template>
  <div class="glyph-row">
    <glyph-item
      v-for="glyph in glyphs"
      :key="glyph.symbol"
      :glyph="glyph"
    />
  </div>
</template>

<script>
import GlyphItem from '@/components/GlyphItem'

export default {
  components: {
    GlyphItem,
***REMOVED***,

  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
  ***REMOVED***,
***REMOVED***,
}
</script>
