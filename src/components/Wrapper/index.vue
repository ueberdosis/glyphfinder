<template>
  <navigatable v-slot="{ rows, selectedGlyph }">
    <div class="wrapper">
      <div class="wrapper__content">
        <glyph-wrapper
          :rows="rows"
          :selected-glyph="selectedGlyph"
        />
      </div>
    </div>
  </navigatable>
</template>

<script>
import { ipcRenderer } from 'electron'
import GlyphWrapper from '@/components/GlyphWrapper'
import Navigatable from '@/components/Navigatable'

export default {
  components: {
    GlyphWrapper,
    Navigatable,
***REMOVED***,

  methods: {
    showPreferences() {
      console.log('showPreferences')
  ***REMOVED***,
***REMOVED***,

  mounted() {
    ipcRenderer.on('showPreferences', this.showPreferences)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('showPreferences', this.showPreferences)
***REMOVED***,
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
