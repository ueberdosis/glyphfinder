<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      default: '',
  ***REMOVED***,

    size: {
      type: String,
      default: 'normal',
  ***REMOVED***,
***REMOVED***,

  render(createElement) {
    let svgHTML = ''
    try {
      svgHTML = require(`!html-loader!@/assets/icons/${this.name}.svg`)
  ***REMOVED*** catch (e) {
      // eslint-disable-next-line
      console.warn(`Unable to load "icon-${this.name}.svg" icon. Verify it exists in the icons directory.`, e)
  ***REMOVED***
    return createElement(
      'div',
      {
        class: `icon icon--${this.size}`,
        domProps: {
          innerHTML: svgHTML,
      ***REMOVED***,
    ***REMOVED***,
    )
***REMOVED***,
}
</script>

<style lang="scss" src="./style.scss"></style>
