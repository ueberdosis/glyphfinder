<template>
  <div class="glyph-data">
    <div class="glyph-data__header">
      <div class="glyph-data__name" :title="glyph.name">
        {{ glyph.name }}
      </div>
      <button
        class="glyph-data__toggle"
        type="button"
        @click="navigatable.toggleExpand"
      >
        <icon
          class="glyph-data__icon"
          :class="{ 'is-active': navigatable.isExpanded }"
          name="arrow-down"
        />
      </button>
    </div>

    <slide-up-down :active="navigatable.isExpanded">
      <div class="glyph-data__content">
        <div class="glyph-data__item">
          <div class="glyph-data__label">
            Shortcut
          </div>
          <key-list :keys="shortcut" v-if="showShortcut" />
          <template v-else>
            –
          </template>
        </div>

        <div class="glyph-data__item">
          <div class="glyph-data__label">
            Entities
          </div>
          <entity-list :entities="entities" v-if="entities.length" />
          <template v-else>
            –
          </template>
        </div>
      </div>
    </slide-up-down>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import SlideUpDown from '@/components/SlideUpDown'
import EntityList from '@/components/EntityList'
import KeyList from '@/components/KeyList'
import Shortcut from '@/services/Shortcut'

export default {
  inject: ['navigatable'],

  components: {
    Icon,
    SlideUpDown,
    EntityList,
    KeyList,
***REMOVED***,

  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  computed: {
    shortcut() {
***REMOVED*** Shortcut.get(this.glyph.symbol)
  ***REMOVED***,

    showShortcut() {
***REMOVED*** this.shortcut && this.shortcut.length > 1
  ***REMOVED***,

    entities() {
***REMOVED*** this.glyph.entities.match(/\S+/g) || []
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
