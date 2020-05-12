<template>
  <button
    :title="$t('switchLanguageTitle')"
    class="language-switcher"
    @click="switchLanguage"
    >
    <span :aria-label="$t('switchLanguageAlt')">{{ $root.$i18n.locale }}</span>
  </button>
</template>

<script>
export default {
  methods: {
    switchLanguage() {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'de' ? 'en' : 'de'
    },
  }
}
</script>

<style lang="scss">
@import "@/css/styles.scss";

.language-switcher {
  text-transform: uppercase;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  @include footerFont();
  color: $shade;
  &:hover {
    color: $action-2;
  }
}
</style>
