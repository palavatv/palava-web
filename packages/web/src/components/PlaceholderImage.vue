<template>
  <div
    class="media media--orientation-landscape placeholder-media"
    :style="{ background }"
    :aria-label="t('peer.placeholderAlt', { color: background })"
    @click="emit('click')"
    @keypress.enter="emit('click')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import config from '@/config'

const props = withDefaults(defineProps<{
  colorIndex?: number
}>(), { colorIndex: 0 })

const emit = defineEmits<{ click: [] }>()
const { t } = useI18n()

const background = computed(() => config.peerColors[props.colorIndex] ?? 'transparent')
</script>

<style lang="scss" scoped>
.placeholder-media {
  width: 100%;
  height: 100%;
}
</style>
