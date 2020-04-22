<!-- TODO: poster -->

<template>
  <video
    ref="stream"
    autoplay
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
  },
  mounted() {
    this.attachPeerStreamWhenReady()
  },
  beforeDestroy() {
    this.peer.off("stream_ready", this.attachPeerStreamHandler)
  },
  methods: {
    attachPeerStream() {
      attachMediaStream(this.$refs.stream, this.peer.getStream(), this.isMuted())
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
