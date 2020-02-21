<template>
  <div class="glyph-check-overlay">
    <floating-glyphs class="glyph-check-overlay__glyphs" :has-mouse="false" />
    <div class="glyph-check-overlay__content">
      Optimizing Glyphs
      <progress-bar :value="progress" />
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
import FloatingGlyphs from '@/components/FloatingGlyphs'
import Event from '@/services/Event'
import GlyphIndex from '@/services/GlyphIndex'

export default {
  components: {
    ProgressBar,
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
      .onFinish(() => {
        this.close()
  ***REMOVED***
      .create()
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
