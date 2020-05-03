<template>
  <img
    class="media media--orientation-landscape"
    src="@/assets/placeholder.png"
    alt="someone"
    ref="placeholder"
    :style="{
      'background': background,
    }"
    @click="$emit('click')"
  />
</template>

<script>
const COLORS = [
  'transparent',
  '#ffe6c0',
  '#ffc0cb',
  '#c0dcff',
  '#caa5a5',
  '#c7ffce',
  '#dac7ff',
]

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
      return COLORS[this.colorIndex]
    }
  }
}
</script>
