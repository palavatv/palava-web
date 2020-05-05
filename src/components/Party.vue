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
          :colorIndex="getColorIndex(peer)"
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
            :colorIndex="getColorIndex(peer)"
            @togglePeer="togglePeer(peer)"
            />
        </transition-group>
      </div>
    </transition>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

import config from '@/config'

export default {
  props: ["peers", "localPeer"],
  data() {
    return {
      partyMode: "landscape",
      stageMode: "landscape",
      peersInLobby: [],
      peerColors: Array(config.peerColors.length - 1).fill(null),
      controlsActive: true,
    }
  },
  components: {
    Peer,
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
    this.assignColorIndexes(this.peers)
    this.autoAdjustPeers(this.peers)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },
  watch: {
    peers(newPeers, oldPeers) {
      const introducedPeers = newPeers.filter((newPeer) => !oldPeers.includes(newPeer))
      const removedPeers = oldPeers.filter((oldPeer) => !newPeers.includes(oldPeer))
      this.cleanLobby(removedPeers)
      this.assignColorIndexes(introducedPeers, removedPeers)
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
    cleanLobby(removedPeers) {
      this.peersInLobby = this.peersInLobby.filter((id) => removedPeers.includes((rp) => rp.id === id))
    },
    getColorIndex(peer) {
      return this.peerColors.indexOf(peer.id) + 1
    },
    assignColorIndexes(introducedPeers, removedPeers = []) {
      // Remove old peers from color index list
      this.peerColors = this.peerColors.map((idOrNull) => {
        const removedPeersIds = removedPeers.map((rp) => rp.id)
        if (removedPeersIds.includes(idOrNull)) {
          return null
        }

        return idOrNull
      })

      // Assign random color index (which is not taken yet)
      introducedPeers.forEach((peer) => {
        if (!this.peerColors.includes(null)) { return }
        let newIndex = null
        do {
          newIndex = Math.floor(Math.random() * Math.floor(config.peerColors.length - 1))
        } while (this.peerColors[newIndex] !== null)
        this.peerColors = this.peerColors.map((idOrNull, index) => (index === newIndex ? peer.id : idOrNull))
      })
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
  top: $control-size / 3;
  display: flex;
  align-items: center;

  .logo-control, .control {
    margin-left: $control-size / 3;
  }

  .logo-control {
    border-radius: 50%;
    border: 0;
    padding: 0;
    opacity: 0.7;
    cursor: pointer;
    user-select: none;
    height: $logo-control-size;
    width: $logo-control-size;
    filter: grayscale(1);
    img {
      height: 100%;
      width: 100%;
    }
    // &--inactive {
    //   opacity: 0.4;
    // }

    &:focus {
      outline: none;
      filter: none;
      opacity: 0.9;
    }
  }

  .control {
    height: $control-size;
    width: $control-size;
    font-size: $control-size / 2;
    @include knob();

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
    .lobby {
      height: 100%;
    }

    .lobby, .lobby .peer {
      width: $lobby-width-mobile;
      @media (min-width: $mobile-plus)  { width: $lobby-width-mobile-plus; }
      @media (min-width: $desktop)      { width: $lobby-width-desktop; }
      @media (min-width: $desktop-plus) { width: $lobby-width-desktop-plus; }
      @media (min-width: $desktop-large){ width: $lobby-width-desktop-large; }
      @media (min-width: $desktop-huge) { width: $lobby-width-desktop-huge; }
    }
  }
  &--portrait {
    flex-direction: column;
    .lobby {
      width: 100%;
    }
    .lobby, .lobby .peer {
      height: $lobby-height-mobile;
      @media (min-height: $mobile-plus-height)   { height: $lobby-height-mobile-plus; }
      @media (min-height: $desktop-height)       { height: $lobby-height-desktop; }
      @media (min-height: $desktop-plus-height)  { height: $lobby-height-desktop-plus; }
      @media (min-height: $desktop-large-height) { height: $lobby-height-desktop-large; }
      @media (min-height: $desktop-huge-height)  { height: $lobby-height-desktop-huge; }
    }
  }
}

.stage {
  flex: 1;
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
  @include fadeControl();
}
</style>
