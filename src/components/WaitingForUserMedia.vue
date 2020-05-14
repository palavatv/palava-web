<template>
  <aside class="waiting-for-user-media">
    {{ $t("room.waitingForUserMedia") }}
  </aside>
</template>

<style lang="scss" scoped>
@import '@/css/styles.scss';

.waiting-for-user-media {
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
