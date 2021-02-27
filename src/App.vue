<template>
  <h1>Generation Ship</h1>
  <p>
    Keep the ship alive until you reach the destination planet 50 light years
    away
  </p>
  <div class="game-view">
    <div class="game-options" v-if="!showGame">
      <game-select
        :grid-size="gridSize"
        @update:grid-size="gridSize = $event"
        :lightyears="years"
        @update:lightyears="years = $event"
      />
      <button @click="showGame = true">Launch</button>
    </div>
    <game :size="gridSize" :start-years="years" />
  </div>
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
    const gridSize = ref(5)
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

<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px auto 0;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
}

.game-view {
  position: relative;
}

.game-options {
  box-sizing: border-box;
  position: absolute;
  top: 2em;
  left: 2em;
  padding: 1em;
  width: calc(100% - 4em);
  background: rgba(#ffffff, 0.8);
  border: 2px solid rgba($color: #d4d4d4, $alpha: 1);

  button {
    margin-top: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    height: 2rem;
    background-color: white;
    border: 2px solid rgba($color: #d4d4d4, $alpha: 1);
    border-radius: 0;
  }
}
</style>
