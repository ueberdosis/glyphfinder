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
        <div class="preferences-overlay__option">
          <span>
            Dark mode
          </span>
          <select class="select" v-model="darkMode">
            <option value="true">Enable</option>
            <option value="false">Disable</option>
            <option value="system">Use system setting</option>
          </select>
        </div>

        <div class="preferences-overlay__option">
          <span>
            Hide app after copying
          </span>
          <label class="switch">
            <input type="checkbox" v-model="hideAfterCopy">
            <span class="switch__slider" />
          </label>
        </div>

        <div class="preferences-overlay__option">
          <span>
            Clear search on hide
          </span>
          <label class="switch">
            <input type="checkbox" v-model="clearSearchOnHide">
            <span class="switch__slider" />
          </label>
        </div>

        <div class="preferences-overlay__option">
          <span>
            Show in menu bar
          </span>
          <label class="switch">
            <input type="checkbox" v-model="showMenubar">
            <span class="switch__slider" />
          </label>
        </div>

        <div class="preferences-overlay__option" v-if="showMenubar">
          <span>
            Autostart app
          </span>
          <label class="switch">
            <input type="checkbox" v-model="autoStart">
            <span class="switch__slider" />
          </label>
        </div>

        <div class="preferences-overlay__option" v-if="showMenubar">
          <span>
            Shortcut
          </span>
          <div>
            <template v-if="isListening">
              <span class="preferences-overlay__grey-text">
                Press shortcut
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

        <div class="preferences-overlay__option" v-if="showMenubarRestartButton">
          <span class="preferences-overlay__grey-text">
            Restart to apply changes
          </span>
          <btn @click.native="restart" is-red>
            Restart
          </btn>
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
          Support
        </div>
        <div>
          <a href="mailto:support@glyphfinder.com">
            support@glyphfinder.com
          </a>
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
import { keyNameByCode } from '@/helpers'

export default {
  components: {
    Btn,
    SmallKey,
  },

  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      user: User,
      darkMode: Store.get('darkMode'),
      shortcut: Store.get('shortcut'),
      showMenubar: Store.get('showMenubar'),
      autoStart: Store.get('autoStart'),
      hideAfterCopy: Store.get('hideAfterCopy'),
      clearSearchOnHide: Store.get('clearSearchOnHide'),
      showMenubarRestartButton: false,
      keyboard: null,
      isListening: false,
    }
  },

  watch: {
    showMenubar() {
      Store.set('showMenubar', this.showMenubar)
      this.showMenubarRestartButton = true

      if (this.showMenubar) {
        this.autoStart = true
      } else {
        this.autoStart = false
      }
    },

    autoStart() {
      Store.set('autoStart', this.autoStart)
      AutoStart.update()
    },

    hideAfterCopy() {
      Store.set('hideAfterCopy', this.hideAfterCopy)
    },

    clearSearchOnHide() {
      Store.set('clearSearchOnHide', this.clearSearchOnHide)
    },

    darkMode() {
      Store.set('darkMode', this.darkMode)
      ipcRenderer.send('darkModePreferenceChanged')
    },
  },

  methods: {
    close() {
      Event.emit('hidePreferences')
    },

    clearGlyphs() {
      // eslint-disable-next-line
      if (confirm('Do you really want to clear the glyphs cache?')) {
        DB.removeGlyphs()
        window.location.reload()
      }
    },

    clearIndex() {
      // eslint-disable-next-line
      if (confirm('Do you really want to clear the search index cache?')) {
        DB.removeSearchIndex()
        window.location.reload()
      }
    },

    resetAll() {
      // eslint-disable-next-line
      if (confirm('Do you really want to reset all?')) {
        Store.clear()
        DB.removeAll()
        window.location.reload()
      }
    },

    restart() {
      remote.app.relaunch()
      remote.app.exit(0)
    },

    listenToNewShortcut() {
      this.isListening = true
    },

    cancelListening() {
      this.isListening = false
    },

    handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (this.isListening) {
          this.cancelListening()
        } else {
          this.close()
        }
      }

      if (!this.isListening) {
        return
      }

      const keys = collect([keyNameByCode(event.which)])

      if (event.shiftKey) {
        keys.push('shift')
      }

      if (event.ctrlKey) {
        keys.push('control')
      }

      if (event.altKey) {
        keys.push('alt')
      }

      if (event.metaKey) {
        keys.push('super')
      }

      const sortOrder = ['control', 'alt', 'shift', 'super']
      const sortedKeys = keys
        .unique()
        .sort((a, b) => {
          const indexA = sortOrder.indexOf(a)
          const indexB = sortOrder.indexOf(b)
          const hugeNumber = 1000 // TODO: ugly

          return (indexA >= 0 ? indexA : hugeNumber)
            - (indexB >= 0 ? indexB : hugeNumber)
        })
        .toArray()
      const isShortcut = !sortedKeys.every(key => sortOrder.includes(key))

      if (isShortcut) {
        Store.set('shortcut', sortedKeys)
        this.shortcut = sortedKeys
        ipcRenderer.send('shortcutChanged')
        this.cancelListening()
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
