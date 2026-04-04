<template>
  <div class="logo">
    <router-link :to="to">
      <PalavaIcon :aria-label="t('palavaLogoAlt')" role="img" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import PalavaIcon from '@/assets/icons/palava.svg?component'

withDefaults(defineProps<{ to?: string }>(), { to: '/' })
const { t } = useI18n()
</script>
