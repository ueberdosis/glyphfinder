<template>
  <div class="wrapper">
    <div class="wrapper__content" :class="{ 'is-hidden': showPreferences }">
      <navigatable v-if="!showGlyphCheck">
        <glyph-wrapper />
      </navigatable>
      <div class="wrapper__content-overlay" />
    </div>

    <transition name="options">
      <preferences-overlay class="wrapper__overlay" v-if="showPreferences" />
    </transition>

    <transition name="options">
      <glyph-check-overlay class="wrapper__overlay" v-if="showGlyphCheck" />
    </transition>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Store from '@/services/Store'
import Event from '@/services/Event'
import GlyphWrapper from '@/components/GlyphWrapper'
import Navigatable from '@/components/Navigatable'
import PreferencesOverlay from '@/components/PreferencesOverlay'
import GlyphCheckOverlay from '@/components/GlyphCheckOverlay'

export default {
  components: {
    GlyphWrapper,
    Navigatable,
    PreferencesOverlay,
    GlyphCheckOverlay,
***REMOVED***,

  data() {
    return {
      showPreferences: false,
      showGlyphCheck: Store.get('supportedGlyphs', []).length === 0,
  ***REMOVED***
***REMOVED***,

  methods: {
    onShowPreferences() {
      this.showPreferences = true
  ***REMOVED***,

    onHidePreferences() {
      this.showPreferences = false
  ***REMOVED***,

    onShowGlyphCheck() {
      this.showGlyphCheck = true
  ***REMOVED***,

    onHideGlyphCheck() {
      this.showGlyphCheck = false
  ***REMOVED***,
***REMOVED***,

  mounted() {
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
