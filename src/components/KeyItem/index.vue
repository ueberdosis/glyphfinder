<template>
  <div class="key-item">
    {{ item | key | uppercase }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
