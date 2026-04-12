<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
})
</script>

<style lang="scss">
@font-face {
  font-family: WorkSans;
  src: url('/fonts/WorkSans-Regular.woff2') format('woff2');
}

html,
body,
#__nuxt {
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
  background: $background;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: normal;
  margin: auto 0;
}

ul, ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: $action-1;

  &:hover {
    color: $action-2;
  }
}

button {
  font-family: inherit;
}
</style>
