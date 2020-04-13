<template>
  <div class="home">
    <img alt="palava papagei" src="@/assets/palava.svg" @click="$refs.roomInput.focus()">

    <form @submit.prevent="goIntoRoom">
      <br />
      <input
        v-model="roomId"
        placeholder="Enter room id"
        ref="roomInput"
        autofocus
        />
      <button type="submit">{{ $t("home.go") }}</button>
      <br />
      <br />
      <button type="button" @click="goIntoHiddenRoom">{{ $t("home.hiddenRoom") }}</button>
    </form>
  </div>
</template>

<script>
import { uuid } from '@/support'

export default {
  data() {
    return {
      roomId: '',
    }
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
