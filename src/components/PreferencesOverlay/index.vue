<template>
  <div class="preferences-overlay">
    <div class="preferences-overlay__header">
      <h2>
        Preferences
      </h2>
      <btn icon="close" @click.native="close" />
    </div>

    <div class="preferences-overlay__content">
      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Support
        </div>
        <div>
          <a href="mailto:support@glyphfinder.com">
            support@glyphfinder.com
          </a>
        </div>
      </div>

      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          License
        </div>
        <div>
          Licenced to XXX
        </div>
      </div>

      <div class="preferences-overlay__section">
        <div class="preferences-overlay__label">
          Danger Zone
        </div>
        <div>
          <btn @click.native="clearCache" is-red>
            Clear Cache
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DB from '@/services/DB'
import Event from '@/services/Event'
import Store from '@/services/Store'
import Btn from '@/components/Btn'

export default {
  components: {
    Btn,
***REMOVED***,

  methods: {
    close() {
      Event.emit('hidePreferences')
  ***REMOVED***,

    clearCache() {
      // eslint-disable-next-line
      if (confirm('Do you really want to clear the cache?')) {
        Store.clear()
        DB.removeAll()
        window.location.reload()
    ***REMOVED***
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
