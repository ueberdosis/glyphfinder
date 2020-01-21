<template>
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
      <navigatable :glyphs="glyphs">
        <glyph-list :glyphs="glyphs" />
      </navigatable>
    </div>
  </div>
</template>

<script>
import GlyphList from '@/components/GlyphList'
import Navigatable from '@/components/Navigatable'
import Glyphs from '@/services/Glyphs'

export default {
  components: {
    GlyphList,
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
