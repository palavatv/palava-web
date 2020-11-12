<template>
  <span class="avatar" :style="{background: peerColor}">
    {{peerAvatar}}
  </span>
</template>

<script>
import { generateColor, generateAvatar } from "@/support"

export default {
  props: {
    peerId: {
      type: String,
      required: true
    }
  },
  computed: {
    peerColor() {
      return generateColor(this.peerId)
    },
    peerAvatar() {
      return generateAvatar(this.peerId)
    }
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.avatar {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  border-radius: 50%;
  border: 0.1em solid black;
}
.peer-menu .avatar {
  font-size: 15pt;
}
.chat .avatar {
  height: 1.3em;
  width: 1.3em;
}
</style>
