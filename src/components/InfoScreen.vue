<template>
  <aside class="info-screen" tabindex="0" @keydown.esc="$emit('close')">
    <button class="close" @click="$emit('close')"><span role="img" aria-label="cross mark">❌︎</span></button>

    <div class="logo">
      <img alt="palava papagei" src="@/assets/palava.svg">
    </div>

    <h1 class="info-title">
      <router-link :to="`/info/${page}`">
        <span @click="confirmLeave($event)">
          {{ $t(`infoPages.${this.page}.title`) }}
        </span>
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
  mounted() {
    if (this.page) { this.$el.focus() }
  },
  watch: {
    page(newPage) {
      if (newPage) { this.$el.focus() }
    }
  },
  methods: {
    confirmLeave($event) {
      if (!window.confirm("This will exit the current session. Continue?")) {
        $event.preventDefault()
      }
    }
  }
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
  outline: none;

  .close {
    @include inlineButton();
    @include closeButton(40px);
  }
}

.info-screen, .info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $black;
  @include fontDefault();
  padding: 20px; // TODO responsive

  .info-content {
    flex: 1;
    overflow-y: auto;
  }

  .logo {
    margin: 30px; // TODO responsive
    img {
      width: 15vw;
      height: 15vw;
    }
  }

  h1 {
    color: $action-1;
    @include fontBig();
    margin-bottom: 30px; // TODO responsive
    text-transform: capitalize;
    a { color: inherit }
  }

  h2 {
    color: $action-1;
    font-weight: bold;
    font-size: 20px; // TODO responsive
    margin-top: $default-spacing * 2;
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
