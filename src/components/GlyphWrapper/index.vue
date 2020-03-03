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
          @keydown.esc="reset"
          @blur="onBlurInput"
        >
      </div>
      <div class="glyph-wrapper__content">
        <!-- TODO: key is probably bad -->
        <glyph-list :rows="rows" :key="showFrequentlyUsedGlyphs" />
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
    formattedQuery() {
***REMOVED*** this.query ? this.query.trim() : ''
  ***REMOVED***,

    showFrequentlyUsedGlyphs() {
***REMOVED*** !this.formattedQuery.length
  ***REMOVED***,

    glyphs() {
***REMOVED*** Glyphs.search(this.formattedQuery)
  ***REMOVED***,
***REMOVED***,

  methods: {
    onBlurInput() {
      this.$nextTick(() => {
        if (this.$refs.search && this.isMac) {
          this.$refs.search.focus()
      ***REMOVED***
  ***REMOVED***
  ***REMOVED***,

    reset() {
      this.query = ''
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
