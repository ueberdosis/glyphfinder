<template>
  <div style="height: 0; overflow: hidden;">
    <slot />
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
  ***REMOVED***,

    duration: {
      type: Number,
      default: 200,
  ***REMOVED***,
***REMOVED***,

  data() {
    return {
      maxHeight: 0,
      offsetHeight: 0,
  ***REMOVED***
***REMOVED***,

  watch: {
    active() {
      this.render()
  ***REMOVED***,
***REMOVED***,

  methods: {
    render() {
      if (this.active) {
        gsap.set(this.$el, { overflow: 'visible', opacity: 1, height: 'auto' })
        gsap.from(this.$el, this.duration / 1000, { opacity: 0, height: 0 })
    ***REMOVED*** else {
        gsap.set(this.$el, { overflow: 'hidden', opacity: 1 })
        gsap.to(this.$el, this.duration / 1000, { opacity: 0, height: 0 })
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.render()
***REMOVED***,
}
</script>
