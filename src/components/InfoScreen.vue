<template>
  <aside class="info-screen">
    <button class="close" @click="$emit('close')"><span role="img" aria-label="cross mark">❌︎</span></button>

    <div class="logo">
      <img alt="palava papagei" src="@/assets/palava.svg">
    </div>

    <h1 class="info-title">
      <router-link :to="`/info/${page}`">
        {{ $t(`infoPages.${this.page}.title`) }}
      </router-link>
    </h1>
    <div class="info-content" v-html="$t(`infoPages.${this.page}.content`)" />
  </aside>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

.info-screen {
  background: $white;
  position: fixed;
  z-index: 700;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;
  @media (min-width: $desktop) {
    & {
      left: 1vw;
      right: 1vw;
      top: 1vw;
      bottom: 1vw;
    }
  }
  @include defaultShadow();

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: $black;
  @include fontDefault();

  .info-title {
    color: $action-1;
    @include fontBig();
    margin-bottom: 30px; // TODO responsive
    a { color: inherit }
  }

  .info-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px; // TODO responsive
  }

  .logo {
    margin: 30px; // TODO responsive
    img {
      width: 15vw;
      height: 15vw;
    }
  }

  .close {
    @include inlineButton();
    @include closeButton(40px);
  }
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
