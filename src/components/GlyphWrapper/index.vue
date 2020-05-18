<template>
  <navigatable
    :glyphs="glyphs"
    :show-frequently-used-glyphs="showFrequentlyUsedGlyphs"
    v-slot="{ rows, selectedGlyph }"
  >
    <div class="glyph-wrapper">
      <div class="glyph-wrapper__header">
        <div class="glyph-wrapper__search-wrapper">
          <input
            class="glyph-wrapper__search"
            ref="search"
            type="text"
            placeholder="Search …"
            autofocus
            v-model="query"
            @keydown.esc="hideWindow"
            @blur="onBlurInput"
          >
          <button class="glyph-wrapper__reset" @click="reset" v-if="formattedQuery.length">
            <icon name="close" />
          </button>
        </div>
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
import { ipcRenderer, remote } from 'electron'
import Navigatable from '@/components/Navigatable'
import GlyphList from '@/components/GlyphList'
import GlyphData from '@/components/GlyphData'
import Icon from '@/components/Icon'
import Glyphs from '@/services/Glyphs'
import Store from '@/services/Store'

export default {
  components: {
    Navigatable,
    GlyphList,
    GlyphData,
    Icon,
***REMOVED***,

  data() {
    return {
      query: null,
  ***REMOVED***
***REMOVED***,

  props: {
    showPreferences: {
      default: false,
  ***REMOVED***,
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
      this.query = null
  ***REMOVED***,

    hideWindow() {
      if (this.showPreferences) {
  ***REMOVED***
    ***REMOVED***

      if (this.query) {
        this.reset()
  ***REMOVED***
    ***REMOVED***

      if (this.isWindows) {
        remote.getCurrentWindow().minimize()
    ***REMOVED*** else {
        remote.app.hide()
    ***REMOVED***
  ***REMOVED***,

    handleWindowHidden() {
      if (Store.get('clearSearchOnHide')) {
        this.reset()
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    ipcRenderer.on('windowHidden', this.handleWindowHidden)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('windowHidden', this.handleWindowHidden)
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
