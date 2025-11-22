<template>
  <button
    type="button"
    :title="$t('switchLanguageTitle')"
    class="language-switcher"
    @click="switchLanguage"
  >
    <!-- <span :aria-label="$t('switchLanguageAlt')">{{ $root.$i18n.locale }}</span> -->
  </button>
</template>

<script>
// Introduce vueuse
export default {
  methods: {
    switchLanguage() {
      // this.$root.$i18n.locale = this.$root.$i18n.locale === 'de' ? 'en' : 'de'
    },
  },
};
</script>

<style lang="scss">
@use "@/css/styles.scss" as *;

.language-switcher {
  /* Typography */
  @include footerFont();

  /* Wrap remaining styles in a nested block to avoid mixed declarations */
  & {
    /* Box model */
    padding: 0;

    /* Typography */
    text-transform: uppercase;
    color: $shade;

    /* Visual */
    border: none;
    background: none;

    /* Interactive */
    cursor: pointer;

    /* States */
    &:hover {
      color: $action-2;
    }
  }
}
</style>
