<template>
  <div class="preferences-overlay">
    generating glyphs {{ progress }} %
  </div>
</template>

<script>
import Event from '@/services/Event'
import GlyphIndex from '@/services/GlyphIndex'

export default {
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
