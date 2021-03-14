<template>
  <div class="grid-item">
    <img v-if="type === 't'" src="images/tree.png" class="tree" />
    <img v-if="type === 'T'" src="images/trees.png" class="trees" />
    <img v-if="type === 'F'" src="images/farm.png" class="farm" />
    <img v-if="type === 'P'" src="images/power.png" class="power" />
    <img v-if="type === 'h'" src="images/house.png" class="house" />
    <img v-if="type === 'V'" src="images/town.png" class="village" />
    <img v-if="type === 'C'" src="images/city.png" class="city" />
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

    const type = computed(() => grid.value[index.value])

    return {
      type,
    }
  },
}
</script>

<style lang="scss">
.explore .grid-item img {
  position: absolute;
  height: 60px;
  width: auto;
  transform: rotateX(315deg) rotateZ(323deg) rotateY(31deg) translateY(-24px)
    translateZ(8px);
}

.grid-item img {
  width: 100%;
  pointer-events: none;
}

.explore .grid-item .house {
  height: 30px;
  transform: rotateX(315deg) rotateZ(323deg) rotateY(31deg) translateY(-8px)
    translateZ(8px);
}
</style>
