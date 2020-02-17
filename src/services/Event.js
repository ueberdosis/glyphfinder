import Vue from 'vue'

***REMOVED***

***REMOVED***
    this.vue = new Vue()
***REMOVED***

  emit(event, ...data) {
    this.vue.$emit(event, ...data)
***REMOVED***

  on(event, callback) {
    this.vue.$on(event, callback)
***REMOVED***

  off(event, callback) {
    this.vue.$off(event, callback)
***REMOVED***

***REMOVED***
