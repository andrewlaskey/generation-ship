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
      <dl>
        <dt>🌱</dt>
        <dd>
          Trees grow on their own but are sensitive to overpopulation.<br />Grow
          trees to increase the ecological health of the ship. You'll need
          healthy biodiversity to colonize the destination planet.
        </dd>
        <dt>🏠</dt>
        <dd>
          People need farms for food and trees for oxygen. Bigger settlements
          need power.<br />Maintain the human population for the 50 light year
          journey.
        </dd>
        <dt>🌾</dt>
        <dd>
          Farms can be ruined by wild overgrowth and overconsumption by people.
        </dd>
        <dt>🔋</dt>
        <dd>
          Power stations can be overloaded by too many nearby power stations or
          drained by overuse.
        </dd>
      </dl>
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
</style>
