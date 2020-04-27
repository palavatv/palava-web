<template>
  <li :class="{
    'peer': true,
    'peer--is-local': peer.isLocal(),
    'peer--is-remote': !peer.isLocal(),
    'peer--is-ready': peer.isReady(),
    'peer--not-ready': !peer.isReady(),
    'peer--has-audio': !peer.hasAudio(),
    'peer--has-no-audio': !peer.hasAudio(),
    'peer--text-only': !peer.hasAudio() && !peer.hasVideo(),
    'peer--muted-by-user': mute,
    'peer--has-video': peer.hasVideo(),
    'peer--has-no-video': !peer.hasVideo(),
    'peer--has-error': peer.hasError(),
    'peer--in-lobby': type === 'lobby',
    'peer--on-stage': type === 'stage',
    'peer--landscape': mode === 'landscape',
    'peer--portrait': mode === 'portrait',
  }"
    @dblclick="$emit('togglePeer')"
  >
    <Placeholder v-if="showPlacholder" :peer="peer" />
    <Stream v-else :peer="peer" />
  </li>
</template>

<script>
import Stream from "@/components/Stream.vue"
import Placeholder from "@/components/Placeholder.vue"

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  components: {
    Placeholder,
    Stream,
  },
  data() {
    return {
      mute: false,
    }
  },
  computed: {
    showPlacholder() {
      return !this.peer.isReady() ||
             this.peer.error ||
             !this.peer.hasVideo()
    },
  },
}
</script>

<style lang="scss">
.peer {
  font-size: 0;

  &--is-local {
    video {
      transform: scale(-1, 1);
    }
  }

  &--on-stage {
    &:not(:first-child) {
      margin-top: 2px;
      margin-left: 2px;
    }
    &:not(:last-child) {
      border-right: 2px solid black;
      border-bottom: 2px solid black;
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &--in-lobby {
    cursor: pointer;
    video {
      display: inline-block;
    }
  }

  &--in-lobby.peer--landscape {
    video {
      width: 100%;
      height: auto;
    }
  }
  &--in-lobby.peer--portrait {
    video {
      height: 100%;
      width: auto;
    }
  }
}
</style>
