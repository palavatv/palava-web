<template>
  <router-view/>
</template>

<script>
export default {
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

@font-face {
  font-family: NotoSansSymbols2;
  src: url('/NotoSansSymbols2.ttf') format('truetype');
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: normal;
  margin: auto;
}

a {
  text-decoration: none;
  color: $action-1;
}

ul, li {
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}

button::-moz-focus-inner {
  border: 0;
}

.earth {
  padding-top: 4vh;
  text-align: center;
}

</style>
