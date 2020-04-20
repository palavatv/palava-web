<template>
  <main class="building">
    <component
      :is="uiStateComponent"
      v-bind="uiStateProps"
      @join-room="joinRoom"
      />
  </main>
</template>

<script>
import config from "@/config"
import logger from "@/logger"
import { createSession, createIdentity } from "@/webrtc"

import UserMediaConfigurator from "@/components/UserMediaConfigurator.vue"
import WaitingForUserMedia from "@/components/WaitingForUserMedia.vue"
import ConnectionError from "@/components/ConnectionError.vue"
import RoomFullError from "@/components/RoomFullError.vue"
import Party from "@/components/Party.vue"

export default {
  data() {
    return {
      uiState: [UserMediaConfigurator, {}],
      peers: [],
      // rtc: null,
    }
  },
  created() {
    const roomId = this.$route.params.roomId
    this.catchInvalidRoomId(roomId)
    this.rtc = this.setupRtc(createSession(roomId, config.env.rtcUrl || config.detaultRtcUrl))
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
        this.uiState = [ConnectionError]
      })

      rtc.on("signaling_error", (error) => {
        logger.error("signaling error", error)
        // TODO UX?
      })

      // rtc.on("signaling_shutdown", (seconds) => {
      //   logger.warn("Sorry, your connection will be reset in " + seconds + " seconds!")
      //   this.uiState = "maintenance"
      // })

      rtc.on("local_stream_error", (error) => {
        logger.log("local stream error", error)
        this.uiState = [UserMediaConfigurator, { error: "local_stream_error" }]
      })

      rtc.on("room_join_error", () => {
        logger.error("room not joinable (connection error)")
        this.uiState = [ConnectionError]
      })

      rtc.on("room_full", () => {
        logger.error("room not joinable (full)")
        this.uiState = [RoomFullError]
      })

      rtc.on("local_stream_ready", (stream) => {
        logger.log("local stream ready", stream)
        this.uiState = [Party]
        rtc.room.join()
      })

      rtc.on("room_joined", (room) => {
        logger.log(`room joined with ${room.getRemotePeers().length} other peers`)
        // this.checkPeers()
      })

      rtc.on("peer_joined", (peer) => {
        logger.log("peer joined", peer)
      })

      rtc.on("peer_stream_ready", (peer) => {
        logger.log("peer stream ready", peer)
        // this.checkPeers()
        // this.checkStage()
      })

      // rtc.on("peer_update", (peer) => {
      //   logger.log("peer updated status", peer)
      // })

      rtc.on("peer_stream_removed", (peer) => {
        logger.log("peer stream removed", peer)
        // this.checkStage()
      })

      rtc.on("peer_left", (peer) => {
        logger.log("peer left", peer)
        // this.checkStage()
        // this.checkPeers()
      })

      // rtc.on("session_before_destroy", () => {
      //   logger.log("destroying rtc session")
      // })

      // rtc.on("session_after_destroy", () => {
      //   $(".modal").modal("hide")
      //   $(".modal-backdrop").hide()
      // })

      return rtc
    },
    joinRoom(userMediaConfig) {
      this.uiState = [WaitingForUserMedia]
      // $("#share-link").focus()

      this.rtc.init({
        identity: createIdentity(userMediaConfig),
        options: {
          stun: config.env.stunUrl || config.defaultStunUrl,
          joinTimeout: config.defaultJoinTimeout,
        },
      })
    },
  },
  metaInfo() {
    return {
      title: `${this.$t("titles.room")} | ${decodeURIComponent(this.$route.params.roomId)}`,
    }
  },
}
</script>
