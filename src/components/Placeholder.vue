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
    @keypress.enter="$emit('click')"
  />
</template>

<script>
import config from '@/config'

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
    colorIndex: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    background() {
      return config.peerColors[this.colorIndex]
    }
  }
}
</script>
