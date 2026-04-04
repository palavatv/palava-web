<template>
  <button
    type="button"
    class="language-switcher"
    :title="t('switchLanguageTitle')"
    @click="switchLanguage"
  >
    <span :aria-label="t('switchLanguageAlt')">{{ locale.toUpperCase() }}</span>
  </button>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()

function switchLanguage() {
  setLocale(locale.value === 'de' ? 'en' : 'de')
}
</script>

<style lang="scss" scoped>
.language-switcher {
  @include knob();
  height: $small-control-size;
  width: $small-control-size;
  font-size: calc($small-control-size / 2.2);

  @media (min-width: $mobile) {
    height: $large-control-size;
    width: $large-control-size;
    font-size: calc($large-control-size / 2.2);
  }
}
</style>
