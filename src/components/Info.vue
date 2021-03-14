<template>
  <div class="info-panel">
    <button @click="() => (show = !show)">ℹ️</button>
    <div class="info-body" v-if="show">
      <p>
        In order to expand humanity across the galaxy, we built generation
        ships. Without faster-than-light engines it will take hundreds possibly
        thousands of years to reach our future home. Generations of humans will
        live out their lives in this pocket ecosystem as it travels through the
        vastness of space.
      </p>
      <div class="info-section">
        <img src="images/tree.png" />
        <p>
          Trees grow on their own but are sensitive to overpopulation.<br />Grow
          trees to increase the ecological health of the ship. You'll need
          healthy biodiversity to colonize the destination planet.
        </p>
      </div>
      <div class="info-section">
        <img src="images/house.png" />
        <p>
          People need farms for food and trees for oxygen. Bigger settlements
          need power.<br />Maintain the human population for the 50 light year
          journey.
        </p>
      </div>
      <div class="info-section">
        <img src="images/farm.png" />
        <p>
          Farms can be ruined by wild overgrowth and overconsumption by people.
        </p>
      </div>
      <div class="info-section">
        <img src="images/power.png" />
        <p>
          Power stations can be overloaded by too many nearby power stations or
          drained by overuse.
        </p>
      </div>
      <p>
        <a href="https://kgmpers.itch.io/generation-ship/donate" target="_blank"
          >Support development of this game on itch.io</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)

    return {
      show,
    }
  },
}
</script>

<style lang="scss" scoped>
.info-panel {
  position: absolute;
  top: 10px;
  right: 10px;

  button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    outline: none;
  }
}

.info-body {
  padding: 2rem 1rem;
  background: rgba(#e7f7e9, 0.95);
  color: #314e52;
  max-width: 300px;
  overflow: scroll;
}

img {
  width: 50px;
}

dt {
  float: left;
}

.info-section {
  display: flex;
  align-items: flex-start;

  img {
    margin-right: 15px;
    width: 50px;
    height: auto;
  }
}
</style>
