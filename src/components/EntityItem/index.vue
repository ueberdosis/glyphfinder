<template>
  <button class="entity" @click="copyToClipboard">
    {{ entity }}
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'
import Event from '@/services/Event'

export default {
  props: {
    entity: {
      required: true,
      type: String,
  ***REMOVED***,
***REMOVED***,

  computed: {
    fullName() {
***REMOVED*** `&${this.entity};`
  ***REMOVED***,
***REMOVED***,

  methods: {
    copyToClipboard() {
      const copied = copy(this.fullName)

      if (copied) {
        Event.emit('copied')
        console.log('copied', this.fullName)
    ***REMOVED*** else {
        console.log('copy failed')
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
