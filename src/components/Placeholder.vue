<template>
  <img
    class="media"
    src="@/assets/placeholder.png"
    alt="someone"
    ref="placeholder"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  />
</template>

<script>
export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  background: transparent;
}
</style>
