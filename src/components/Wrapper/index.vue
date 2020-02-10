<template>
  <navigatable
    :glyphs="glyphs"
    :is-search="isSearch"
    v-slot="{ rows, selectedGlyph }"
  >
    <div class="wrapper">
      <div class="wrapper__header">
        <input
          class="wrapper__search"
          ref="search"
          type="text"
          placeholder="Search …"
          autofocus
          v-model="query"
          @blur="onBlurInput"
        >
      </div>
      <div class="wrapper__content">
        <glyph-list :rows="rows" />
      </div>
      <glyph-data
        class="wrapper__overlay"
        :glyph="selectedGlyph"
        v-if="selectedGlyph"
      />
    </div>
  </navigatable>
</template>

<script>
import { ipcRenderer } from 'electron'
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

    isSearch() {
***REMOVED*** this.query ? !!this.query.length : false
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

    showPreferences() {
      console.log('showPreferences')
  ***REMOVED***,
***REMOVED***,

  mounted() {
    ipcRenderer.on('showPreferences', this.showPreferences)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('showPreferences', this.showPreferences)
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
