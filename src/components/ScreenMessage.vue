<template>
  <aside class="screen-message" v-html="message" />
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

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

.fade-enter-active {
  transition: opacity .3s ease-in;
}

.fade-leave-active {
  transition: opacity .5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
