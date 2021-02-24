<template>
  <div class="wrapper">
    <div
      v-for="(gridItem, index) in grid"
      :key="index"
      @mouseenter="(e) => checkPlacement(e.currentTarget, gridItem, index)"
      @mouseleave="onMouseLeave"
    >
      <grid-item :index="index" :grid="grid" @click="clickGridItem(index)" />
    </div>
  </div>
  <div class="actions">
    <div>
      <button
        v-for="(option, i) in options"
        :key="i"
        :class="{ selected: i === selectedOption }"
        :disabled="gameOver"
        @click="selectType(option, i)"
      >
        <span v-if="option === 't'">🌱</span>
        <span v-if="option === 'T'">🌳</span>
        <span v-if="option === 'h'">🏠</span>
        <span v-if="option === 'P'">🔋</span>
        <span v-if="option === 'F'">🌾</span>
      </button>
    </div>
    <div>
      <button @click="next" :disabled="!played || gameOver">Next</button>
    </div>
  </div>
  <div>
    <span>Population: {{ population }}</span
    ><br />
    <span>Ecology: {{ ecology }}</span
    ><br />
    <span>Years to destination planet: {{ years }}</span
    ><br />
  </div>
  <div class="modal" v-if="gameOver">
    <p>{{ gameOverMessage }}</p>
    <p><small>Reload page to play again</small></p>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import GridItem from './GridItem.vue'
import { getRandomType } from '../utils/helpers'

export default {
  components: { GridItem },
  setup() {
    const size = ref(8)
    const grid = ref([])
    const selectedType = ref('t')
    const selectedOption = ref(-1)
    const options = ref(['h', 'F', 't', 't'])
    const played = ref(false)
    const years = ref(50)
    const gameOver = ref(false)
    const gameOverMessage = ref('')

    const population = computed(() => {
      return grid.value.reduce((total, item) => {
        if (item === 'h') {
          total++
        }

        if (item === 'V') {
          total += 3
        }

        if (item === 'C') {
          total += 5
        }

        return total
      }, 0)
    })

    const ecology = computed(() => {
      return grid.value.reduce((total, item) => {
        if (item === 't') {
          total++
        }

        if (item === 'T') {
          total += 3
        }

        return total
      }, 0)
    })

    for (let index = 0; index < size.value * size.value; index++) {
      grid.value.push('.')
    }

    return {
      size,
      grid,
      selectedType,
      options,
      selectedOption,
      played,
      population,
      ecology,
      years,
      gameOver,
      gameOverMessage,
    }
  },
  methods: {
    checkPlacement(node, item) {
      if (this.placementAllowed(item)) {
        node.style = 'background: #7de07d40'
      } else {
        node.style = 'background: #ef6c6c40'
      }
    },
    onMouseLeave(e) {
      e.currentTarget.style = ''
    },
    placementAllowed(item) {
      return (
        this.selectedOption >= 0 && this.options[this.selectedOption] != item
      )
    },
    clickGridItem(index) {
      if (this.placementAllowed(this.grid[index])) {
        this.grid[index] = this.selectedType
        this.options.splice(this.selectedOption, 1)
        this.played = true
        this.selectedOption = -1
      }
    },
    selectType(type, index) {
      this.selectedType = type
      this.selectedOption = index
    },
    next() {
      const updatedGrid = [...this.grid]

      this.grid.forEach((item, index) => {
        const neighbors = this.findNeighbors(index)

        switch (item) {
          case 't':
            updatedGrid[index] = this.handleTree(neighbors)
            break
          case 'T':
            updatedGrid[index] = this.handleTrees(neighbors)
            break
          case 'F':
            updatedGrid[index] = this.handleFarm(neighbors)
            break
          case 'P':
            updatedGrid[index] = this.handlePower(neighbors)
            break
          case 'h':
            updatedGrid[index] = this.handleHouse(neighbors)
            break
          case 'V':
            updatedGrid[index] = this.handleVillage(neighbors)
            break
          case 'C':
            updatedGrid[index] = this.handleCity(neighbors)
            break
          case '.':
            updatedGrid[index] = this.handleEmpty(neighbors)
        }
      })

      this.grid = [...updatedGrid]

      while (this.options.length < 4) {
        this.options.push(getRandomType())
      }

      this.played = false
      this.selectedOption = -1
      this.years--

      this.checkGameConditions()
    },
    handleEmpty(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const highPopCount = this.countNeighbors(neighbors, ['V', 'C'])
      const powerCount = this.countNeighbors(neighbors, ['P'])
      const farmCount = this.countNeighbors(neighbors, ['F'])

      if (treesCount >= 3) {
        return 't'
      }

      if (highPopCount >= 1 && powerCount >= 1 && farmCount >= 2) {
        return 'h'
      }

      return '.'
    },
    handleTree(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])

      if (treesCount >= 5) {
        return '.'
      }

      if (treesCount >= 3) {
        return 'T'
      }

      if (treesCount === 0 || peopleCount >= 5) {
        return '.'
      }

      return 't'
    },
    handleTrees(neighbors) {
      const bigTreesCount = this.countNeighbors(neighbors, ['T'])
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])

      if (bigTreesCount >= 4) {
        return '.'
      }

      if (peopleCount >= 4) {
        return 't'
      }

      return 'T'
    },
    handleFarm(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])
      const highPopCount = this.countNeighbors(neighbors, ['V', 'C'])
      const cityCount = this.countNeighbors(neighbors, ['C'])

      // if too many trees, it gets overgrown
      if (treesCount >= 5) {
        return 't'
      }

      // Needs at least one people to maintain
      if (peopleCount < 1) {
        return '.'
      }

      // Overuse kills it
      if (peopleCount >= 6 || highPopCount >= 5 || cityCount >= 4) {
        return '.'
      }

      return 'F'
    },
    handlePower(neighbors) {
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])
      const highPopCount = this.countNeighbors(neighbors, ['V', 'C'])
      const powerCount = this.countNeighbors(neighbors, ['P'])

      // Needs people to maintain
      if (peopleCount < 1) {
        return '.'
      }

      // Too much power generation overloads it and kills it
      if (powerCount > 3) {
        return '.'
      }

      // Overuse kills it
      if (peopleCount >= 5 || highPopCount >= 4) {
        return '.'
      }

      return 'P'
    },
    handleHouse(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const farmCount = this.countNeighbors(neighbors, ['F'])
      const powerCount = this.countNeighbors(neighbors, ['P'])

      if (treesCount === 0 || farmCount === 0) {
        return '.'
      }

      if (farmCount >= 1 && powerCount >= 1) {
        return 'V'
      }

      return 'h'
    },
    handleVillage(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const farmCount = this.countNeighbors(neighbors, ['F'])
      const powerCount = this.countNeighbors(neighbors, ['P'])
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])

      if (treesCount < 1 || farmCount < 1 || powerCount < 1) {
        return 'h'
      }

      if (farmCount >= 2 && powerCount >= 1 && peopleCount >= 2) {
        return 'C'
      }

      return 'V'
    },
    handleCity(neighbors) {
      const treesCount = this.countNeighbors(neighbors, ['t', 'T'])
      const farmCount = this.countNeighbors(neighbors, ['F'])
      const powerCount = this.countNeighbors(neighbors, ['P'])
      const peopleCount = this.countNeighbors(neighbors, ['h', 'V', 'C'])

      if (treesCount < 1) {
        return '.'
      }

      if (farmCount < 2 || powerCount < 1 || peopleCount < 2) {
        return 'V'
      }

      return 'C'
    },
    findNeighbors(index) {
      const neighbors = {
        top: false,
        topLeft: false,
        left: false,
        bottomLeft: false,
        bottom: false,
        bottomRight: false,
        right: false,
        topRight: false,
      }

      if (index - this.size >= 0) {
        neighbors.top = index - this.size

        if (index % this.size !== 0) {
          neighbors.topLeft = neighbors.top - 1
        }

        if ((index + 1) % this.size !== 0) {
          neighbors.topRight = neighbors.top + 1
        }
      }

      if (index + this.size < this.grid.length) {
        neighbors.bottom = index + this.size

        if (index % this.size !== 0) {
          neighbors.bottomLeft = neighbors.bottom - 1
        }

        if ((index + 1) % this.size !== 0) {
          neighbors.bottomRight = neighbors.bottom + 1
        }
      }

      if (index % this.size !== 0) {
        neighbors.left = index - 1
      }

      if (index + (1 % this.size) !== 0) {
        neighbors.right = index + 1
      }

      return neighbors
    },
    countNeighbors(neighbors, type) {
      let count = 0

      if (type.includes(this.grid[neighbors.top])) {
        count++
      }

      if (type.includes(this.grid[neighbors.topLeft])) {
        count++
      }

      if (type.includes(this.grid[neighbors.topRight])) {
        count++
      }

      if (type.includes(this.grid[neighbors.left])) {
        count++
      }

      if (type.includes(this.grid[neighbors.right])) {
        count++
      }

      if (type.includes(this.grid[neighbors.bottom])) {
        count++
      }

      if (type.includes(this.grid[neighbors.bottomLeft])) {
        count++
      }

      if (type.includes(this.grid[neighbors.bottomRight])) {
        count++
      }

      return count
    },
    checkGameConditions() {
      if (this.population <= 0) {
        this.gameOver = true
        this.gameOverMessage =
          'Everyone died. Your crewless vessel drifts alone in space for eternity.'
      }

      if (this.ecology <= 0) {
        this.gameOver = true
        this.gameOverMessage =
          'All plant and animal life has perished. Lack of oxygen will kill everything on board.'
      }

      if (this.years <= 0) {
        this.gameOver = true
        this.gameOverMessage = `You have made it to your destination star with ${this.population} people and an ecology index of ${this.ecology}.`
      }

      if (this.gameOver) {
        this.selectedOption = -1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 50px);
  padding-bottom: 1rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px dashed rgba($color: #c7c7c7, $alpha: 1);
  }
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

button {
  margin-right: 5px;
  padding-left: 10px;
  padding-right: 10px;
  height: 2rem;
  background-color: white;
  border: 2px solid rgba($color: #d4d4d4, $alpha: 1);
  border-radius: 0;

  &.selected {
    border-color: rgb(130, 158, 243);
    background-color: rgba(179, 194, 240, 0.699);
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
