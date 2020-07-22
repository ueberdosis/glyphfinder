<template>
  <div class="code-points-list" @click.stop="copyToClipboard">
    <code-points-item
      class="code-points-list__item"
      v-for="(codePoint, index) in codePoints"
      :code-point="codePoint"
      :key="index"
    />
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import Event from '@/services/Event'
import CodePointsItem from '@/components/CodePointsItem'

export default {
  components: {
    CodePointsItem,
  },

  methods: {
    copyToClipboard() {
      const copied = copy(this.codePoints.join(' '), { format: 'text/plain' })

      if (copied) {
        Event.emit('copied')
      }
    },
  },

  props: {
    codePoints: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
