<template>
  <div id="app">
    <nav id="nav">
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
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
