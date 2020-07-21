<template>
  <button
    class="button"
    :class="{
      'is-red': isRed,
      'is-red-text': isRedText,
      'is-grey-text': isGreyText,
  ***REMOVED***"
    type="button"
  >
    <icon class="button__icon" :name="icon" v-if="icon" />
    <span class="button__content" v-if="$scopedSlots.default">
      <slot />
    </span>
  </button>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'Btn',

  components: {
    Icon,
***REMOVED***,

  props: {
    icon: {
      default: null,
      type: String,
  ***REMOVED***,

    isRed: {
      default: false,
      type: Boolean,
  ***REMOVED***,

    isRedText: {
      default: false,
      type: Boolean,
  ***REMOVED***,

    isGreyText: {
      default: false,
      type: Boolean,
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
