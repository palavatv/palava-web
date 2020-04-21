<template>
  <main>
    <Peer v-for="peer in peers" :key="peer.id" :peer="peer" />
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
