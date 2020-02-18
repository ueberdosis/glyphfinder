
import collect from 'collect.js'
import GlyphSupport from './GlyphSupport'
import data from '../data/data.json'

***REMOVED***
***REMOVED***
    this.progress = 0
***REMOVED***

  onProgress(callback) {
    this.progressCallback = callback

    return this
***REMOVED***

  onFinish(callback) {
    this.finishCallback = callback

    return this
***REMOVED***

  create() {
    const glyphs = collect(data).take(100).toArray()
    // const glyphs = data
    const glyphsCount = glyphs.length
    const supportedGlyphs = []

    for (let index = 0, p = Promise.resolve(); index < glyphsCount; index += 1) {
      p = p
        .then(() => new Promise(resolve => {
          const progress = Math.floor((100 / glyphsCount) * (index + 1))

          const callback = () => {
            this.progress = progress
            this.progressCallback(this.progress)

            const glyph = glyphs[index]
            const supported = GlyphSupport.characterInFont(glyph.symbol)

            if (supported) {
              supportedGlyphs.push(glyph)
          ***REMOVED***

            resolve()
        ***REMOVED***

          if (progress > this.progress) {
      ***REMOVED*** setTimeout(callback, 0)
        ***REMOVED***

    ***REMOVED*** callback()
    ***REMOVED***)
        .then(() => {
          const isLastGlyph = index === glyphsCount - 1

          if (isLastGlyph) {
            // Event.emit('supportedGlyphs', supportedGlyphs)
            // Store.set('supportedGlyphs', supportedGlyphs)
            setTimeout(this.finishCallback, 0)
        ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
