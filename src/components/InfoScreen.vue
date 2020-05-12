<template>
  <aside class="info-screen" tabindex="0" @keydown.esc="$emit('close')">
    <button class="close" @click="$emit('close')">
      <inline-svg
        :aria-label="$t('closeAlt')"
        :src="require('../assets/cross.svg')"
        />
    </button>

    <Navigation
      type="screen"
      @open-info-screen="(page) => $emit('open-info-screen', page)"
      />

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
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
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
      if (!window.confirm(this.$t("info.confirmLeave"))) {
        $event.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/css/styles.scss';
/* See InfoPage.vue for main styling */

.info-screen {
  position: fixed;
  z-index: 700;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;
  @media (min-width: $mobile-plus) {
    & {
      left: $medium-spacing;
      top: $large-control-size * 2;
      max-width: calc(100% - #{$medium-spacing * 2});
      bottom: $medium-spacing;
      opacity: 0.92;
    }
  }

  @media (min-width: $desktop) {
    width: $desktop;
  }
  @media (min-width: $desktop-large) {
    width: $desktop-plus;
  }

  @include defaultShadow();
  outline: none;
  overflow: auto;

  .close {
    @include inlineButton();
    @include closeButton(36px);
  }

  .navigation {
    padding-top: 0;
    border-top: none;
    padding-right: 36px;
    width: 100%;
  }
}
</style>
