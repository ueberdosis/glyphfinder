<template>
  <div class="preferences-overlay">
    glyphcheck

    <btn icon="close" @click.native="close" />

    {{ progress }} %
  </div>
</template>

<script>
// import collect from 'collect.js'
import Btn from '@/components/Btn'
import Event from '@/services/Event'
import Store from '@/services/Store'
import GlyphSupport from '@/services/GlyphSupport'
import data from '../../data/data.json'

export default {
  components: {
    Btn,
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

    async filterGlyphs() {
      // const glyphs = collect(data).take(100).toArray()
      const glyphs = data
      const glyphsCount = glyphs.length
      const supportedGlyphs = []

      for (let index = 0, p = Promise.resolve(); index < glyphsCount; index += 1) {
        p = p
          .then(async () => new Promise(resolve => {
            const progress = Math.floor((100 / glyphsCount) * (index + 1))

            const callback = () => {
              this.progress = progress

              const glyph = glyphs[index]
              const supported = GlyphSupport.characterInFont(glyph.symbol)

              if (supported) {
                supportedGlyphs.push(glyph)
            ***REMOVED***

              resolve()
          ***REMOVED***

            if (progress > this.progress) {
        ***REMOVED*** setTimeout(callback, 0)
          ***REMOVED***

      ***REMOVED*** callback()
      ***REMOVED***)
          .then(() => {
            const isLastGlyph = index === glyphsCount - 1

            if (isLastGlyph) {
              Event.emit('supportedGlyphs', supportedGlyphs)
              Store.set('supportedGlyphs', supportedGlyphs)
              this.close()
          ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.filterGlyphs()
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
