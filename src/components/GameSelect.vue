<template>
  <div>
    <p><strong>Choose your journey</strong></p>
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
        :value="destination"
        @input="$emit('update:destination', parseInt($event.target.value, 10))"
      >
        <option
          v-for="option in destinations"
          :value="option.years"
          :key="option.years"
          >{{ option.name }} ({{ option.years }} light-years)</option
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
    destination: {
      type: Number,
      default: 50,
    },
    destinations: {
      type: Array,
      default: () => [
        {
          name: 'default',
          years: 50,
        },
      ],
    },
    finishSelect: {
      type: Function,
      default: () => {
        console.log('Ready')
      },
    },
  },
  emits: ['update:gridSize', 'update:destination'],
  setup() {
    const sizeOptions = ref([3, 5, 8, 12])

    return {
      sizeOptions,
    }
  },
}
</script>

<style lang="scss" scoped>
select {
  // appearance: none;
  display: block;
  margin-bottom: 1em;
  padding: 0.5em;
  width: 100%;
  border: 2px solid rgba($color: #62959c, $alpha: 1);
  border-radius: 3px;
}
</style>
