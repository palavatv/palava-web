<template>
  <main class="room">
    TODO
  </main>
</template>

<script>
// import config from "~/config"

export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  metaInfo() {
    return {
      title: `${this.$t('titles.room')} | ${decodeURIComponent(this.$route.params.roomId)}`,
    }
  },
}
</script>
