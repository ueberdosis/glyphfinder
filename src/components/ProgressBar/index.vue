<template>
  <div class="progress-bar">
    <div class="progress-bar__bar" :style="`width: ${percentage}%`" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number,
  ***REMOVED***,

    max: {
      default: 100,
      type: Number,
  ***REMOVED***,
***REMOVED***,

  computed: {
    percentage() {
      if (this.value === 0 && this.max === 0) {
  ***REMOVED*** 0
    ***REMOVED***

***REMOVED*** (100 / this.max) * this.value
  ***REMOVED***,

    markerPercentage() {
      if (!this.marker) {
  ***REMOVED*** 0
    ***REMOVED***

***REMOVED*** this.between(this.marker, 0, 100)
  ***REMOVED***,
***REMOVED***,

  methods: {
    between(value, min, max) {
***REMOVED*** (Math.min(max, Math.max(min, value)))
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
