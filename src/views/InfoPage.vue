<template>
  <div class="earth">
    <Navigation />

    <main class="info-page">
      <div class="logo">
        <img alt="palava papagei" src="@/assets/palava.svg">
      </div>

      <h1 class="info-title">
        {{ $t(`infoPages.${this.page}.title`) }}
      </h1>
      <div class="info-content" v-html="$t(`infoPages.${this.page}.content`)" />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  metaInfo() {
    return {
      title: this.$t(`infoPages.${this.page}.title`),
    }
  },
}
</script>

<style lang="scss">
  // see InfoScreen.vue
</style>
