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
  },

  data() {
    return {
      progress: 0,
    }
  },

  methods: {
    close() {
      Event.emit('hideGlyphCheck')
    },
  },

  mounted() {
    GlyphIndex
      .onProgress(progress => {
        this.progress = progress
      })
      .onFinish(() => {
        this.close()
      })
      .create()
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
