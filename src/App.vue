<template>
  <h1>Generation Ship</h1>
  <p>
    Keep the ship alive until you reach the destination planet 50 light years
    away
  </p>
  <game />
  <info />
</template>

<script>
import Game from './components/Game.vue'
import Info from './components/Info'

export default {
  name: 'App',
  components: {
    Game,
    Info,
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
