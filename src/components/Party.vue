<template>
  <main :class="{
    'party': true,
    'party--landscape': mode === 'landscape',
    'party--portrait': mode === 'portrait',
  }">
    <nav class="top-control">
      <span class="home-link">
        <router-link to="/">
          <img
            alt="palava.tv logo, click here to get back to start page"
            src="@/assets/palava.svg"
            />
        </router-link>
      </span>
      <span class="share-link">
        {{ shareLink }}
      </span>
    </nav>
    <ul :class="{
      'stage': true,
      'stage--empty': peers.length === 0,
      'stage--one': peers.length === 1,
      'stage--two': peers.length === 2,
      'stage--three': peers.length === 3,
      'stage--four': peers.length === 4,
      'stage--five': peers.length === 5,
      'stage--six': peers.length === 6,
    }">
      <Peer v-for="peer in stagePeers"
      :key="peer.id"
      type="stage"
      :peer="peer"
      @togglePeer="togglePeer(peer.id)"
      />
    </ul>

    <div :class="{
      'lobby': true,
    }">
      <ul class="couch">
        <Peer v-for="peer in lobbyPeers"
          :key="peer.id"
          type="lobby"
          :peer="peer"
          @togglePeer="togglePeer(peer.id)"
          />
      </ul>
    </div>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

export default {
  props: ["peers"], // TODO peer prop update or move peers to party
  data() {
    return {
      mode: "landscape",
      peersInLobby: [],
    }
  },
  components: {
    Peer,
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },
  computed: {
    stagePeers() {
      return this.peers.filter((peer) => !this.peersInLobby.includes(peer.id))
    },
    lobbyPeers() {
      return this.peers.filter((peer) => this.peersInLobby.includes(peer.id))
    },
    shareLink() {
      if (!window) { return '' }
      return `${window.location.protocol}//${window.location.host}/${window.location.pathname}`
    },
  },
  methods: {
    togglePeer(peerId) {
      if (this.peersInLobby.includes(peerId)) {
        this.peersInLobby = this.peersInLobby.filter((id) => id !== peerId)
      } else {
        this.peersInLobby = [...this.peersInLobby, peerId]
      }
    },
    onResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      if (this.mode === "landscape" && width < height) {
        this.mode = "portrait"
      } else if (this.mode === "portrait" && width >= height) {
        this.mode = "landscape"
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

  /* debug start */
  top: 10px;
  left: 10px;
  /* debug end */

  .home-link {
    opacity: 0.6;
    img {
      height: 40px;
    }
  }

  .share-link {
    display: none;
    text-decoration: underline;
  }
}

.party {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
  display: flex;
  &--landscape {
    flex-direction: row;
    .stage {
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
    .stage {
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
  overflow: hidden;
  background: black;
  display: flex;
  > * {
    flex: 1;
  }
}

.lobby {
  overflow: hidden;
  background: #222;
}

.couch {
  height: 100%;
  width: 100%;
  display: flex;
  > * {
  }
}

</style>
