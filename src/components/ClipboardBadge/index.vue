<template>
  <div class="clipboard-badge">
    <div class="clipboard-badge__inner">
      <icon class="clipboard-badge__icon" name="check" />
      Copied to Clipboard
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: {
    Icon,
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
