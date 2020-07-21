<template>
  <div style="height: 0; overflow: hidden;">
    <slot />
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },

    duration: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      maxHeight: 0,
      offsetHeight: 0,
    }
  },

  watch: {
    active() {
      this.render()
    },
  },

  methods: {
    render() {
      if (this.active) {
        gsap.set(this.$el, { overflow: 'visible', opacity: 1, height: 'auto' })
        gsap.from(this.$el, this.duration / 1000, { opacity: 0, height: 0 })
      } else {
        gsap.set(this.$el, { overflow: 'hidden', opacity: 1 })
        gsap.to(this.$el, this.duration / 1000, { opacity: 0, height: 0 })
      }
    },
  },

  mounted() {
    this.render()
  },
}
</script>
