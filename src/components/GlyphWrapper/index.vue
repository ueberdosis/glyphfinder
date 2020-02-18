<template>
  <navigatable
    :glyphs="glyphs"
    :show-frequently-used-glyphs="showFrequentlyUsedGlyphs"
    v-slot="{ rows, selectedGlyph }"
  >
    <div class="glyph-wrapper">
      <div class="glyph-wrapper__header">
        <input
          class="glyph-wrapper__search"
          ref="search"
          type="text"
          placeholder="Search …"
          autofocus
          v-model="query"
          @blur="onBlurInput"
        >
      </div>
      <div class="glyph-wrapper__content">
        <glyph-list :rows="rows" />
      </div>
      <glyph-data
        class="glyph-wrapper__overlay"
        :glyph="selectedGlyph"
        v-if="selectedGlyph"
      />
    </div>
  </navigatable>
</template>

<script>
import Navigatable from '@/components/Navigatable'
import GlyphList from '@/components/GlyphList'
import GlyphData from '@/components/GlyphData'
import Glyphs from '@/services/Glyphs'

export default {
  components: {
    Navigatable,
    GlyphList,
    GlyphData,
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

    showFrequentlyUsedGlyphs() {
***REMOVED*** this.query ? !this.query.length : true
  ***REMOVED***,
***REMOVED***,

  methods: {
    onBlurInput() {
      this.$nextTick(() => {
        if (this.$refs.search) {
          this.$refs.search.focus()
      ***REMOVED***
  ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
