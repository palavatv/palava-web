<template>
  <li>
    <Stream :peer="peer" />
  </li>
</template>

<script>
import Stream from "@/components/Stream.vue"

export default {
  props: ["peer"],
  components: {
    Stream,
  },
}
</script>
