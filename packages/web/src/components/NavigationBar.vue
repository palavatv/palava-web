<template>
  <nav class="navigation">
    <ul>
      <li v-for="infoPage in infoPages" :key="infoPage.id">
        <router-link :to="`/info/${infoPage.id}`">
          <span
            @click="checkScreen(infoPage.id, $event)"
            @keypress.enter="checkScreen(infoPage.id, $event)"
          >{{ infoPage.title }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import en from '@/i18n/en'
import de from '@/i18n/de'

const props = withDefaults(defineProps<{
  type?: string
}>(), { type: 'page' })

const emit = defineEmits<{
  'open-info-screen': [page: string]
}>()

const { locale } = useI18n()

const messages: Record<string, typeof en> = { en, de }

const infoPages = computed(() => {
  const msgs = messages[locale.value] ?? en
  return msgs.infoPages.filter((ip) => !('linked' in ip && ip.linked === false))
})

function checkScreen(infoPage: string, event: Event) {
  if (props.type === 'screen') {
    event.preventDefault()
    emit('open-info-screen', infoPage)
  }
}
</script>

<style lang="scss">
.navigation {
  border-bottom: 1px solid $background;
  margin-top: -$tiny-plus-spacing;
  padding-top: $medium-spacing - 1px;
  border-top: 1px solid $background;

  @media (min-width: $mobile-plus) {
    padding-top: 0;
    border-top: none;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    @media (min-width: $mobile-plus) {
      grid-template-rows: 1fr;
    }
  }

  li {
    padding-bottom: $medium-spacing - 1px;
    padding-right: $medium-spacing;
  }
  a, a span {
    display: block;
    height: 100%;
  }

  .router-link-active {
    color: $action-2;
  }
}
</style>
