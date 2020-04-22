<template>
  <li :class="{
    'peer': true,
    'peer--local': peer.isLocal(),
    'peer--remote': !peer.isLocal(),
    'peer--is-ready': peer.isReady(),
    'peer--not-ready': !peer.isReady(),
    'peer--has-audio': !peer.hasAudio(),
    'peer--has-no-audio': !peer.hasAudio(),
    'peer--text-only': !peer.hasAudio() && !peer.hasVideo(),
    'peer--muted-by-user': mute,
    // 'peer--has-video': !peer.hasVideo(),
    // 'peer--has-no-video': !peer.hasVideo(),
    'peer--has-error': !!peer.error,
  }">
    <Stream :peer="peer" />
  </li>
</template>

<script>
import Stream from "@/components/Stream.vue"

export default {
  props: ["peer"],
  components: {
    Stream,
  },
  data() {
    return {
      mute: false,
    }
  },
}
</script>
