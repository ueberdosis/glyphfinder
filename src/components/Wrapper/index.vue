<template>
  <navigatable :glyphs="glyphs" v-slot="{ selectedGlyph }">
    <div class="wrapper">
      <div class="wrapper__header">
        <input
          class="wrapper__search"
          type="text"
          autofocus
          v-model="query"
        >
      </div>
      <div class="wrapper__content">
        <glyph-list :glyphs="glyphs" />
      </div>
      <glyph-data :glyph="selectedGlyph" />
    </div>
  </navigatable>
</template>

<script>
import GlyphList from '@/components/GlyphList'
import GlyphData from '@/components/GlyphData'
import Navigatable from '@/components/Navigatable'
import Glyphs from '@/services/Glyphs'

export default {
  components: {
    GlyphList,
    GlyphData,
    Navigatable,
***REMOVED***,

  data() {
    return {
      query: null,
  ***REMOVED***
***REMOVED***,

  computed: {
    glyphs() {
***REMOVED*** Glyphs.search(this.query)
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
