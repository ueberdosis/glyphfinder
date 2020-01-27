import Vue from 'vue'
import Bowser from 'bowser'
import Wrapper from '@/components/Wrapper'

Vue.config.productionTip = false

const { os } = Bowser.parse(window.navigator.userAgent)

Vue.mixin({
  data() {
    return {
      isWindows: os.name === 'Windows',
      isMac: os.name === 'macOS',
  ***REMOVED***
***REMOVED***,
})

new Vue({
  render: h => h(Wrapper),
}).$mount('#app')
