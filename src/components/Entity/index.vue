<template>
  <button class="entity" @click="copyToClipboard">
    {{ name }}
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: {
    name: {
      required: true,
      type: String,
  ***REMOVED***,
***REMOVED***,

  computed: {
    fullName() {
***REMOVED*** `&${this.name};`
  ***REMOVED***,
***REMOVED***,

  methods: {
    copyToClipboard() {
      const copied = copy(this.fullName)

      if (copied) {
        console.log('copied', this.fullName)
    ***REMOVED*** else {
        console.log('copy failed')
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
