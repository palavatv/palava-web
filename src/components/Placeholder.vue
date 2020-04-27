<template>
  <img
    src="@/assets/placeholder.png"
    alt="someone"
    ref="placeholder"
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
  background: black;
}
</style>
