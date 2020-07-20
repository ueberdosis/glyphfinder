<template>
  <div class="glyph-row" :style="`height:${height}px`">
    <div class="glyph-row__title" :style="`height:${titleHeight}px`" v-if="title">
      {{ title }}
    </div>
    <glyph-item
      v-for="(glyph, index) in glyphs"
      :key="glyph.symbol"
      :glyph="glyph"
      :y="y"
      :x="index"
    />
  </div>
</template>

<script>
import GlyphItem from '@/components/GlyphItem'

export default {
  inject: ['navigatable'],

  components: {
    GlyphItem,
  },

  props: {
    glyphs: {
      type: Array,
      default: () => ([]),
    },

    height: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      default: null,
    },

    y: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    titleHeight() {
      return this.navigatable.glyphRowWithTitleHeight - this.navigatable.glyphRowHeight
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
