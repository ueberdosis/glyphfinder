<template>
  <div class="wrapper">
    <div class="wrapper__content" :class="{ 'is-hidden': showPreferences }">
      <glyph-wrapper v-if="!showGlyphCheck && !showLicenseCheck" />
      <div class="wrapper__content-overlay" />
    </div>

    <transition name="options">
      <preferences-overlay class="wrapper__overlay" v-if="showPreferences" />
    </transition>

    <transition name="options">
      <glyph-check-overlay class="wrapper__overlay" v-if="showGlyphCheck" />
    </transition>

    <transition name="options">
      <license-check-overlay class="wrapper__overlay" v-if="showLicenseCheck" />
    </transition>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import DB from '@/services/DB'
import User from '@/services/User'
import Event from '@/services/Event'
import Glyphs from '@/services/Glyphs'
import GlyphWrapper from '@/components/GlyphWrapper'
import PreferencesOverlay from '@/components/PreferencesOverlay'
import GlyphCheckOverlay from '@/components/GlyphCheckOverlay'
import LicenseCheckOverlay from '@/components/LicenseCheckOverlay'

export default {
  components: {
    GlyphWrapper,
    PreferencesOverlay,
    GlyphCheckOverlay,
    LicenseCheckOverlay,
***REMOVED***,

  data() {
    const dbExists = DB.glyphsExists() && DB.searchIndexExists()

    if (dbExists) {
      Glyphs
        .importGlyphs(DB.glyphs())
        .importIndex(DB.searchIndex())
  ***REMOVED***

    return {
      showPreferences: false,
      showGlyphCheck: User.isVerified && !dbExists,
      showLicenseCheck: !User.isVerified,
  ***REMOVED***
***REMOVED***,

  methods: {
    onShowPreferences() {
      if (!User.isVerified) {
  ***REMOVED***
    ***REMOVED***

      this.showPreferences = true
  ***REMOVED***,

    onHidePreferences() {
      if (!User.isVerified) {
  ***REMOVED***
    ***REMOVED***

      this.showPreferences = false
  ***REMOVED***,

    onShowGlyphCheck() {
      if (!User.isVerified) {
  ***REMOVED***
    ***REMOVED***

      this.showGlyphCheck = true
  ***REMOVED***,

    onHideGlyphCheck() {
      if (!User.isVerified) {
  ***REMOVED***
    ***REMOVED***

      this.showGlyphCheck = false
  ***REMOVED***,
***REMOVED***,

  mounted() {
    console.timeEnd('mount')
    ipcRenderer.on('showPreferences', this.onShowPreferences)
    Event.on('hidePreferences', this.onHidePreferences)
    Event.on('hideGlyphCheck', this.onHideGlyphCheck)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('showPreferences', this.onShowPreferences)
    Event.off('hidePreferences', this.onHidePreferences)
    Event.off('hideGlyphCheck', this.onHideGlyphCheck)
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./animations.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
