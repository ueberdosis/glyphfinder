import fs from 'fs'
import path from 'path'
import { app } from '../helpers'

***REMOVED***

***REMOVED***
    this.userDataPath = app.getPath('userData')
    this.glyphsPath = path.join(this.userDataPath, 'glyphs.json')
    this.searchIndexPath = path.join(this.userDataPath, 'search-index.json')
***REMOVED***

  glyphsExists() {
    return fs.existsSync(this.glyphsPath)
***REMOVED***

  saveGlyphs(glyphs = []) {
    fs.writeFileSync(this.glyphsPath, JSON.stringify(glyphs))
***REMOVED***

  glyphs() {
    try {
      if (!this.glyphsExists()) {
  ***REMOVED*** null
    ***REMOVED***
***REMOVED*** JSON.parse(fs.readFileSync(this.glyphsPath, 'utf8'))
  ***REMOVED*** catch (err) {
      console.error(err)
***REMOVED*** null
  ***REMOVED***
***REMOVED***

  removeGlyphs() {
    if (this.glyphsExists()) {
      fs.unlinkSync(this.glyphsPath)
  ***REMOVED***
***REMOVED***

  searchIndexExists() {
    return fs.existsSync(this.searchIndexPath)
***REMOVED***

  saveSearchIndex(index = []) {
    fs.writeFileSync(this.searchIndexPath, JSON.stringify(index))
***REMOVED***

  searchIndex() {
    try {
      if (!this.searchIndexExists()) {
  ***REMOVED*** null
    ***REMOVED***
***REMOVED*** JSON.parse(fs.readFileSync(this.searchIndexPath, 'utf8'))
  ***REMOVED*** catch (err) {
      console.error(err)
***REMOVED*** null
  ***REMOVED***
***REMOVED***

  removeSearchIndex() {
    if (this.searchIndexExists()) {
      fs.unlinkSync(this.searchIndexPath)
  ***REMOVED***
***REMOVED***

  removeAll() {
    this.removeGlyphs()
    this.removeSearchIndex()
***REMOVED***

***REMOVED***
