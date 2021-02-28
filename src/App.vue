<template>
  <h1>Generation Ship</h1>
  <p>
    Keep the ship alive until you reach the destination planet.
  </p>
  <div class="game-view">
    <game :size="gridSize" :destination="selectedDestination" />
    <div class="game-options" v-if="!showGame">
      <game-select
        :grid-size="gridSize"
        @update:grid-size="gridSize = $event"
        :destinations="destinations"
        :destination="selectedDestination.years"
        @update:destination="updateDestination"
      />
      <button @click="showGame = true">Launch</button>
    </div>
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
    const gridSize = ref(8)
    const years = ref(50)
    const showGame = ref(false)
    const destinations = ref([
      {
        name: 'Ross 128b',
        years: 10,
      },
      {
        name: 'Gliese 667 C',
        years: 25,
      },
      {
        name: 'Gliese 163 c',
        years: 50,
      },
      {
        name: 'TOI 700d',
        years: 100,
      },
      {
        name: 'K2-72e',
        years: 200,
      },
      {
        name: 'Kepler-1649c',
        years: 300,
      },
    ])
    const selectedDestination = ref({
      name: 'Gliese 163 c',
      years: 50,
    })

    return { gridSize, years, showGame, destinations, selectedDestination }
  },
  methods: {
    finishSelect(sizeSelect, yearsSelect) {
      this.gridSize = sizeSelect
      this.years = yearsSelect
      this.showGame = true
    },
    updateDestination(event) {
      this.selectedDestination = this.destinations.find(
        (option) => option.years === event
      )
    },
  },
}
</script>

<style lang="scss">
body {
  background: #172122;
}

#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e7e6e1;
  margin: 10px auto 0;
  padding: 1rem;
  width: 100%;
  max-width: 460px;
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
  background: rgba(#e7f7e9, 0.95);
  color: #314e52;
  border: 2px solid rgba($color: #62959c, $alpha: 1);
  border-radius: 3px;

  button {
    margin-top: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    height: 2rem;
    color: white;
    background-color: #62959c;
    border: 2px solid rgba($color: #62959c, $alpha: 1);
    border-radius: 3px;
    font-weight: bold;
  }
}
</style>
