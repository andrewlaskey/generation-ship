<template>
  <div>
    <span>{{ type }}</span>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue'
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    grid: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { grid, index } = toRefs(props)

    const type = computed(() => {
      switch (grid.value[index.value]) {
        case 't':
          return '🌱'
        case 'T':
          return '🌳'
        case 'h':
          return '🏠'
        case 'V':
          return '🏘'
        case 'C':
          return '🏬'
        case 'P':
          return '🔋'
        case 'F':
          return '🌾'
        default:
          return ' '
      }
    })

    return {
      type,
    }
  },
}
</script>

<style lang="scss" scoped>
span {
  font-size: 32px;
  // transform: rotateZ(45deg) skew(5deg, 0deg);
}
</style>
