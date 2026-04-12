<template>
  <aside
    class="screen-message"
    v-html="message"
  />
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style lang="scss" scoped>
.screen-message {
  background: black;
  position: fixed;
  z-index: 800;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20vh 10vw;

  color: #e4eeff;
  @include hugeFont();
}
</style>
