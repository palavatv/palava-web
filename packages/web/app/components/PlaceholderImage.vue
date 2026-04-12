<template>
  <img
    tabindex="0"
    role="button"
    class="media media--orientation-landscape placeholder-media"
    src="~/assets/icons/placeholder.png"
    :alt="t('peer.placeholderAlt', { color: background })"
    :style="{ background }"
    @click="emit('click')"
    @keypress.enter="emit('click')"
  >
</template>

<script setup lang="ts">
const config = usePalavaConfig()
const { t } = useI18n()

const props = withDefaults(defineProps<{
  colorIndex?: number
}>(), { colorIndex: 0 })

const emit = defineEmits<{ click: [] }>()

const background = computed(() => config.peerColors[props.colorIndex] ?? 'transparent')
</script>
