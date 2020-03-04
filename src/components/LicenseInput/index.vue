<template>
  <div class="license-input">
    <the-mask
      class="license-input__input"
      :class="{
        'is-success': isSuccess,
        'is-error': isError,
    ***REMOVED***"
      v-model="licenseKey"
      :mask="licenseMask"
      :tokens="tokens"
      :masked="true"
      :placeholder="licensePlaceholder"
      :disabled="isLoading"
      @input="onChange"
      @keyup.enter.native="onChange"
      ref="input"
    />
    <div class="license-input__error-wrapper">
      <transition name="bottom-to-top">
        <div class="license-input__error" v-if="isError">
          {{ errorMessage }}
          <div>
            <button class="license-input__retry" @click="retry">
              Retry
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'
import { ipcRenderer } from 'electron'
import User from '@/services/User'

export default {
  name: 'LicenseInput',

  components: {
    TheMask,
***REMOVED***,

  data() {
    return {
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: null,
      licenseUsageLimit: 2,
      licenseMask: 'XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX',
      licensePlaceholder: '00000000-00000000-00000000-00000000',
      licenseKey: null,
      tokens: {
        X: {
          pattern: /[0-9a-zA-Z]/,
          transform: v => v.toLocaleUpperCase(),
      ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***
***REMOVED***,

  methods: {
    retry() {
      this.onChange()
  ***REMOVED***,

    onChange() {
      if (this.licenseKey.length === this.licenseMask.length) {
        this.verifyLicense()
    ***REMOVED***
  ***REMOVED***,

    verifyLicense() {
      if (this.isLoading) {
  ***REMOVED***
    ***REMOVED***

      this.isError = false
      this.isLoading = true
      ipcRenderer.send('verifyLicenseKey', this.licenseKey)
  ***REMOVED***,

    handleSuccess() {
      if (!User.isVerified) {
  ***REMOVED***
    ***REMOVED***

      this.isSuccess = true
      this.isLoading = false
      this.$emit('success')
  ***REMOVED***,

    handleFail(_, errorMessage) {
      this.errorMessage = errorMessage
      this.isError = true
      this.isLoading = false
      this.focusInput()
  ***REMOVED***,

    focusInput() {
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.$el.focus()
      ***REMOVED***
  ***REMOVED***
  ***REMOVED***,
***REMOVED***,

  mounted() {
    this.focusInput()
    ipcRenderer.on('verifyLicenseKey:succeeded', this.handleSuccess)
    ipcRenderer.on('verifyLicenseKey:failed', this.handleFail)
***REMOVED***,

  beforeDestroy() {
    ipcRenderer.removeListener('verifyLicenseKey:succeeded', this.handleSuccess)
    ipcRenderer.removeListener('verifyLicenseKey:failed', this.handleFail)
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
