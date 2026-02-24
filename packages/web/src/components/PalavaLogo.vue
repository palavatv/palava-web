<template>
  <div class="logo">
    <router-link :to="to">
      <PalavaIcon :alt="t('palavaLogoAlt')" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PalavaIcon from '@/assets/icons/palava.svg?component'

withDefaults(defineProps<{ to?: string }>(), { to: '/' })
const { t } = useI18n()
</script>
