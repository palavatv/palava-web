<template>
  <div class="info room-error">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />

      <div v-if="error === 'room_full'">
        <h1>{{ $t('room.errorFullHeading') }}</h1>
        <p>{{ $t('room.errorFullDescription') }}</p>
        <p><a href="javascript:window.location.reload()">{{ $t('room.errorFullTryAgain') }}</a></p>
      </div>
      <div v-else-if="error === 'maintenance'">
        <h1>{{ $t('room.errorMaintenanceHeading') }}</h1>
        <p>{{ $t('room.errorMaintenanceDescription') }}</p>
        <p><a href="javascript:window.location.reload()">{{ $t('room.errorMaintenanceTryAgain') }}</a></p>
      </div>
      <div v-else>
        <h1>{{ $t('room.errorConnectionHeading') }}</h1>
        <p>{{ $t('room.errorConnectionDescription') }}</p>
        <p><a href="javascript:window.location.reload()">{{ $t('room.errorConnectionTryAgain') }}</a></p>
      </div>
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'

export default {
  components: {
    LanguageSwitcher,
    Logo,
  },
  props: {
    error: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
@import "@/css/styles.scss";

.room-error .info-page {
  padding-top: $medium-spacing;
  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
    color: $action-3;
  }
}
</style>
