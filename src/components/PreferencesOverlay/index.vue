<template>
  <div class="preferences-overlay">
    preferences

    <btn icon="close" @click.native="close" />
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import Event from '@/services/Event'

export default {
  components: {
    Btn,
***REMOVED***,

  methods: {
    close() {
      Event.emit('hidePreferences')
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
