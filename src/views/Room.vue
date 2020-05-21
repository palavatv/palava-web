<template>
  <div class="room">
    <transition name="fade">
      <WaitingForUserMedia v-if="waiting" />
    </transition>

    <transition name="fade">
      <InfoScreen
        v-if="showInfoScreen"
        :page="infoPage"
        @close="closeInfoScreen"
        @open-info-screen="openInfoScreen"
        />
    </transition>

    <component
      :is="uiStateComponent"
      v-bind="uiStateProps"
      :peers="peers"
      :localPeer="localPeer"
      @join-room="joinRoom"
      @open-info-screen="openInfoScreen"
      />
  </div>
</template>

<script>
import config from "@/config"
import logger from "@/logger"
import { createSession, createIdentity } from "@/webrtc"
import { fancyNumber } from "@/support"

import UserMediaConfigurator from "@/components/UserMediaConfigurator.vue"
import WaitingForUserMedia from "@/components/WaitingForUserMedia.vue"
import InfoScreen from "@/components/InfoScreen.vue"
import RoomError from "@/components/RoomError.vue"
import Party from "@/components/Party.vue"

export default {
  components: {
    WaitingForUserMedia,
    InfoScreen,
  },
  data() {
    return {
      uiState: [UserMediaConfigurator, {}],
      waiting: false,
      peers: [],
      localPeer: null,
      infoPage: null,
      signalingConnectedBefore = false,
    }
  },
  created() {
    const roomId = this.$route.params.roomId
    this.catchInvalidRoomId(roomId)
    this.rtc = this.setupRtc(createSession(roomId, config.env.rtcUrl || config.defaultRtcUrl))
  },
  beforeDestroy() {
    this.rtc.destroy()
  },
  computed: {
    uiStateComponent() {
      return this.uiState[0]
    },
    uiStateProps() {
      return this.uiState[1]
    },
    showInfoScreen() {
      return this.uiState[0] === Party && !!this.infoPage
    }
  },
  methods: {
    catchInvalidRoomId(roomId) {
      if (window && roomId.length > 50) {
        this.$router.replace({ path: roomId.substr(0, 50) })
      }
    },
    setupRtc(rtc) {
      rtc.on("webrtc_no_support", () => {
        logger.error("webrtc not supported")
        if (this.$route.params.supported === "1") { return }
        this.$router.push({ path: "/", query: { supported: "0" } })
      })

      rtc.on("signaling_not_reachable", () => {
        logger.error("signaling server not reachable")
        reconnectRtc()
      })

      rtc.on("signaling_error", (error) => {
        logger.error("signaling error", error)
        reconnectRtc()
      })

      rtc.on("signaling_shutdown", (seconds) => {
        logger.warn(`Sorry, your connection will be reset in ${seconds} seconds!`)
        this.uiState = [RoomError, { error: "maintenance" }]
      })

      rtc.on("local_stream_error", (error) => {
        logger.error("local stream error", error)
        this.waiting = false
        this.uiState = [UserMediaConfigurator, { error: "local_stream_error" }]
      })

      rtc.on("local_stream_ready", (stream) => {
        logger.log("local stream ready", stream)
        rtc.room.join()
      })

      rtc.on("room_join_error", () => {
        logger.error("room join error")
        this.uiState = [RoomError, { error: "connection_error" }]
        this.waiting = false
      })

      rtc.on("room_full", () => {
        logger.error("room full")
        this.uiState = [RoomError, { error: "room_full" }]
        this.waiting = false
      })

      rtc.on("room_joined", (room) => {
        logger.log(`room joined with ${room.getRemotePeers().length} other peers`)
        const peers = this.rtc.room.getAllPeers()

        if (peers.length > config.maximumPeers) {
          this.uiState = [RoomError, { error: "room_full" }]
          this.waiting = false
          this.rtc.destroy()
          return
        }

        this.peers = peers
        this.localPeer = this.rtc.room.getLocalPeer()
        this.uiState = [Party]
        this.waiting = false
      })

      rtc.on("peer_joined", (peer) => {
        logger.log("peer joined", peer)
        this.peers = this.rtc.room.getAllPeers()
      })

      rtc.on("peer_stream_ready", (peer) => {
        logger.log("peer stream ready", peer)
      })

      // rtc.on("peer_update", (peer) => {
      //   logger.log("peer updated status", peer)
      // })

      rtc.on("peer_stream_removed", (peer) => {
        logger.log("peer stream removed", peer)
      })

      rtc.on("peer_left", (peer) => {
        logger.log("peer left", peer)
        this.peers = this.rtc.room.getAllPeers()
      })

      rtc.on("session_before_destroy", () => {
        logger.log("destroying rtc session")
      })

      // rtc.on("session_after_destroy", () => {
      //   logger.log("rtc session destroyed", peer)
      // })

      // CONNECTION STATUS

      rtc.on("peer_connection_pending", (peer) => {
        logger.log("peer connection pending", peer)
      })

      rtc.on("peer_connection_established", (peer) => {
        logger.log("peer connection established", peer)
      })

      rtc.on("peer_connection_disconnected", (peer) => {
        logger.warn("peer connection disconnected", peer)
      })

      rtc.on("peer_connection_closed", (peer) => {
        logger.warn("peer connection closed", peer)
      })

      rtc.on("peer_connection_failed", (peer) => {
        logger.error("peer connection failed", peer)
      })

      return rtc
    },
    joinRoom(userMediaConfig) {
      this.waiting = true

      this.rtc.init({
        identity: createIdentity(userMediaConfig),
        options: {
          stun: config.env.stunUrl || config.defaultStunUrl,
          joinTimeout: config.defaultJoinTimeout,
        },
      })
    },
    reconnectRtc() {
      if (this.signalingConnectedBefore) {
        // TODO: show "Palava server not reachable" or "Network not reachable" overlay
        if (navigator.online) {
          rtc.reconnect()
        } else {
          window.addEventListener('online',  function() {rtc.reconnect()});
        }
      } else {
        this.uiState = [RoomError, { error: "connection_error" }]
      }
    },
    closeInfoScreen() {
      this.infoPage = null
    },
    openInfoScreen(page) {
      this.infoPage = page
    }
  },
  metaInfo() {
    return {
      title: `${fancyNumber(this.peers.length) || this.$t("room.emptyTitle")} | ${decodeURIComponent(this.$route.params.roomId)}`,
    }
  },
}
</script>

<style lang="scss">
.room {
  height: 100%;
}
</style>
