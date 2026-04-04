<template>
  <aside
    ref="infoScreenEl"
    tabindex="0"
    class="info-screen"
    @keydown.esc="emit('close')"
  >
    <button
      type="button"
      class="close"
      @click="emit('close')"
    >
      <CrossIcon :aria-label="t('closeAlt')" role="img" />
    </button>
    <NavigationBar
      type="screen"
      @open-info-screen="(page) => emit('open-info-screen', page)"
    />
    <div
      class="info-content"
      v-html="infoPage?.content || ''"
    />
  </aside>
</template>

<script setup lang="ts">
import CrossIcon from '@/assets/icons/cross.svg?component'

const { t, tm, rt } = useI18n()

const props = defineProps<{
  page: string
}>()

const emit = defineEmits<{
  close: []
  'open-info-screen': [page: string]
}>()

const infoScreenEl = ref<HTMLElement>()

const infoPage = computed(() => {
  const pages = tm('infoPages') as any[]
  return pages
    .map(p => ({
      ...p,
      id: rt(p.id),
      title: rt(p.title),
      content: rt(p.content),
    }))
    .find((ip: any) => ip.id === props.page) || {}
})

onMounted(() => {
  if (props.page) {
    infoScreenEl.value?.focus()
  }
})

watch(() => props.page, (newPage) => {
  if (newPage) {
    infoScreenEl.value?.focus()
  }
})
</script>

<style lang="scss" scoped>
@use "@/css/info-shared" as *;

.info-screen {
  @include info-container();

  position: fixed;
  z-index: 700;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  outline: none;
  overflow: auto;

  @include defaultShadow();

  @media (min-width: $mobile-plus) {
    left: $medium-spacing;
    top: $large-control-size * 2;
    max-width: calc(100% - #{$medium-spacing * 2});
    bottom: $medium-spacing;
    opacity: 0.92;
  }

  @media (min-width: $desktop) {
    width: $desktop;
  }

  @media (min-width: $desktop-large) {
    width: $desktop-plus;
  }

  .close {
    @include inlineButton();
    @include closeButton(36px);
  }

  :deep(.navigation) {
    padding-top: 0;
    border-top: none;
    padding-right: 36px;
    width: 100%;
  }

  .info-content {
    padding-bottom: $medium-plus-spacing;
  }
}
</style>
