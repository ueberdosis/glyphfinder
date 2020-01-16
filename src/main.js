import Vue from 'vue'
import Wrapper from '@/components/Wrapper'

Vue.config.productionTip = false

new Vue({
  render: h => h(Wrapper),
}).$mount('#app')
