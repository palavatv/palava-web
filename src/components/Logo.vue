<template>
  <div class="logo">
    <router-link :to="to">
      <inline-svg
        :alt="$t('palavaLogoAlt')"
        :src="require('../assets/palava.svg')"
        />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "/",
    }
  }
}
</script>
