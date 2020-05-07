<template>
  <div class="earth">
    <Navigation />

    <main class="info-page">
      <div class="logo">
        <img alt="palava papagei" src="@/assets/palava.svg">
      </div>

      <h1 class="info-title">
        {{ $t(`infoPages['not-found'].title`) }}
      </h1>
      <div class="info-content" v-html="$t(`infoPages['not-found'].content`)" />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
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
