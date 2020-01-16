<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <input
        class="wrapper__search"
        type="text"
        autofocus
        v-model.lazy="query"
        v-debounce="250"
      >
    </div>
    <div class="wrapper__content">
      <glyph-list :glyphs="results" />
    </div>
  </div>
</template>

<script>
import lunr from 'lunr'
import debounce from 'v-debounce'
import data from '@/data.yaml'
import GlyphList from '@/components/GlyphList'

export default {
  directives: { debounce },

  components: {
    GlyphList,
***REMOVED***,

  data() {
    return {
      query: null,
  ***REMOVED***
***REMOVED***,

  computed: {
    results() {
      if (!this.query) {
  ***REMOVED*** data
    ***REMOVED***

***REMOVED*** this.idx.query(query => {
        // exact match
        query.term(this.query, {
          fields: ['symbol', 'entities', 'tags'],
          boost: 3,
    ***REMOVED***

        // first chars correct
        query.term(this.query, {
          fields: ['symbol', 'entities', 'tags'],
          boost: 2,
          wildcard: lunr.Query.wildcard.TRAILING,
    ***REMOVED***

        // fuzzy
        query.term(this.query, {
          fields: ['symbol', 'entities', 'tags'],
          editDistance: 1,
          boost: 1,
    ***REMOVED***

        query.term(this.query, {
          fields: ['description'],
          wildcard: lunr.Query.wildcard.TRAILING,
    ***REMOVED***
  ***REMOVED***
        .map(item => ({
          ...data.find(glyph => glyph.symbol === item.ref),
          score: item.score,
    ***REMOVED***)
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.idx = lunr(function () {
      this.pipeline.remove(lunr.trimmer)
      this.pipeline.remove(lunr.stemmer)
      this.pipeline.remove(lunr.stopWordFilter)

      this.ref('symbol')
      this.field('symbol')
      this.field('entities')
      this.field('tags')
      this.field('description')

      data.forEach(function (glyph) {
        this.add(glyph)
    ***REMOVED***, this)
***REMOVED***
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
