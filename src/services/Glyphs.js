import FlexSearch from 'flexsearch'
import data from '../data/data.json'

***REMOVED***

***REMOVED***
    this.index = new FlexSearch({
      cache: true,
      doc: {
        id: 'symbol',
        field: [
          'symbol',
          'name',
          'tags',
        ],
    ***REMOVED***,
      tokenize: this.tokenize,
***REMOVED***

    this.index.add(data)

    console.log(this.index.info())
***REMOVED***

  tokenize(value) {
    const words = value.match(/\S+/g) || []

    return words
      .map(word => {
        const isWordWithHyphens = /^((?:\w+-)+\w+)$/.test(word)

        if (isWordWithHyphens) {
    ***REMOVED*** word.split('-')
      ***REMOVED***

  ***REMOVED*** word
  ***REMOVED***
      .flat()
      .map(word => {
        const tokens = []

        for (let i = 0; i < word.length; i += 1) {
          tokens.push(word.slice(0, i + 1))
      ***REMOVED***

  ***REMOVED*** tokens
  ***REMOVED***
      .flat()
***REMOVED***

  search(query = null) {
    const filteredQuery = query ? query.toLowerCase().trim() : ''

    if (filteredQuery === '') {
***REMOVED*** data
  ***REMOVED***

    return this.index.search(filteredQuery, {
      limit: 100000,
***REMOVED***
***REMOVED***

***REMOVED***
