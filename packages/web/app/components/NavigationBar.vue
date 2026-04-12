<template>
  <nav
    :class="{
      navigation: true,
      'navigation--page': type === 'page',
      'navigation--screen': type === 'screen',
    }"
  >
    <ul>
      <li
        v-for="page in linkedInfoPages"
        :key="page.id"
      >
        <router-link
          v-if="type === 'page'"
          :to="`/info/${page.id}`"
        >
          {{ page.title }}
        </router-link>
        <a
          v-else
          href="#"
          @click.prevent="emit('open-info-screen', page.id)"
        >
          {{ page.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { tm, rt } = useI18n()

withDefaults(defineProps<{
  type?: 'page' | 'screen'
}>(), { type: 'page' })

const emit = defineEmits<{
  'open-info-screen': [page: string]
}>()

const linkedInfoPages = computed(() => {
  const pages = tm('infoPages') as any[]
  return pages
    .map(p => ({
      id: rt(p.id),
      title: rt(p.title),
      linked: p.linked !== undefined ? rt(p.linked) !== 'false' : true,
    }))
    .filter(p => p.linked)
})
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: center;
  padding: $small-spacing 0;
  border-top: 1px solid $gray;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $small-spacing $medium-spacing;
  }

  li a {
    @include subheadingFont();
    color: $action-1;

    &:hover {
      color: $action-2;
    }
  }
}
</style>
