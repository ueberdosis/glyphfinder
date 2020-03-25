<template>
  <button class="entity" @click.stop="copyToClipboard">
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
      const copied = copy(this.fullName, { format: 'text/plain' })

      if (copied) {
        Event.emit('copied')
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
