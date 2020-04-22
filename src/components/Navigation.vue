<template>
  <nav class="navigation">
    <router-link to="/">palava</router-link> |
    <router-link to="/info/how">{{ $t('info') }}</router-link> |
    <router-link to="/info/ev">{{ $t('palavaEv') }}</router-link> |
    <router-link to="/info/contact">{{ $t('imprint') }}</router-link> |
    <router-link to="/info/privacy">{{ $t('privacyPolicy') }}</router-link> |
    <LanguageSwitcher />
  </nav>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  components: {
    LanguageSwitcher,
  },
}
</script>
