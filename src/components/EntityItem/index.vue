<template>
  <button class="entity" @click.stop="copyToClipboard">
    {{ entity }}
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'
import Event from '@/services/Event'

export default {
  props: {
    entity: {
      required: true,
      type: String,
    },
  },

  computed: {
    fullName() {
      return `&${this.entity};`
    },
  },

  methods: {
    copyToClipboard() {
      const copied = copy(this.fullName, { format: 'text/plain' })

      if (copied) {
        Event.emit('copied')
      }
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
