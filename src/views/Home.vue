<template>
  <div class="home">
    <img alt="palava papagei" src="@/assets/palava.svg" @click="$refs.roomInput.focus()">

    <form v-if="browserCanUseWebrtc" @submit.prevent="goIntoRoom">
      <br />
      <input
        v-model="roomId"
        placeholder="Enter room id"
        ref="roomInput"
        maxlength="50"
        autofocus
        />
      <button type="submit">{{ $t("home.go") }}</button>
      <br />
      <br />
      <button type="button" @click="goIntoHiddenRoom">{{ $t("home.hiddenRoom") }}</button>
    </form>

    <div v-else>
      <strong>Sorry!</strong> Your web browser is not compatible with the latest technologies for video communication on the web. In order to use <router-link to="/info/how">palava.tv</router-link>, you will need to install a web browser that supports WebRTC.
    </div>
  </div>
</template>

<script>
import { uuid } from '@/support'
import { browserCanUseWebrtc } from '@/webrtc'

export default {
  data() {
    return {
      roomId: '',
    }
  },
  computed: {
    browserCanUseWebrtc,
  },
  methods: {
    goIntoRoom() {
      if (this.roomId) {
        this.$router.push({ path: encodeURIComponent(this.roomId) })
      } else {
        this.goIntoHiddenRoom()
      }
    },
    goIntoHiddenRoom() {
      this.$router.push({ path: uuid() })
    },
  },
  metaInfo() {
    return {
      titleTemplate: null,
    }
  },
}
</script>
