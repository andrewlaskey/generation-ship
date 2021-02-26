<template>
  <div>
    <p>Choose your journey</p>
    <div>
      <label>Ship size:</label>
      <select v-model="gridSize">
        <option v-for="size in sizeOptions" :value="size" :key="size">{{
          size
        }}</option>
      </select>
    </div>
    <div>
      <label>Destination:</label>
      <select v-model="lightyears">
        <option v-for="years in destinationOptions" :value="years" :key="years"
          >{{ years }} light years</option
        >
      </select>
    </div>
    <button @click="finishSelect(gridSize, lightyears)">Launch</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    finishSelect: {
      type: Function,
      default: () => {
        console.log('Ready')
      },
    },
  },
  setup() {
    const sizeOptions = ref([3, 5, 8, 12])
    const gridSize = ref(8)

    const destinationOptions = ref([10, 25, 50, 100])
    const lightyears = ref(50)

    return {
      sizeOptions,
      gridSize,
      destinationOptions,
      lightyears,
    }
  },
}
</script>

<style></style>
