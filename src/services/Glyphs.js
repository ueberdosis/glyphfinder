import collect from 'collect.js'
import FlexSearch from 'flexsearch'

***REMOVED***

***REMOVED***
    this.data = []
    this.index = new FlexSearch({
      cache: true,
      doc: {
        id: 'symbol',
        field: {
          signs: {
            tokenize: this.tokenize.bind(this),
        ***REMOVED***,
          words: {
            tokenize: this.tokenize.bind(this),
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
***REMOVED***
***REMOVED***

  importGlyphs(data) {
    this.data = data

    return this
***REMOVED***

  importIndex(index) {
    this.index.import(index, { serialize: false })

    return this
***REMOVED***

  exportIndex() {
    return this.index.export({ serialize: false })
***REMOVED***

  createIndex() {
    const formattedData = this.data.map(item => {
      const [words, signs] = collect(item.tags.match(/\S+/g) || [])
        .partition(str => this.isWord(str) || this.isWordWithHyphens(str))
        .toArray()

***REMOVED*** {
        ...item,
        signs: [
          item.symbol,
          ...signs,
        ].join(' '),
        words: [
          ...words,
          item.entities,
          item.category,
          item.name,
        ].join(' '),
    ***REMOVED***
***REMOVED***

    this.index.add(formattedData)

    return this
***REMOVED***

  isWord(value) {
    return /^[a-zA-Z0-9]+$/.test(value)
***REMOVED***

  isWordWithHyphens(value) {
    return /^((?:\w+-)+\w+)$/.test(value)
***REMOVED***

  tokenize(value) {
    const words = value.match(/\S+/g) || []

    return words
      .map(word => {
        if (this.isWordWithHyphens(word)) {
    ***REMOVED*** word.split('-')
      ***REMOVED***

  ***REMOVED*** word
  ***REMOVED***
      .flat()
      .map(word => {
        if (word.length === 1) {
    ***REMOVED*** [word]
      ***REMOVED***

        const tokens = []

        for (let i = 0; i < word.length; i += 1) {
          tokens.push(word.slice(0, i + 1))
      ***REMOVED***

  ***REMOVED*** collect(tokens)
          .filter(token => {
            if (this.isWord(token)) {
        ***REMOVED*** token.length > 1
          ***REMOVED***

      ***REMOVED*** true
      ***REMOVED***
          .reverse() // full words first
          .toArray()
  ***REMOVED***
      .flat()
***REMOVED***

  search(query = null) {
    const filteredQuery = query ? query.toLowerCase().trim() : ''

    if (filteredQuery === '') {
***REMOVED*** this.data
  ***REMOVED***

    return this.index.search({
      query: filteredQuery,
      limit: 100000,
***REMOVED***
***REMOVED***

***REMOVED***
