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

      <div class="preferences-overlay__section" v-if="showMenubar">
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

      <div class="preferences-overlay__section" v-if="showMenubar">
        <div class="preferences-overlay__label">
          Shortcut
        </div>
        <div>
          <template v-if="isListening">
            <span class="grey">
              Press any shortcut…
            </span>
            <btn @click.native="cancelListening">
              Cancel
            </btn>
          </template>
          <template v-else>
            <span>
              <small-key
                v-for="key in shortcut"
                :key="key"
                :name="key"
              />
            </span>
            <btn @click.native="listenToNewShortcut">
              Change
            </btn>
          </template>
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
import { remote, ipcRenderer } from 'electron'
import Keyboard from '@/services/Keyboard'
import DB from '@/services/DB'
import User from '@/services/User'
import Event from '@/services/Event'
import Store from '@/services/Store'
import Btn from '@/components/Btn'
import SmallKey from '@/components/SmallKey'

export default {
  components: {
    Btn,
    SmallKey,
***REMOVED***,

  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      user: User,
      shortcut: Store.get('shortcut'),
      showMenubar: Store.get('showMenubar', true),
      autoStart: Store.get('autoStart', true),
      showMenubarRestartButton: false,
      keyboard: null,
  ***REMOVED***
***REMOVED***,

  computed: {
    isListening() {
***REMOVED*** !!this.keyboard
  ***REMOVED***,
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

    listenToNewShortcut() {
      this.keyboard = new Keyboard()

      this.keyboard.on('shortcut', event => {
        event.preventDefault()
        Store.set('shortcut', this.keyboard.resolvedKeys)
        ipcRenderer.send('shortcutChanged')
        this.shortcut = this.keyboard.resolvedKeys
        this.cancelListening()
  ***REMOVED***
  ***REMOVED***,

    cancelListening() {
      this.keyboard.destroy()
      this.keyboard = null
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
