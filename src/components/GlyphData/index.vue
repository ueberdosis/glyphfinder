<template>
  <div class="glyph-data" @click="navigatable.toggleExpand">
    <transition name="clipboard">
      <clipboard-badge class="glyph-data__clipboard" v-if="copied" />
    </transition>

    <div class="glyph-data__card">
      <div class="glyph-data__header">
        <div class="glyph-data__name" :title="glyph.name">
          {{ glyph.name }}
        </div>
        <icon
          class="glyph-data__icon"
          :class="{ 'is-active': navigatable.isExpanded }"
          name="arrow-down"
        />
      </div>

      <slide-up-down :active="navigatable.isExpanded">
        <div class="glyph-data__content">
          <div class="glyph-data__item">
            <div class="glyph-data__label">
              Shortcut
            </div>
            <key-list :keys="shortcut" v-if="showShortcut" />
            <div class="glyph-data__empty" v-else>
              –
            </div>
          </div>

          <div class="glyph-data__item">
            <div class="glyph-data__label">
              Entities
            </div>
            <entity-list :entities="entities" v-if="entities.length" />
            <div class="glyph-data__empty" v-else>
              –
            </div>
          </div>

          <div class="glyph-data__item">
            <div class="glyph-data__label">
              {{ codePointsLabel }}
            </div>
            <code-points-list :code-points="codePoints" />
          </div>
        </div>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import Event from '@/services/Event'
import Icon from '@/components/Icon'
import SlideUpDown from '@/components/SlideUpDown'
import EntityList from '@/components/EntityList'
import CodePointsList from '@/components/CodePointsList'
import KeyList from '@/components/KeyList'
import Shortcut from '@/services/Shortcut'
import ClipboardBadge from '@/components/ClipboardBadge'

export default {
  inject: ['navigatable'],

  components: {
    Icon,
    SlideUpDown,
    EntityList,
    CodePointsList,
    KeyList,
    ClipboardBadge,
  },

  props: {
    glyph: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      copied: false,
      copiedTimeout: null,
    }
  },

  computed: {
    shortcut() {
      return Shortcut.get(this.glyph.symbol)
    },

    showShortcut() {
      return this.shortcut && this.shortcut.length > 1
    },

    entities() {
      return this.glyph.entities.match(/\S+/g) || []
    },

    codePoints() {
      return this.glyph.hex
    },

    codePointsLabel() {
      if (this.codePoints.split(' ').length > 1) {
        return 'Code Points'
      }

      return 'Code Point'
    },
  },

  methods: {
    handleCopied() {
      this.copied = true
      clearTimeout(this.copiedTimeout)

      this.copiedTimeout = setTimeout(() => {
        this.copied = false
      }, 1500)
    },
  },

  mounted() {
    Event.on('copied', this.handleCopied)
  },

  beforeDestroy() {
    Event.off('copied', this.handleCopied)
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
