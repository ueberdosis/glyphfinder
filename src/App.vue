<template>
  <div id="app">
    <input
      type="text"
      autofocus
      v-model.lazy="query"
      v-debounce="250"
    >

    <div v-for="result in results" :key="result.symbol">
      {{ result.symbol }}
    </div>
  </div>
</template>

<script>
import lunr from 'lunr'
import debounce from 'v-debounce'
import data from './data.yaml'

export default {
  directives: { debounce },

  data() {
    return {
      query: null,
  ***REMOVED***
***REMOVED***,

  computed: {
    results() {
      if (!this.query) {
  ***REMOVED*** []
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
      // this.pipeline.remove(lunr.stemmer)
      // this.pipeline.remove(lunr.stopWordFilter)

      this.ref('symbol')
      this.field('symbol')
      this.field('entities')
      this.field('tags')

      data.forEach(function (glyph) {
        this.add(glyph)
    ***REMOVED***, this)
***REMOVED***
***REMOVED***,
}
</script>

<style lang="scss">
#app {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
