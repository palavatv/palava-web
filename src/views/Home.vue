<template>
  <div class="home">
    <GithubRibbon />
    <img alt="palava papagei" src="@/assets/palava.svg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import GithubRibbon from '@/components/GithubRibbon.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    GithubRibbon,
  },
};
</script>
