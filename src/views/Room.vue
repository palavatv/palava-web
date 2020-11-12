<template>
  <div class="room">
    <transition name="fade">
      <ScreenMessage :message="screenMessage" v-if="screenMessage" />
    </transition>

    <transition name="fade">
      <InfoScreen
        v-if="infoScreenIsVisible"
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
      :chatMessages="chatMessages"
      @join-room="joinRoom"
      @open-info-screen="openInfoScreen"
      @send-chat-message="(message) => sendChatMessage(message)"
      />
  </div>
</template>

<script>
import { Session } from "palava-client"
import config from "@/config"
import logger from "@/logger"
import { fancyNumber } from "@/support"

import UserMediaConfigurator from "@/components/UserMediaConfigurator.vue"
import ScreenMessage from "@/components/ScreenMessage.vue"
import InfoScreen from "@/components/InfoScreen.vue"
import RoomError from "@/components/RoomError.vue"
import Party from "@/components/Party.vue"

import enteringKnock from "../assets/sounds/entering-room-knock.mp3"
import leavingBirds from "../assets/sounds/leaving-room-bird.mp3"

export default {
  components: {
    ScreenMessage,
    InfoScreen,
  },
  data() {
    return {
      uiState: [UserMediaConfigurator, {}],
      screenMessage: null,
      peers: [],
      localPeer: null,
      infoPage: null,
      signalingState: 'initial', // --> connected, reconnect_scheduled, trying_to_reconnect
      joinSound: new Audio(enteringKnock),
      leavingSound: new Audio(leavingBirds),
      chatMessages: [],
      peerChats: [],
    }
  },
  created() {
    const roomId = this.$route.params.roomId
    this.catchInvalidRoomId(roomId)

    const sessionConfig = {
      roomId,
      webSocketAddress: config.env.rtcUrl || config.defaultRtcUrl,
      stun: config.env.stunUrl || config.defaultStunUrl,
      joinTimeout: config.defaultJoinTimeout,
      filterIceCandidateTypes: config.filterIceCandidateTypes,
      dataChannels: { chat: {} },
    }

    if (config.env.turnUrls) {
      sessionConfig.turnUrls = config.env.turnUrls
    }

    this.rtc = this.setupRtc(new Session(sessionConfig))
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
    infoScreenIsVisible() {
      return !!this.infoPage
    }
  },
  methods: {
    catchInvalidRoomId(roomId) {
      if (window && roomId.length > 50) {
        this.$router.replace({ path: roomId.substr(0, 50) })
      }
    },
    updateUiState(component, props = {}) {
      this.screenMessage = null
      this.uiState = [component, props]
    },
    setupRtc(rtc) {
      rtc.on("webrtc_no_support", () => {
        logger.error("webrtc not supported")
        if (this.$route.params.supported === "1") { return }
        this.$router.push({ path: "/", query: { supported: "0" } })
      })

      rtc.on("signaling_not_reachable", () => {
        logger.error("signaling server not reachable")
        this.reconnectRtcWhenOnLine()
      })

      rtc.on("signaling_error", (errorType, error) => {
        logger.error("signaling error", errorType, error)
        if(errorType === "socket" || errorType === "missing_pongs") {
          this.reconnectRtcWhenOnLine()
        }
      })

      rtc.on("signaling_shutdown", (seconds) => {
        logger.warn(`Sorry, your connection will be reset in ${seconds} seconds!`)
        this.updateUiState(RoomError, { error: "maintenance" })
      })

      rtc.on("local_stream_error", (error) => {
        logger.error("local stream error", error)
        this.updateUiState(UserMediaConfigurator, { error: "local_stream_error" })
      })

      rtc.on("local_stream_ready", (stream) => {
        logger.log("local stream ready", stream)
      })

      rtc.on("room_join_error", () => {
        logger.error("room join error (timeout)")
        this.updateUiState(RoomError, { error: "connection_error" })
      })

      rtc.on("room_full", () => {
        logger.error("room full")
        this.updateUiState(RoomError, { error: "room_full" })
      })

      rtc.on("room_joined", (room) => {
        logger.log(`room joined with ${room.getRemotePeers().length} other peers`)
        this.signalingState = 'connected'

        const peers = this.rtc.room.getAllPeers()

        if (peers.length > config.maximumPeers) {
          this.rtc.destroy()
          this.updateUiState(RoomError, { error: "room_full" })
          return
        }

        this.peers = peers
        this.localPeer = this.rtc.room.getLocalPeer()
        this.updateUiState(Party)
      })

      rtc.on("peer_joined", (peer) => {
        logger.log("peer joined", peer)
        this.joinSound.play()
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
        this.leavingSound.play()
        this.peers = this.rtc.room.getAllPeers()
      })

      rtc.on("session_reconnect", () => {
        logger.log("trying to reconnect and rejoin room")
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

      rtc.on("peer_channel_ready", (_peer, name, channel) => {
        if (name !== "chat") return

        channel.on('message', (message) => {
          this.chatMessages = [JSON.parse(message), ...this.chatMessages]
        })
        channel.on('close', () => {
          this.peerChats = this.peerChats.filter((peerChat) => peerChat === channel)
        })
        channel.on('error', (err) => {
          this.peerChats = this.peerChats.filter((peerChat) => peerChat === channel)
          logger.warn("Datachannel error", err)
        })

        this.peerChats.push(channel)
      })

      return rtc
    },
    joinRoom(userMediaConfig) {
      this.screenMessage = this.$t('room.waitingForUserMedia')

      this.rtc.connect({
        userMediaConfig,
      })
    },
    reconnectRtcWhenOnLine() {
      logger.log('scheduled reconnect when online')
      if (this.signalingState !== "initial" && this.signalingState !== "reconnect_scheduled") {
        this.screenMessage = this.$t('room.waitingForRoomServer')
        this.signalingState = "reconnect_scheduled"
        window.addEventListener('online', this.onlineEventListener)
        if (navigator.onLine) window.dispatchEvent(new Event('online'))
      } else {
        this.updateUiState(RoomError, { error: "connection_error" })
      }
    },
    onlineEventListener() {
      logger.log('now online, trying to reconnect')
      window.removeEventListener('online', this.onlineEventListener)

      if (this.signalingState === "reconnect_scheduled") {
        this.signalingState = "trying_to_reconnect"
        this.rtc.reconnect()
      } else if(this.signalingState === "trying_to_reconnect") {
        setTimeout(this.rtc.reconnect, config.reconnectTimeout)
      }
    },
    sendChatMessage(message) {
      this.chatMessages = [message, ...this.chatMessages]
      this.peerChats.forEach((peerChat) => {
        peerChat.send(JSON.stringify(message))
      })
      if (this.peerChats.length === 0) {
        const errorMsg = { from: 'error', msg: this.$t('chat.error'), time: (new Date()).getTime() }
        this.chatMessages = [errorMsg, ...this.chatMessages]
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
