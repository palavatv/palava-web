<!-- TODO: poster -->

<template>
  <video
    autoplay
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  />
</template>

<script>
import { attachMediaStream } from "@/webrtc"
// TODO stream becomes unready?
// TODO register full-screen

// FIXME isMuted

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
    mute: {
      type: Boolean,
      default: false,
    },
    requestFullscreen: {
      type: String,
    },
  },
  mounted() {
    this.attachPeerStreamWhenReady()
  },
  beforeDestroy() {
    this.peer.off("stream_ready", this.attachPeerStreamHandler)
  },
  watch: {
    requestFullscreen() {
      this.$el.requestFullscreen()
    },
  },
  methods: {
    attachPeerStream() {
      attachMediaStream(this.$el, this.peer.getStream(), this.isMuted())
    },
    attachPeerStreamWhenReady() {
      this.attachPeerStreamHandler = this.attachPeerStream.bind(this)
      this.peer.on("stream_ready", this.attachPeerStreamHandler)

      if (this.peer.isReady()) {
        this.attachPeerStream()
      }
    },
    isMuted() {
      return this.peer.isMuted() || this.peer.isLocal() || this.mute
    },
  },
}
</script>

<style lang="scss" scoped>
video {
  background: transparent;
}
</style>
