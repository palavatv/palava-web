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

@font-face {
  font-family: WorkSans;
  src: url('/WorkSans-Regular.woff2') format('woff2');
}

@font-face {
  font-family: WorkSansBold;
  src: url('/WorkSans-SemiBold.woff2') format('woff2');
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: WorkSans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  min-height: 100%;
  overscroll-behavior: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: normal;
  margin: auto;
}

a {
  text-decoration: none;
  color: $action-1;
  &:hover {
    color: $action-2;
  }
}

*:focus {
  outline-color: $action-2;
}

::selection {
  background: #BCD2EE;
}

button, input {
  font-family: inherit;
  font-size: 1em;
}

ul, li {
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}

p, address {
  font-variant: normal;
  margin: $small-spacing auto;
}

input, input[type=text] {
  appearance: none;
  border-radius: 0;
  box-shadow: none;
}

button::-moz-focus-inner {
  border: 0;
}

h1 {
  color: $action-1;
  @include fontBig();
  text-transform: capitalize;
  a, a:hover { color: inherit }
}

h2 {
  font-family: WorkSansBold, WorkSans, sans-serif;
  color: $action-1;
  font-size: 20px; // TODO responsive
}

.earth {
  padding-top: 4vh;
  text-align: center;
}

</style>
