<template>
  <select v-model="$root.$i18n.locale">
    <option v-for="locale in supportedLocales" :key="locale" :value="locale">{{ locale }}</option>
  </select>
</template>

<script>
import config from '@/config'

export default {
  computed: {
    supportedLocales() { return config.supportedLocales },
  },
}
</script>
