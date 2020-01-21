import FlexSearch from 'flexsearch'
import data from '../data/data.json'

***REMOVED***

***REMOVED***
    this.index = new FlexSearch({
      doc: {
        id: 'symbol',
        field: [
          'symbol',
          'name',
          'tags',
        ],
    ***REMOVED***,
      tokenize(str) {
        const words = str.match(/\S+/g) || []

  ***REMOVED*** words
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
    ***REMOVED***,
***REMOVED***

    this.index.add(data)

    console.log(this.index.info())
***REMOVED***

  // getRows(glyphs = [], count) {
  //   return collect(glyphs)
  //     .chunk(count)
  //     .toArray()
  // }

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
