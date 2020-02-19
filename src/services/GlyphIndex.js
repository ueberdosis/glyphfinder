import fs from 'fs'
import path from 'path'
import electron from 'electron'
// eslint-disable-next-line
import Worker from 'worker-loader!./GlyphIndexWorker.js'
import Glyphs from './Glyphs'

***REMOVED***
***REMOVED***
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')

    this.worker = new Worker()
    this.dbPath = path.join(userDataPath, 'db.json')
    this.progress = 0
***REMOVED***

  async create() {
    const glyphs = await this.createSupportedGlyphs()
    const searchIndex = this.createSearchIndex(glyphs)

    fs.writeFileSync(this.dbPath, JSON.stringify({
      glyphs,
      searchIndex,
***REMOVED***)

    this.finishCallback({
      glyphs,
      searchIndex,
***REMOVED***
***REMOVED***

  onProgress(callback) {
    this.progressCallback = callback

    return this
***REMOVED***

  onFinish(callback) {
    this.finishCallback = callback

    return this
***REMOVED***

  createSearchIndex(glyphs = []) {
    return Glyphs
      .importGlyphs(glyphs)
      .createIndex()
      .exportIndex()
***REMOVED***

  getDB() {
    try {
      if (!fs.existsSync(this.dbPath)) {
  ***REMOVED*** null
    ***REMOVED***
***REMOVED*** JSON.parse(fs.readFileSync(this.dbPath, 'utf8'))
  ***REMOVED*** catch (err) {
      console.error(err)
***REMOVED*** null
  ***REMOVED***
***REMOVED***

  createSupportedGlyphs() {
    return new Promise(resolve => {
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
