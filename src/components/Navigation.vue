<template>
  <nav class="navigation">
    <router-link to="/">palava</router-link> |
    <router-link to="/info/how">{{ $t('infoPages.how.title') }}</router-link> |
    <router-link to="/info/ev">{{ $t('infoPages.ev.title') }}</router-link> |
    <router-link to="/info/contact">{{ $t('infoPages.contact.title') }}</router-link> |
    <router-link to="/info/privacy">{{ $t('infoPages.privacy.title') }}</router-link> |
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
