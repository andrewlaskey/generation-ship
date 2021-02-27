<template>
  <div>
    <p>Choose your journey</p>
    <div>
      <label>Ship size:</label>
      <select
        :value="gridSize"
        @input="$emit('update:gridSize', parseInt($event.target.value, 10))"
      >
        <option v-for="size in sizeOptions" :value="size" :key="size">{{
          size
        }}</option>
      </select>
    </div>
    <div>
      <label>Destination:</label>
      <select
        :value="lightyears"
        @input="$emit('update:lightyears', parseInt($event.target.value, 10))"
      >
        <option v-for="years in destinationOptions" :value="years" :key="years"
          >{{ years }} light years</option
        >
      </select>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    gridSize: {
      type: Number,
      default: 8,
    },
    lightyears: {
      type: Number,
      default: 50,
    },
    finishSelect: {
      type: Function,
      default: () => {
        console.log('Ready')
      },
    },
  },
  emits: ['update:gridSize', 'update:lightyears'],
  setup() {
    const sizeOptions = ref([3, 5, 8, 12])
    const destinationOptions = ref([10, 25, 50, 100])

    return {
      sizeOptions,
      destinationOptions,
    }
  },
}
</script>

<style lang="scss" scoped></style>
