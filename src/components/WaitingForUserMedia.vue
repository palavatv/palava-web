<template>
  <aside class="waiting-for-user-media">
    waiting for your media
  </aside>
</template>

<style lang="scss" scoped>
@import '@/css/support.scss';

.waiting-for-user-media {
  background: black;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #e4eeff;
  @include fontBig();
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
