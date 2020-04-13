<template>
  <div class="home">
    <img alt="palava papagei" src="@/assets/palava.svg">

    <form @submit.prevent="goIntoRoom">
      <br />
      <input
        v-model="roomId"
        placeholder="Enter room id"
        autofocus
        />
      <button type="submit">{{ $t("home.go") }}</button>
      <br />
      <br />
      <a href="javascript:void(0)" @click.prevent="goIntoHiddenRoom">{{ $t("home.hiddenRoom") }}</a>
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
