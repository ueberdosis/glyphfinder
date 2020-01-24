<template>
  <div class="keys">
    <div class="keys__item" v-for="(key, index) in keys" :key="index">
      {{ key }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keys: {
      required: true,
      type: Array,
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
