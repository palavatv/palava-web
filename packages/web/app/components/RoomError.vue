<template>
  <InfoLayout class="room-error">
    <div v-if="error === 'room_full'">
      <h1>{{ t('room.errorFullHeading') }}</h1>
      <p>{{ t('room.errorFullDescription') }}</p>
      <p><a href="javascript:window.location.reload()">{{ t('room.errorFullTryAgain') }}</a></p>
    </div>
    <div v-else-if="error === 'maintenance'">
      <h1>{{ t('room.errorMaintenanceHeading') }}</h1>
      <p>{{ t('room.errorMaintenanceDescription') }}</p>
      <p><a href="javascript:window.location.reload()">{{ t('room.errorMaintenanceTryAgain') }}</a></p>
    </div>
    <div v-else>
      <h1>{{ t('room.errorConnectionHeading') }}</h1>
      <p>{{ t('room.errorConnectionDescription') }}</p>
      <p><a href="javascript:window.location.reload()">{{ t('room.errorConnectionTryAgain') }}</a></p>
    </div>
  </InfoLayout>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ error?: string | null }>(), { error: null })
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.room-error :deep(.info-page) {
  padding-top: $medium-spacing;
  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
    color: $action-3;
  }
}
</style>
