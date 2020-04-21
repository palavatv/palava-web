<template>
  <div class="world">
    <nav class="navigation">
      <router-link to="/">palava</router-link> |
      <router-link to="/info/how">{{ $t('info') }}</router-link> |
      <router-link to="/info/ev">{{ $t('palavaEv') }}</router-link> |
      <router-link to="/info/contact">{{ $t('imprint') }}</router-link> |
      <router-link to="/info/privacy">{{ $t('privacyPolicy') }}</router-link> |
      <LanguageSwitcher />
    </nav>

    <router-view/>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  components: {
    LanguageSwitcher,
  },
  metaInfo() {
    const lang = this.$root.$i18n.locale
    return {
      htmlAttrs: {
        lang,
      },
      title: 'palava.tv',
      titleTemplate: 'palava.tv | %s',
    }
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}

a {
  text-decoration: none;
  color: $action-1;
}

.world {
  margin-top: 4vh;
  text-align: center;
}
</style>
