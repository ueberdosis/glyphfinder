<template>
  <div class="entity-list">
    <entity-item
      class="entity-list__item"
      v-for="(entity, index) in entities"
      :entity="entity"
      :key="index"
    />
  </div>
</template>

<script>
import EntityItem from '@/components/EntityItem'

export default {
  components: {
    EntityItem,
  },

  props: {
    entities: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
