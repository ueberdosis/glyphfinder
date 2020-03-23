<template>
  <div class="preferences-overlay">
    <div class="preferences-overlay__header">
      <h2>
        Preferences
      </h2>
      <btn icon="close" is-grey-text @click.native="close" />
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
          Hide app after copy
        </div>
        <div class="preferences-overlay__row">
          <label class="switch">
            <input type="checkbox" v-model="hideAfterCopy">
            <span class="switch__slider" />
          </label>
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
            Clear Glyphs Cache
          </btn>
          <btn @click.native="clearIndex" is-red>
            Clear Search Index
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
import collect from 'collect.js'
import { remote, ipcRenderer } from 'electron'
import AutoStart from '@/services/AutoStart'
import DB from '@/services/DB'
import User from '@/services/User'
import Event from '@/services/Event'
import Store from '@/services/Store'
import Btn from '@/components/Btn'
import SmallKey from '@/components/SmallKey'
import { uppercase, keyNameByCode } from '@/helpers'

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
      hideAfterCopy: Store.get('hideAfterCopy', false),
      showMenubarRestartButton: false,
      keyboard: null,
      isListening: false,
  ***REMOVED***
***REMOVED***,

  watch: {
    showMenubar() {
      Store.set('showMenubar', this.showMenubar)
      this.showMenubarRestartButton = true

      if (this.showMenubar) {
        this.autoStart = true
    ***REMOVED*** else {
        this.autoStart = false
    ***REMOVED***
  ***REMOVED***,

    autoStart() {
      Store.set('autoStart', this.autoStart)
      AutoStart.update()
  ***REMOVED***,

    hideAfterCopy() {
      Store.set('hideAfterCopy', this.hideAfterCopy)
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
      this.isListening = true
  ***REMOVED***,

    cancelListening() {
      this.isListening = false
  ***REMOVED***,

    handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (this.isListening) {
          this.cancelListening()
      ***REMOVED*** else {
          this.close()
      ***REMOVED***
    ***REMOVED***

      if (!this.isListening) {
  ***REMOVED***
    ***REMOVED***

      const keys = collect([keyNameByCode(event.which)])

      if (event.shiftKey) {
        keys.push('shift')
    ***REMOVED***

      if (event.ctrlKey) {
        keys.push('control')
    ***REMOVED***

      if (event.altKey) {
        keys.push('alt')
    ***REMOVED***

      if (event.metaKey) {
        keys.push('super')
    ***REMOVED***

      const sortOrder = ['control', 'alt', 'shift', 'super']
      const sortedKeys = keys
        .unique()
        .sort((a, b) => {
          const indexA = sortOrder.indexOf(a)
          const indexB = sortOrder.indexOf(b)
          const hugeNumber = 1000 // TODO: ugly

    ***REMOVED*** (indexA >= 0 ? indexA : hugeNumber)
            - (indexB >= 0 ? indexB : hugeNumber)
    ***REMOVED***
        .toArray()
      const isShortcut = !sortedKeys.every(key => sortOrder.includes(key))

      if (isShortcut) {
        Store.set('shortcut', sortedKeys)
        this.shortcut = sortedKeys
        ipcRenderer.send('shortcutChanged')
        this.cancelListening()
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
***REMOVED***,

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
