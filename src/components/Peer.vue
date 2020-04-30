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
    'peer--has-media': peer.hasVideo(),
    'peer--has-no-video': !peer.hasVideo(),
    'peer--has-error': peer.hasError(),
    'peer--in-lobby': type === 'lobby',
    'peer--on-stage': type === 'stage',
    'peer--party-landscape': partyMode === 'landscape',
    'peer--party-portrait': partyMode === 'portrait',
    'peer--stage-landscape': stageMode === 'landscape',
    'peer--stage-portrait': stageMode === 'portrait',
  }"
  >
    <transition name="fade-control">
      <NetworkInfo
        v-if="networkInfoActive"
        @close="hideNetworkInfo()"
        :peer="peer"
        />
    </transition>
    <div class="frame">
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
      <nav :class="{
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
            v-if="peerMenuActive && !peer.isLocal()"
            @click="toggleNetworkInfo()"
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
      </nav>
    </div>
  </li>
</template>

<script>
import Stream from "@/components/Stream.vue"
import Placeholder from "@/components/Placeholder.vue"
import NetworkInfo from "@/components/NetworkInfo.vue"

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
    partyMode: {
      type: String,
      required: true,
    },
    stageMode: {
      type: String,
      required: true,
    },
  },
  components: {
    Placeholder,
    Stream,
    NetworkInfo,
  },
  data() {
    return {
      muted: false,
      peerMenuActiveInLobby: true,
      requestFullscreen: null,
      networkInfoActive: false,
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
      this.$emit('togglePeer')
    },
    makePeerFullScreen() {
      this.requestFullscreen = uuid()
    },
    toggleMute() {
      this.muted = !this.muted
    },
    toggleNetworkInfo() {
      this.networkInfoActive = !this.networkInfoActive
    },
    hideNetworkInfo() {
      this.networkInfoActive = false
    },
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

.peer {
  font-size: 0;
  opacity: 1;
  @include fadeControl();

  .frame {
    position: relative;
    display: inline;
  }

  &--is-local {
    video {
      transform: scale(-1, 1);
    }
  }

  &--on-stage {
    background: transparent;
    margin: 5px;
    .media {
      border-radius: 24px;
      background: black;
    }
  }

  &--on-stage.peer--stage-landscape {
    // height: 100%;
    // width: auto;
    // max-width: 100%;
    // .media {
    //   height: 100%;
    //   width: auto;
    //   max-width: 100%;
    // }
  }

  &--on-stage.peer--stage-portrait {
    // height: auto;
    // width: 100%;
    // max-height: 100%;
    // .media {
    //   height: auto;
    //   width: 100%;
    //   max-height: 100%;
    // }
  }

  &--in-lobby {
    background: transparent;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    .media {
      border-radius: 14px;
      background: black;
    }
  }

  &--in-lobby.peer--party-landscape {
    border-right: 5px solid transparent;
    &:last-child {
      border-bottom: 5px solid transparent;
    }
    .media {
      width: 100%;
      height: auto;
    }
  }
  &--in-lobby.peer--party-portrait {
    border-bottom: 5px solid transparent;
    &:last-child {
      border-right: 5px solid transparent;
    }
    .media {
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
  left: 0px;
  right: 0px;
  @include fadeControl();

  &--in-lobby {
    bottom: $lobby-control-size / 5;
    .menu-control {
      height: $lobby-control-size;
      width: $lobby-control-size;
      font-size: $lobby-control-size / 2;
      margin: auto $lobby-control-size / 6;
      // box-shadow: 0 0 0 1px $action-1;

      &--toggle > * {
        transform: translate(-1px, 1px);
      }

      &--full-screen > * {
        transform: translate(0px, -3px);
      }

      &--network-info > * {
        transform: translate(-1px, 1px);
      }

      &--mute > * {
        transform: translate(-1px, 1px);
      }

      &--unmute > * {
        transform: translate(-5px, 1px);
      }
    }
  }

  &--on-stage {
    bottom: $control-size / 5;
    .menu-control {
      height: $control-size;
      width: $control-size;
      font-size: $control-size / 2;
      margin: auto $control-size / 5;

      &--toggle > * {
        transform: translate(-1px, 2px);
      }

      &--full-screen > * {
        transform: translate(-1px, -4px);
      }

      &--network-info > * {
        transform: translate(0px, 2px);
      }

      &--mute > * {
        transform: translate(-1px, 3px);
      }

      &--unmute > * {
        transform: translate(-5px, 3px);
      }
    }
  }

  .menu-control {
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    opacity: 0.6;
    user-select: none;
    border: 1px solid $action-1;
    box-sizing: border-box;
    color: $action-1;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansSymbols2;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px white;
    }
  }
}

</style>
