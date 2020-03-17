<template>
  <div class="preferences-overlay">
    <div class="preferences-overlay__header">
      <h2>
        Preferences
      </h2>
      <btn icon="close" @click.native="close" />
    </div>

    <div class="preferences-overlay__content">
      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Support
        </div>
        <div>
          <a href="mailto:support@glyphfinder.com">
            support@glyphfinder.com
          </a>
        </div>
      </div>

      <div class="preferences-overlay__section" v-if="user.email">
        <div class="preferences-overlay__label">
          License
        </div>
        <div>
          Licensed to {{ user.email }}
        </div>
      </div>

      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Show in menu bar
        </div>
        <div class="preferences-overlay__row">
          <label class="switch">
            <input type="checkbox" v-model="showMenubar">
            <span class="switch__slider" />
          </label>
          <btn @click.native="restart" is-red-text v-if="showMenubarRestartButton">
            Restart App
          </btn>
        </div>
      </div>

      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Autostart app
        </div>
        <div class="preferences-overlay__row">
          <label class="switch">
            <input type="checkbox" v-model="autoStart">
            <span class="switch__slider" />
          </label>
        </div>
      </div>

      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Danger Zone
        </div>
        <div>
          <btn @click.native="clearGlyphs" is-red>
            Clear Glyphs
          </btn>
          <btn @click.native="clearIndex" is-red>
            Clear Index
          </btn>
          <btn @click.native="resetAll" is-red v-if="isDevelopment">
            Reset All
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import DB from '@/services/DB'
import User from '@/services/User'
import Event from '@/services/Event'
import Store from '@/services/Store'
import Btn from '@/components/Btn'

export default {
  components: {
    Btn,
***REMOVED***,

  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      user: User,
      showMenubar: Store.get('showMenubar', true),
      autoStart: Store.get('autoStart', true),
      showMenubarRestartButton: false,
  ***REMOVED***
***REMOVED***,

  watch: {
    showMenubar() {
      Store.set('showMenubar', this.showMenubar)
      this.showMenubarRestartButton = true
  ***REMOVED***,

    autoStart() {
      Store.set('autoStart', this.autoStart)
  ***REMOVED***,
***REMOVED***,

  methods: {
    close() {
      Event.emit('hidePreferences')
  ***REMOVED***,

    clearGlyphs() {
      // eslint-disable-next-line
      if (confirm('Do you really want to clear the glyphs cache?')) {
        DB.removeGlyphs()
        window.location.reload()
    ***REMOVED***
  ***REMOVED***,

    clearIndex() {
      // eslint-disable-next-line
      if (confirm('Do you really want to clear the search index cache?')) {
        DB.removeSearchIndex()
        window.location.reload()
    ***REMOVED***
  ***REMOVED***,

    resetAll() {
      // eslint-disable-next-line
      if (confirm('Do you really want to reset all?')) {
        Store.clear()
        DB.removeAll()
        window.location.reload()
    ***REMOVED***
  ***REMOVED***,

    restart() {
      remote.app.relaunch()
      remote.app.exit(0)
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
