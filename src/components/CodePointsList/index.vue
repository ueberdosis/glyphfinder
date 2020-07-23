<template>
  <div class="code-points-list">
    <button
      @click.stop="copyToClipboard"
      class="code-points-list__item"
    >
      {{ codePoints }}
    </button>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import Event from '@/services/Event'

export default {
  methods: {
    copyToClipboard() {
      const copied = copy(this.codePoints, { format: 'text/plain' })

      if (copied) {
        Event.emit('copied')
      }
    },
  },

  props: {
    codePoints: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
