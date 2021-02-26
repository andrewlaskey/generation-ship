<template>
  <h1>Generation Ship</h1>
  <p>
    Keep the ship alive until you reach the destination planet 50 light years
    away
  </p>
  <game-select v-if="!showGame" :finish-select="finishSelect" />
  <game v-if="showGame" :size="gridSize" :start-years="years" />
  <info />
</template>

<script>
import { ref } from 'vue'
import Game from './components/Game.vue'
import Info from './components/Info'
import GameSelect from './components/GameSelect'

export default {
  name: 'App',
  components: {
    Game,
    Info,
    GameSelect,
  },
  setup() {
    const gridSize = ref(8)
    const years = ref(50)
    const showGame = ref(false)

    return { gridSize, years, showGame }
  },
  methods: {
    finishSelect(sizeSelect, yearsSelect) {
      this.gridSize = sizeSelect
      this.years = yearsSelect
      this.showGame = true
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px auto 0;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
}
</style>
