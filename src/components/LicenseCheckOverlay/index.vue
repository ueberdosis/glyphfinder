<template>
  <div class="license-check-overlay">
    <div class="license-check-overlay__content">
      <h2 class="license-check-overlay__title">
        Enter your license
      </h2>
      <license-input @success="onSuccess" />
    </div>
    <div class="license-check-overlay__footer">
      <span>
        Don’t have a license yet?
      </span>
      <btn @click.native="buyLicense" is-yellow>
        Buy License
      </btn>
    </div>
  </div>
</template>

<script>
import Event from '@/services/Event'
import Btn from '@/components/Btn'
import LicenseInput from '@/components/LicenseInput'

export default {
  name: 'LicenseOverlay',

  components: {
    Btn,
    LicenseInput,
***REMOVED***,

  methods: {
    onSuccess() {
      this.close()
  ***REMOVED***,

    close() {
      Event.emit('hideLicense')
  ***REMOVED***,

    buyLicense() {
      require('electron')
        .shell
        .openExternal(`https://gumroad.com/l/${process.env.VUE_APP_GUMROAD_PRODUCT_ID}`)
  ***REMOVED***,
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
