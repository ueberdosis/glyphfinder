<template>
  <navigatable v-slot="{ rows, selectedGlyph }">
    <div class="wrapper">
      <div class="wrapper__content" :class="{ 'is-hidden': showPreferences }">
        <glyph-wrapper
          :rows="rows"
          :selected-glyph="selectedGlyph"
        />
        <div class="wrapper__content-overlay" />
      </div>

      <transition name="options">
        <preferences-overlay class="wrapper__overlay" v-if="showPreferences" />
      </transition>
    </div>
  </navigatable>
</template>

<script>
import { ipcRenderer } from 'electron'
import Event from '@/services/Event'
import GlyphWrapper from '@/components/GlyphWrapper'
import Navigatable from '@/components/Navigatable'
import PreferencesOverlay from '@/components/PreferencesOverlay'

export default {
  components: {
    GlyphWrapper,
    Navigatable,
    PreferencesOverlay,
***REMOVED***,

  data() {
    return {
      showPreferences: false,
  ***REMOVED***
***REMOVED***,

  methods: {
    onShowPreferences() {
      console.log('showPreferences')
      this.showPreferences = true
  ***REMOVED***,

    onHidePreferences() {
      this.showPreferences = false
  ***REMOVED***,
***REMOVED***,

  mounted() {
    ipcRenderer.on('showPreferences', this.onShowPreferences)
    Event.on('hidePreferences', this.onHidePreferences)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('showPreferences', this.onShowPreferences)
    Event.off('hidePreferences', this.onHidePreferences)
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./animations.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
