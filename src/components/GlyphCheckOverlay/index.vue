<template>
  <div class="glyph-check-overlay">
    generating glyphs {{ progress }} %
    <floating-glyphs class="glyph-check-overlay__glyphs" />
  </div>
</template>

<script>
import FloatingGlyphs from '@/components/FloatingGlyphs'
import Event from '@/services/Event'
import GlyphIndex from '@/services/GlyphIndex'

export default {
  components: {
    FloatingGlyphs,
***REMOVED***,

  data() {
    return {
      progress: 0,
  ***REMOVED***
***REMOVED***,

  methods: {
    close() {
      Event.emit('hideGlyphCheck')
  ***REMOVED***,
***REMOVED***,

  mounted() {
    GlyphIndex
      .onProgress(progress => {
        this.progress = progress
  ***REMOVED***
      .onFinish(data => {
        Event.emit('glyphIndexCreated', data)
        this.close()
  ***REMOVED***
      .create()
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
