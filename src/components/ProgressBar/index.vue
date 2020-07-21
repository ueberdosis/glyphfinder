<template>
  <div class="progress-bar">
    <div class="progress-bar__bar" :style="`width: ${percentage}%`" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number,
    },

    max: {
      default: 100,
      type: Number,
    },
  },

  computed: {
    percentage() {
      if (this.value === 0 && this.max === 0) {
        return 0
      }

      return (100 / this.max) * this.value
    },

    markerPercentage() {
      if (!this.marker) {
        return 0
      }

      return this.between(this.marker, 0, 100)
    },
  },

  methods: {
    between(value, min, max) {
      return (Math.min(max, Math.max(min, value)))
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
