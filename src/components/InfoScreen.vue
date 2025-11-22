<template>
  <aside
    tabindex="0"
    role="button"
    class="info-screen"
    @keydown.esc="$emit('close')"
  >
    <button
      type="button"
      class="close"
      @click="$emit('close')"
    >
      <inline-svg
        :aria-label="$t('closeAlt')"
        src="../assets/icons/cross.svg"
      />
    </button>
    <Navigation
      type="screen"
      @open-info-screen="(page) => $emit('open-info-screen', page)"
    />
    <div
      class="info-content"
      v-html="infoPage.content"
    />
  </aside>
</template>

<script>
import Navigation from "./Navigation.vue"
import i18nStrings from '../i18nStrings'
import { detectLanguage } from '../support'

const lang = detectLanguage()

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
  emits: ['close', 'open-info-screen'],
  mounted() {
    if (this.page) { this.$el.focus() }
  },
  watch: {
    page(newPage) {
      if (newPage) { this.$el.focus() }
    }
  },
  computed: {
    infoPage() {
      return i18nStrings[lang].infoPages.filter((ip) => ip.id === this.page)[0] || {}
    }
  }
}
</script>

<style lang="scss">
@use "@/css/styles" as *;
/* See InfoPage.vue for main styling */

.info-screen {
  // Positioning
  position: fixed;
  z-index: 700;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  // Visual
  opacity: 1;
  outline: none;
  overflow: auto;

  // Shadow effect
  @include defaultShadow();

  // Responsive styles
  @media (min-width: $mobile-plus) {
    left: $medium-spacing;
    top: $large-control-size * 2;
    max-width: calc(100% - #{$medium-spacing * 2});
    bottom: $medium-spacing;
    opacity: 0.92;
  }

  @media (min-width: $desktop) {
    width: $desktop;
  }

  @media (min-width: $desktop-large) {
    width: $desktop-plus;
  }

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

  .info-content {
    padding-bottom: $medium-plus-spacing;
  }
}
</style>
