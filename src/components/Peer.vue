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
    'peer--muted-by-user': muted,
    'peer--has-video': peer.hasVideo(),
    'peer--has-no-video': !peer.hasVideo(),
    'peer--has-error': peer.hasError(),
    'peer--in-lobby': type === 'lobby',
    'peer--on-stage': type === 'stage',
    'peer--landscape': mode === 'landscape',
    'peer--portrait': mode === 'portrait',
  }"
  >
    <aside :class="{
        'peer-menu': true,
        'peer-menu--in-lobby': type === 'lobby',
        'peer-menu--on-stage': type === 'stage',
      }"
      >
      <transition name="fade-control">
        <button
          title="Enlarge"
          class="menu-control menu-control--toggle"
          v-if="peerMenuActive && type === 'lobby'"
          @click="togglePeer()"
          >
          <span role="img" aria-label="arrow pointing upwards left">⇱</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button
          title="Minimize"
          class="menu-control menu-control--toggle"
          v-if="peerMenuActive && type === 'stage'"
          @click="togglePeer()"
          >
          <span role="img" aria-label="arrow pointing downards rights">⇲</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button
          title="Full screen"
          class="menu-control menu-control--full-screen"
          v-if="peerMenuActive"
          @click="makePeerFullScreen()"
          >
          <span role="img" aria-label="square of four corners">⛶</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button
          title="Network info"
          class="menu-control menu-control--network-info"
          v-if="peerMenuActive"
          @click="showNetworkInfo()"
          >
          <span role="img" aria-label="network of three computers">🖧</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button
          :title="muted ? 'Unmute' : 'Mute'"
          :class="{
            'menu-control': true,
            'menu-control--mute': !muted,
            'menu-control--unmute': muted,
          }"
          v-if="peerMenuActive && !peer.isLocal() && peer.hasAudio()"
          @click="toggleMute()"
          >
          <span v-if="muted" role="img" aria-label="speaker without noise">🔈︎</span>
          <span v-else role="img" aria-label="speaker with noise">🔊︎</span>
        </button>
      </transition>
    </aside>

    <Placeholder
      v-if="showPlacholder"
      :peer="peer"
      @click="togglePeerMenu()"
      />
    <Stream
      v-else
      :peer="peer"
      :requestFullscreen="requestFullscreen"
      @click="togglePeerMenu()"
      />
  </li>
</template>

<script>
import Stream from "@/components/Stream.vue"
import Placeholder from "@/components/Placeholder.vue"

import { uuid } from "@/support"

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
      muted: false,
      peerMenuActiveInLobby: false,
      requestFullscreen: null,
    }
  },
  computed: {
    peerMenuActive() {
      return this.type === "stage" || this.peerMenuActiveInLobby
    },
    showPlacholder() {
      return !this.peer.isReady() ||
             this.peer.error ||
             !this.peer.hasVideo()
    },
  },
  methods: {
    togglePeerMenu() {
      this.peerMenuActiveInLobby = !this.peerMenuActiveInLobby
    },
    togglePeer() {
      this.peerMenuActiveInLobby = false
      this.$emit('togglePeer')
    },
    makePeerFullScreen() {
      this.peerMenuActiveInLobby = false
      this.requestFullscreen = uuid()
    },
    toggleMute() {
      this.muted = !this.muted
    },
    showNetworkInfo() {
      alert(`peer is ${this.peer.isLocal() ? 'local' : 'remote'}`)
    },
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

.peer {
  font-size: 0;

  &--is-local {
    video {
      transform: scale(-1, 1);
    }
  }

  &--on-stage {
    position: relative;

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

.peer-menu {
  position: absolute;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;

  &--in-lobby {
    right: $lobby-width; // TODO
    margin-top: 15px;
  }

  &--on-stage {
    bottom: 15px;
    left: 0px;
    right: 0px;
  }

  .menu-control {
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    opacity: 0.6;
    margin-right: 15px;
    user-select: none;
    height: $controls-height;
    width: $controls-height;
    border: 1px solid $action-1;
    box-sizing: border-box;
    color : $action-1;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansSymbols2;
    font-size: 20px;
    transition: opacity .5s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px white;
    }

    > * {
      display: inline-block;
    }

    &--toggle > * {
      transform: translate(0px, 2px);
    }

    &--full-screen > * {
      transform: translate(-1px, -4px);
    }

    &--network-info > * {
      transform: translate(-1px, 2px);
    }

    &--mute > * {
      transform: translate(-1px, 2px);
    }

    &--unmute > * {
      transform: translate(-5px, 2px);
    }
  }

  .fade-control-enter-active {
    transition: opacity 0.4s ease;
  }

  .fade-control-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-control-enter, .fade-control-leave-to {
    opacity: 0;
  }
}

</style>
