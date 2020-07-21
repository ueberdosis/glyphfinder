<template>
  <div
    class="glyph-list"
    :class="{ 'is-expanded': navigatable.isExpanded }"
  >
    <virtual-list
      :scrollelement="scrollelement"
      :size="navigatable.glyphRowHeight"
      :variable="getVariableHeight"
      :remain="navigatable.showRows"
      :item="rowComponent"
      :itemcount="rowsCount"
      :itemprops="getItemProps"
      :onscroll="onScroll"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import GlyphRow from '@/components/GlyphRow'

export default {
  inject: ['navigatable'],

  components: {
    VirtualList,
  },

  props: {
    rows: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      rowComponent: GlyphRow,
      scrollelement: null,
    }
  },

  computed: {
    rowsCount() {
      return this.rows.length
    },
  },

  methods: {
    getVariableHeight(index) {
      return this.rows[index].height
    },

    getItemProps(index) {
      return {
        props: {
          ...this.rows[index],
          y: index,
        },
      }
    },

    onScroll(event, data) {
      this.navigatable.handleScroll(data)
    },
  },

  mounted() {
    this.scrollelement = this.$el
    this.navigatable.setElement(this.$el)
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
