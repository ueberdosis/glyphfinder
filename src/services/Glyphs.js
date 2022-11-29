import collect from 'collect.js'
import FlexSearch from 'flexsearch'

export default new class {
  constructor() {
    this.data = []
    this.index = new FlexSearch({
      cache: true,
      doc: {
        id: 'symbol',
        field: {
          signs: {
            tokenize: this.tokenize.bind(this),
          },
          words: {
            tokenize: this.tokenize.bind(this),
          },
        },
      },
    })
  }

  importGlyphs(data) {
    this.data = data

    return this
  }

  importIndex(index) {
    this.index.import(index, { serialize: false })

    return this
  }

  exportIndex() {
    return this.index.export({ serialize: false })
  }

  createIndex() {
    const formattedData = this.data.map(item => {
      const [words, signs] = collect(item.tags.match(/\S+/g) || [])
        .partition(str => this.isWord(str) || this.isWordWithHyphens(str))
        .toArray()

      return {
        ...item,
        signs: [
          item.symbol,
          ...signs,
        ].join(' '),
        words: [
          ...words,
          item.entities,
          item.category
            .replace(/-[0-9]/g, '')
            .replace('-A', '')
            .replace('-B', ''),
          item.name
            .replace(/-[0-9]/g, '')
            .replace(/(?<!letter) a /g, ' ')
            .replace(' an ', ' '),
        ].join(' '),
      }
    })

    this.index.add(formattedData)

    return this
  }

  isWord(value) {
    return /^[a-zA-Z0-9]+$/.test(value)
  }

  isWordWithHyphens(value) {
    return /^((?:\w+-)+\w+)$/.test(value)
  }

  tokenize(value) {
    const words = value.match(/\S+/g) || []

    return words
      .map(word => {
        if (this.isWordWithHyphens(word)) {
          return word.split('-')
        }

        return word
      })
      .flat()
      .map(word => {
        if (word.length === 1) {
          return [word]
        }

        const tokens = []

        for (let i = 0; i < word.length; i += 1) {
          tokens.push(word.slice(0, i + 1))
        }

        return collect(tokens)
          .filter(token => {
            if (this.isWord(token)) {
              return token.length > 1
            }

            return true
          })
          .reverse() // full words first
          .toArray()
      })
      .flat()
  }

  search(query = null) {
    const filteredQuery = query ? query.toLowerCase().trim() : ''

    if (filteredQuery === '') {
      return this.data
    }

    return this.index.search({
      query: filteredQuery,
      limit: 100000,
    })
  }
}()
