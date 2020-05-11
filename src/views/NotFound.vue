<template>
  <div class="info">
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <Logo class="logo logo--mobile" />
      <Navigation />

      <h1 class="info-title">
        {{ $t(`infoPages['not-found'].title`) }}
      </h1>
      <div class="info-content" v-html="$t(`infoPages['not-found'].content`)" />
    </main>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Logo,
    Navigation,
  },
  metaInfo() {
    return {
      title: this.$t(`infoPages['not-found'].title`),
    }
  },
}
</script>

<style lang="scss">
  // see InfoScreen.vue
</style>
