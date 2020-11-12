<template>
  <img
    class="media media--orientation-landscape"
    src="@/assets/icons/placeholder.png"
    :alt="$t('peer.placeholderAlt', { color: background })"
    ref="placeholder"
    :style="{
      'background': background,
    }"
    @click="$emit('click')"
  />
</template>

<script>
import { generateColor } from "@/support"

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    background() {
      return generateColor(this.peer.id)
    }
  }
}
</script>
