<template>
  <button
    class="glyph-item"
    :class="{
      'is-active': isSelected,
      'is-emoji': isEmoji,
      'is-space': isSpace,
    }"
    type="button"
    @click="handleClick"
    @dblclick="copyToClipboard"
    :title="glyph.name"
  >
    <span class="glyph-item__symbol">{{ glyph.symbol }}</span>
  </button>
</template>

<script>
import { remote } from 'electron'
import collect from 'collect.js'
import copy from 'copy-to-clipboard'
import Store from '@/services/Store'
import Event from '@/services/Event'

export default {
  inject: ['navigatable'],

  props: {
    glyph: {
      required: true,
      type: Object,
    },

    x: {
      type: Number,
      default: 0,
    },

    y: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    isSelected() {
      return this.navigatable.selectedGlyph
        ? this.navigatable.selectedGlyph.id === this.glyph.id
        : false
    },

    isEmoji() {
      return this.glyph.tags.includes('emoji')
    },

    isSpace() {
      return !/[^\s]/.test(this.glyph.symbol)
        && this.glyph.code !== 5760
        && this.glyph.code !== '5760'
    },
  },

  methods: {
    copyToClipboard() {
      const copied = copy(this.glyph.symbol, { format: 'text/plain' })
      this.increaseUsage()

      if (Store.get('hideAfterCopy')) {
        if (this.isWindows) {
          remote.getCurrentWindow().minimize()
        } else {
          remote.app.hide()
        }

        this.sendNotification()
      } else if (copied) {
        Event.emit('copied')
      }
    },

    sendNotification() {
      const notification = new Notification('Glyphfinder', {
        body: 'Copied to clipboard!',
        silent: true,
      })

      setTimeout(() => {
        notification.close()
      }, 2000)
    },

    increaseUsage() {
      const usage = Store.get('usage', [])
      const usageItem = usage.find(item => item.symbol === this.glyph.symbol) || {
        symbol: this.glyph.symbol,
        count: 0,
      }
      const newUsageItem = {
        ...usageItem,
        count: usageItem.count + 1,
      }
      const newUsage = collect(usage)
        .filter(item => item.symbol !== this.glyph.symbol)
        .push(newUsageItem)
        .toArray()

      Store.set('usage', newUsage)
    },

    handleClick() {
      this.navigatable.setSelection(this.x, this.y)
    },

    handleKeyDown(event) {
      if (!this.isSelected) {
        return
      }

      if (
        event.key === 'Enter'
        || (this.isMac && event.key === 'c' && event.metaKey)
        || (this.isWindows && event.key === 'c' && event.ctrlKey)
      ) {
        this.copyToClipboard()
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
