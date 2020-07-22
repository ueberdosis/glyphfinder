<template>
  <button class="code-point">
    {{ codePoint }}
  </button>
</template>

<script>
export default {
  props: {
    codePoint: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
