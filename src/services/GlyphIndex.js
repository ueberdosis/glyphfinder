// eslint-disable-next-line
import Worker from 'worker-loader!./GlyphIndexWorker.js'
import PromiseWorker from 'promise-worker'
import Glyphs from './Glyphs'
import DB from './DB'

***REMOVED***
***REMOVED***
    this.worker = new Worker()
    this.promiseWorker = new PromiseWorker(this.worker)
    this.progress = 0
***REMOVED***

  async create() {
    const glyphs = await this.createSupportedGlyphs()

    const { searchIndex, newGlyphs } = await this.promiseWorker.postMessage({
      type: 'createSearchIndex',
      glyphs,
***REMOVED***

    DB.saveGlyphs(newGlyphs)
    DB.saveSearchIndex(searchIndex)

    Glyphs
      .importGlyphs(newGlyphs)
      .importIndex(searchIndex)

    this.finishCallback()
***REMOVED***

  onProgress(callback) {
    this.progressCallback = callback

    return this
***REMOVED***

  onFinish(callback) {
    this.finishCallback = callback

    return this
***REMOVED***

  createSupportedGlyphs() {
    return new Promise(resolve => {
      const glyphs = DB.glyphs()

      if (glyphs) {
        this.progressCallback(100)
        resolve(glyphs)

  ***REMOVED***
    ***REMOVED***

      this.worker.postMessage('getSupportedGlyphs')

      this.worker.onmessage = event => {
        if (event.data.type === 'progress') {
          this.progressCallback(event.data.value)
      ***REMOVED***

        if (event.data.type === 'supportedGlyphs') {
          resolve(event.data.value)
      ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
