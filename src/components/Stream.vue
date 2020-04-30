<template>
  <video
    autoplay
    :class="{
      'media': true,
      'media--orientation-landscape': this.orientation === 'landscape',
      'media--orientation-portrait': this.orientation === 'portrait',
      'media--orientation-unknown': this.orientation === 'unknown',
    }"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  />
</template>

<script>
import { attachMediaStream } from "@/webrtc"
// TODO stream becomes unready?

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
  data() {
    return {
      attached: false,
    }
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
  computed: {
    orientation() {
      if (!this.attached) {
        return 'unknown'
      }

      if (this.$el.videoWidth < this.$el.videoHeight) {
        return 'portrait'
      }

      return 'landscape'
    }
  },
  methods: {
    attachPeerStream() {
      attachMediaStream(this.$el, this.peer.getStream(), this.isMuted())
      this.attached = true
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
