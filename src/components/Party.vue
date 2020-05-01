<template>
  <main :class="{
    'party': true,
    'party--landscape': partyMode === 'landscape',
    'party--portrait': partyMode === 'portrait',
  }">
    <nav class="top-control">
      <button
        title="Toggle controls"
        :class="{
          'logo-control': true,
          'logo-control--active': controlsActive,
          'logo-control--inactive': !controlsActive,
          }"
        @click="toggleControls"
        >
        <img
          alt="palava.tv logo, click here to toggle controls"
          src="@/assets/palava.svg"
          />
      </button>

      <transition name="fade-control">
        <button
          title="Copy link"
          class="control control--copy-link"
          @click="copyShareLink"
          ref="copyLink"
          v-if="controlsActive && canUseClipboard">
          <span role="img" aria-label="clipboard">📋︎</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button title="Camera" class="control control--camera" v-if="controlsActive">
          <span role="img" aria-label="camera">📷︎</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button title="Microphone" class="control control--microphone" v-if="controlsActive">
          <span role="img" aria-label="microphone">🎙︎</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button title="Screen sharing" class="control control--screen-share" v-if="controlsActive">
          <span role="img" aria-label="computer">🖳</span>
        </button>
      </transition>

      <transition name="fade-control">
        <button title="Text chat" class="control control--text-chat" v-if="controlsActive">
          <span role="img" aria-label="speech bubbles">🗪</span>
        </button>
      </transition>

      <transition name="fade-control">
        <router-link to="/" title="Hang up" class="control control--hang-up" v-if="controlsActive">
          <span role="img" aria-label="cross mark">❌︎</span>
        </router-link>
      </transition>
    </nav>

    <div
      :class="{
        'stage': true,
        'stage--landscape': stageMode === 'landscape',
        'stage--portrait': stageMode === 'portrait',
      }"
      ref="stage"
      >
      <transition-group name="fade-control" tag="ul"
        :class="{
          'spotlight': true,
          'spotlight--empty': stagePeers.length === 0,
          'spotlight--one': stagePeers.length === 1,
          'spotlight--two': stagePeers.length === 2,
          'spotlight--three': stagePeers.length === 3,
          'spotlight--four': stagePeers.length === 4,
          'spotlight--five': stagePeers.length === 5,
          'spotlight--six': stagePeers.length === 6,
        }">
        <Peer v-for="peer in stagePeers"
          :key="peer.id"
          type="stage"
          :partyMode="partyMode"
          :stageMode="stageMode"
          :peer="peer"
          @togglePeer="togglePeer(peer)"
          />
      </transition-group>
    </div>

    <transition name="fade-control" @after-leave="onResize">
      <div class="lobby" v-if="lobbyPeers.length > 0">
        <transition-group name="fade-control" tag="ul" class="couch">
          <Peer v-for="peer in lobbyPeers"
            :key="peer.id"
            type="lobby"
            :partyMode="partyMode"
            :stageMode="stageMode"
            :peer="peer"
            @togglePeer="togglePeer(peer)"
            />
        </transition-group>
      </div>
    </transition>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

export default {
  props: ["peers", "localPeer"],
  data() {
    return {
      partyMode: "landscape",
      stageMode: "landscape",
      peersInLobby: [],
      controlsActive: true,
    }
  },
  components: {
    Peer,
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
    this.autoAdjustPeers(this.peers)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },
  watch: {
    peers(newPeers) {
      // TODO watch peer changes (clean lobby)
      this.autoAdjustPeers(newPeers)
    },
  },
  computed: {
    stagePeers() {
      return this.peers.filter((peer) => !this.peersInLobby.includes(peer.id))
    },
    lobbyPeers() {
      return this.peers.filter((peer) => this.peersInLobby.includes(peer.id))
    },
    shareLink() {
      return `${window.location.protocol}//${window.location.host}/${window.location.pathname}`
    },
    canUseClipboard() {
      return navigator.clipboard && navigator.clipboard.writeText
    },
  },
  methods: {
    togglePeer(peer) {
      if (this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = this.peersInLobby.filter((id) => id !== peer.id)
      } else {
        this.peersInLobby = [...this.peersInLobby, peer.id]
      }
    },
    sendPeerToLobby(peer) {
      if (!this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = [...this.peersInLobby, peer.id]
      }
    },
    sendPeerToStage(peer) {
      if (this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = this.peersInLobby.filter((id) => id !== peer.id)
      }
    },
    autoAdjustPeers(peers) {
      const remotePeers = peers.filter((peer) => !peer.isLocal())
      if (remotePeers.length === 1) {
        this.sendPeerToLobby(this.localPeer)
        this.sendPeerToStage(remotePeers[0])
      }
    },
    toggleControls() {
      this.controlsActive = !this.controlsActive
    },
    copyShareLink() {
      navigator.clipboard.writeText(this.shareLink)
      this.$refs.copyLink.blur()
    },
    onResize() {
      const partyWidth = window.innerWidth
      const partyHeight = window.innerHeight
      const stageWidth = this.$refs.stage.clientWidth
      const stageHeight = this.$refs.stage.clientHeight

      if (this.partyMode === "landscape" && partyWidth < partyHeight) {
        this.partyMode = "portrait"
      } else if (this.partyMode === "portrait" && partyWidth >= partyHeight) {
        this.partyMode = "landscape"
      }

      if (this.stageMode === "landscape" && stageWidth < stageHeight) {
        this.stageMode = "portrait"
      } else if (this.stageMode === "portrait" && stageWidth >= stageHeight) {
        this.stageMode = "landscape"
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

.top-control {
  position: absolute;
  z-index: 1000;
  top: 15px;
  display: flex;
  align-items: center;

  .logo-control, .control {
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    margin-left: $control-size / 3;
    user-select: none;
  }

  .logo-control {
    border: 0;
    height: $logo-control-height;
    width: $logo-control-height;
    img {
      height: 100%;
      width: 100%;
    }
    // &--inactive {
    //   opacity: 0.4;
    // }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px white;
    }
  }

  .control {
    height: $control-size;
    width: $control-size;
    border: 1px solid $action-1;
    box-sizing: border-box;
    color : $action-1;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansSymbols2;
    font-size: $control-size / 2;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px white;
    }
    > * {
      display: inline-block;
    }
    &--copy-link > * {
      transform: translate(-1px, 2px);
    }
    &--camera > * {
      transform: translate(-1px, 2px);
    }
    &--microphone > * {
      transform: translate(-2px, 2px);
    }
    &--screen-share > * {
      transform: translate(0, 1px);
    }
    &--text-chat > * {
      transform: translate(-1px, 2px);
    }
    &--hang-up > * {
      transform: translate(-1px, 2px);
    }
  }

  @include fadeControl();
}

.party {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 250px;
  min-width: 500px;
  overflow: auto;
  background: black;
  display: flex;
  @include fadeControl();

  &--landscape {
    flex-direction: row;
    .lobby ~ .stage {
      height: 100%;
      width: calc(100% - #{$lobby-width});
    }
    .lobby {
      height: 100%;
      width: $lobby-width;
    }
  }
  &--portrait {
    flex-direction: column;
    .lobby ~ .stage {
      height: calc(100% - #{$lobby-height});
      width: 100%;
    }
    .lobby {
      height: $lobby-height;
      width: 100%;
    }
  }
}

.stage {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: black;

  display: flex;
  justify-content: center;
  align-items: center;
}

.lobby {
  overflow: hidden;
  background: #222;
  opacity: 1;
}

.couch {
  height: 100%;
  width: 100%;
  display: flex;
  .party--portrait & {
    flex-direction: row;
    overflow-x: auto;
  }
  .party--landscape & {
    flex-direction: column;
    overflow-y: auto;
  }
  // > * {
  // }
  @include fadeControl();
}
</style>
