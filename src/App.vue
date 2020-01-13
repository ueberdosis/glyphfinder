<template>
  <div id="app">
    <input type="text" autofocus v-model="query">

    <div v-for="result in results" :key="result.name">
      {{ result }}
    </div>
  </div>
</template>

<script>
import lunr from 'lunr'
import data from './data.yaml'

export default {
  name: 'App',

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
          fields: ['name', 'tags', 'alts'],
          boost: 3,
    ***REMOVED***

        // first chars correct
        query.term(this.query, {
          fields: ['name', 'tags'],
          boost: 2,
          wildcard: lunr.Query.wildcard.TRAILING,
    ***REMOVED***

        // fuzzy
        query.term(this.query, {
          fields: ['name', 'tags'],
          editDistance: 1,
          boost: 1,
    ***REMOVED***
  ***REMOVED***
        .map(item => ({
          ...data.find(glyph => glyph.name === item.ref),
          score: item.score,
    ***REMOVED***)
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.idx = lunr(function () {
      this.pipeline.remove(lunr.trimmer)
      // this.pipeline.remove(lunr.stemmer)
      // this.pipeline.remove(lunr.stopWordFilter)

      this.ref('name')
      this.field('name')
      this.field('tags')
      this.field('alts')

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
