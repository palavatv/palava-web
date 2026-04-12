<template>
  <InfoLayout>
    <NavigationBar />
    <div
      class="info-content"
      v-html="infoPage?.content || ''"
    />
  </InfoLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { tm, rt } = useI18n()

const pageId = computed(() => route.params.page as string)

const infoPage = computed(() => {
  const pages = tm('infoPages') as any[]
  return pages
    .map(p => ({
      ...p,
      id: rt(p.id),
      title: rt(p.title),
      content: rt(p.content),
    }))
    .find((ip: any) => ip.id === pageId.value) || {
      id: 'not-found',
      title: 'Not Found',
      content: '<h2>Not Found</h2><p>The page could not be found.</p>'
    }
})

useHead({
  title: computed(() => infoPage.value.title)
})
</script>
