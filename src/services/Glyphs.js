import FlexSearch from 'flexsearch'
import collect from 'collect.js'
import data from '../data/data.json'

***REMOVED***

***REMOVED***
    this.index = new FlexSearch({
      cache: true,
      doc: {
        id: 'symbol',
        field: {
          signs: {
            tokenize: str => str.split(' '),
        ***REMOVED***,
          words: {
            tokenize: 'forward',
            // tokenize: this.tokenize,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
      split: ' ',
***REMOVED***

    const formattedData = data.map(item => {
      const [words, signs] = collect(item.tags.match(/\S+/g) || [])
        .partition(str => {
          const isWord = /^[a-zA-Z]+$/.test(str)
          const isWordWithHyphens = /^((?:\w+-)+\w+)$/.test(str)
    ***REMOVED*** isWord || isWordWithHyphens
    ***REMOVED***
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
***REMOVED***

  // tokenize(value) {
  //   const words = value.match(/\S+/g) || []

  //   return words
  //     .map(word => {
  //       const isWordWithHyphens = /^((?:\w+-)+\w+)$/.test(word)

  //       if (isWordWithHyphens) {
  //   ***REMOVED*** word.split('-')
  //     ***REMOVED***

  // ***REMOVED*** word
  // ***REMOVED***
  //     .flat()
  //     .map(word => {
  //       const tokens = []

  //       for (let i = 0; i < word.length; i += 1) {
  //         tokens.push(word.slice(0, i + 1))
  //     ***REMOVED***

  // ***REMOVED*** tokens
  // ***REMOVED***
  //     .flat()
  // }

  search(query = null) {
    const filteredQuery = query ? query.toLowerCase().trim() : ''

    if (filteredQuery === '') {
***REMOVED*** data
  ***REMOVED***

    return this.index.search({
      query: filteredQuery,
      limit: 100000,
***REMOVED***
    // return this.index.search([{
    //   field: 'signs',
    //   query: filteredQuery,
    //   bool: 'and',
    // }, {
    //   field: 'words',
    //   query: filteredQuery,
    //   bool: 'or',
    // }])
***REMOVED***

***REMOVED***
