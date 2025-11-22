<template>
  <video
    autoplay
    playsinline
    :class="{
      'media': this.status === 'video',
      'media--hidden': this.status !== 'video',
      'media--orientation-landscape': this.status === 'video' && this.orientation === 'landscape',
      'media--orientation-portrait': this.status === 'video' && this.orientation === 'portrait',
      'media--orientation-unknown': this.status === 'video' && this.orientation === 'unknown',
    }"
    @click="$emit('click')"
  />
</template>

<script>
import { attachMediaStream } from "@/webrtc"
// TODO stream becomes unready?

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    muted: {
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
    muted(newMuteStatus) {
      this.$el.muted = newMuteStatus
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
      return this.peer.isMuted() || this.peer.isLocal() || this.muted
    },
  },
}
</script>

<style lang="scss" scoped>
video {
  background: black;
}

.media--hidden {
  height: 0;
}
</style>
