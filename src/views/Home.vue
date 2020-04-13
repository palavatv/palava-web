<template>
  <div class="home">
    <GithubRibbon />
    <img alt="palava papagei" src="@/assets/palava.svg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ $t("home.go") }}

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import GithubRibbon from '@/components/GithubRibbon.vue'

export default {
  components: {
    HelloWorld,
    GithubRibbon,
  },
}
</script>
