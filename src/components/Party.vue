<template>
  <main class="dashboard">
    <nav class="controls">
      <router-link to="/">palava.tv</router-link>
    </nav>
    <ul :class="{
      'party': true,
      'party--empty': peers.length === 0,
      'party--one': peers.length === 1,
      'party--two': peers.length === 2,
      'party--three': peers.length === 3,
      'party--four': peers.length === 4,
      'party--five': peers.length === 5,
      'party--six': peers.length === 6,
    }">
      <Peer v-for="peer in peers" :key="peer.id" :peer="peer" />
    </ul>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

export default {
  props: ["peers"],
  components: {
    Peer,
  },
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
  background: black;
  position: relative;
}

.controls {
  position: absolute;
  top: 0;
  left: 0;

  /* debug */
  a { color: white; }
  z-index: 1000;
  top: 2px;
  left: 4px;
}

.party {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  > * {
    flex: 1;
  }
}

</style>
