<template>
  <div class="wrapper" :class="{ 'is-loaded': isLoaded }">
    <div class="wrapper__content" :class="{ 'is-hidden': showPreferences }">
      <glyph-wrapper v-if="!showGlyphCheck && !showLicenseCheck"
                     :show-preferences="showPreferences" />
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
  },

  data() {
    return {
      isLoaded: false,
      showPreferences: false,
      showGlyphCheck: false,
      showLicenseCheck: false,
    }
  },

  methods: {
    onShowPreferences() {
      if (!User.isVerified || this.showGlyphCheck || this.showLicenseCheck) {
        return
      }

      this.showPreferences = true
    },

    onHidePreferences() {
      this.showPreferences = false
    },

    onHideGlyphCheck() {
      this.showGlyphCheck = false
    },

    onHideLicenseCheck() {
      this.init()
    },

    init() {
      const dbExists = DB.glyphsExists() && DB.searchIndexExists()

      if (dbExists) {
        Glyphs
          .importGlyphs(DB.glyphs())
          .importIndex(DB.searchIndex())
      }

      this.showGlyphCheck = User.isVerified && !dbExists
      this.showLicenseCheck = !User.isVerified
    },
  },

  created() {
    this.init()
  },

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
      document.body.classList.add('is-loaded')
    }, 0)

    console.timeEnd('mount')
    ipcRenderer.on('showPreferences', this.onShowPreferences)
    Event.on('hidePreferences', this.onHidePreferences)
    Event.on('hideGlyphCheck', this.onHideGlyphCheck)
    Event.on('hideLicenseCheck', this.onHideLicenseCheck)
  },

  beforeDestroy() {
    ipcRenderer.removeListener('showPreferences', this.onShowPreferences)
    Event.off('hidePreferences', this.onHidePreferences)
    Event.off('hideGlyphCheck', this.onHideGlyphCheck)
    Event.off('hideLicenseCheck', this.onHideLicenseCheck)
  },
}
</script>

<style lang="scss" src="./fonts.scss"></style>
<style lang="scss" src="./base.scss"></style>
<style lang="scss" src="./animations.scss"></style>
<style lang="scss" src="./style.scss" scoped></style>
