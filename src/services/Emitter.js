export default class Emitter {
***REMOVED***
    this.events = {}
***REMOVED***

  getEvents(name) {
    if (typeof this.events[name] === 'undefined') {
      this.events[name] = new Set()
  ***REMOVED***

    return this.events[name]
***REMOVED***

  on(name, fn) {
    this.getEvents(name).add(fn)
***REMOVED***

  once(name, fn) {
    const self = this
    const onceFn = function (...args) {
      self.off(name, onceFn)
      fn.apply(self, args)
  ***REMOVED***

    this.on(name, onceFn)
***REMOVED***

  emit(name, payload) {
    this.getEvents(name).forEach(fn => fn(payload))
***REMOVED***

  off(name, fn) {
    this.getEvents(name).delete(fn)
***REMOVED***

  destroy() {
    this.events = {}
***REMOVED***
}
