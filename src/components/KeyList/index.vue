<template>
  <div class="key-list">
    <key-item
      class="key__item"
      v-for="(key, index) in keys"
      :item="key"
      :key="index"
    />
  </div>
</template>

<script>
import KeyItem from '@/components/KeyItem'

export default {
  components: {
    KeyItem,
***REMOVED***,

  props: {
    keys: {
      required: true,
      type: Array,
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
