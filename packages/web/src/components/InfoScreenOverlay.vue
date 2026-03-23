<template>
  <aside class="info-screen" tabindex="0" @keydown.esc="emit('close')">
    <LanguageSwitcher class="info-screen__language-switcher" />
    <button class="close" @click="emit('close')">
      <CrossIcon :aria-label="t('closeAlt')" />
    </button>

    <NavigationBar
      type="screen"
      @open-info-screen="(page) => emit('open-info-screen', page)"
    />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="info-content" v-html="infoPage.content" />
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationBar from '@/components/NavigationBar.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import CrossIcon from '@/assets/icons/cross.svg?component'
import en from '@/i18n/en'
import de from '@/i18n/de'

const props = defineProps<{ page: string }>()
const emit = defineEmits<{
  close: []
  'open-info-screen': [page: string]
}>()

const { t, locale } = useI18n()
const messages: Record<string, typeof en> = { en, de }

const el = ref<HTMLElement>()

const infoPage = computed(() => {
  const msgs = messages[locale.value] ?? en
  return msgs.infoPages.find((ip) => ip.id === props.page) ?? { id: '', title: '', content: '' }
})

onMounted(() => {
  if (props.page) el.value?.focus()
})

watch(() => props.page, (newPage) => {
  if (newPage) el.value?.focus()
})
</script>

<style lang="scss">
/* See InfoPageView.vue for main styling */
.info-screen {
  position: fixed;
  z-index: 700;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;
  @media (min-width: $mobile-plus) {
    & {
      left: $medium-spacing;
      top: $large-control-size * 2;
      max-width: calc(100% - #{$medium-spacing * 2});
      bottom: $medium-spacing;
      opacity: 0.92;
    }
  }

  @media (min-width: $desktop) { width: $desktop; }
  @media (min-width: $desktop-large) { width: $desktop-plus; }

  @include defaultShadow();
  outline: none;
  overflow: auto;

  .info-screen__language-switcher {
    position: absolute;
    top: $small-plus-spacing;
    right: 48px;
  }

  .close {
    @include inlineButton();
    @include closeButton(36px);
  }

  .navigation {
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
