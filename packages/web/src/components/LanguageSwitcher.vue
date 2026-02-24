<template>
  <button
    :title="t('switchLanguageTitle')"
    class="language-switcher"
    @click="switchLanguage"
  >
    <span :aria-label="t('switchLanguageAlt')">{{ locale }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function switchLanguage() {
  locale.value = locale.value === 'de' ? 'en' : 'de'
}
</script>

<style lang="scss">
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
