<template>
  <div class="glyph-data">
    <div class="glyph-data__header">
      <div class="glyph-data__name">
        {{ glyph.name }}
      </div>
      <button
        class="glyph-data__toggle"
        type="button"
        @click="isActive = !isActive"
      >
        <icon
          class="glyph-data__icon"
          :class="{ 'is-active': isActive }"
          name="arrow-down"
        />
      </button>
    </div>

    <slide-up-down :active="isActive">
      <div class="glyph-data__content">
        <div class="glyph-data__item">
          <div class="glyph-data__label">
            Shortcut
          </div>
          <template v-if="showShortcut">
            {{ shortcut }}
          </template>
          <template v-else>
            –
          </template>
        </div>

        <div class="glyph-data__item">
          <div class="glyph-data__label">
            Entities
          </div>
          <template v-if="entities.length">
            {{ entities }}
          </template>
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
import Shortcut from '@/services/Shortcut'

export default {
  components: {
    Icon,
    SlideUpDown,
***REMOVED***,

  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      isActive: false,
  ***REMOVED***
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
