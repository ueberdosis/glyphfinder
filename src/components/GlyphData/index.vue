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
  </div>
</template>

<script>
import Event from '@/services/Event'
import Icon from '@/components/Icon'
import SlideUpDown from '@/components/SlideUpDown'
import EntityList from '@/components/EntityList'
import KeyList from '@/components/KeyList'
import Shortcut from '@/services/Shortcut'
import ClipboardBadge from '@/components/ClipboardBadge'

export default {
  inject: ['navigatable'],

  components: {
    Icon,
    SlideUpDown,
    EntityList,
    KeyList,
    ClipboardBadge,
***REMOVED***,

  props: {
    glyph: {
      required: true,
      type: Object,
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      copied: false,
      copiedTimeout: null,
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

  methods: {
    handleCopied() {
      this.copied = true
      clearTimeout(this.copiedTimeout)

      this.copiedTimeout = setTimeout(() => {
        this.copied = false
    ***REMOVED***, 1500)
  ***REMOVED***,
***REMOVED***,

  mounted() {
    Event.on('copied', this.handleCopied)
***REMOVED***,

  beforeDestroy() {
    Event.off('copied', this.handleCopied)
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
