<template>
  <div class="room">
    <transition name="fade">
      <ScreenMessage :message="screenMessage" v-if="screenMessage" />
    </transition>

    <transition name="fade">
      <InfoScreenOverlay
        v-if="infoPage"
        :page="infoPage"
        @close="infoPage = null"
        @open-info-screen="(page) => infoPage = page"
      />
    </transition>

    <component
      :is="uiStateComponent"
      v-bind="uiStateProps"
      :peers="peers"
      :localPeer="localPeer"
      @join-room="joinRoom"
      @open-info-screen="(page: string) => infoPage = page"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watchEffect, type Component, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Session, type Peer, type LocalPeer as LocalPeerType } from '@palava/client'
import config from '@/config'
import logger from '@/utils/logger'
import { fancyNumber } from '@/utils/support'

import UserMediaConfigurator from '@/components/UserMediaConfigurator.vue'
import ScreenMessage from '@/components/ScreenMessage.vue'
import InfoScreenOverlay from '@/components/InfoScreenOverlay.vue'
import RoomError from '@/components/RoomError.vue'
import PartyPanel from '@/components/PartyPanel.vue'

import enteringKnockUrl from '@/assets/sounds/entering-room-knock.mp3'
import leavingBirdsUrl from '@/assets/sounds/leaving-room-bird.mp3'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const uiStateComponent = ref<Component>(markRaw(UserMediaConfigurator))
const uiStateProps = ref<Record<string, unknown>>({})
const screenMessage = ref<string | null>(null)
const peers = ref<Peer[]>([])
const localPeer = ref<LocalPeerType | null>(null)
const infoPage = ref<string | null>(null)
let signalingState: 'initial' | 'connected' | 'reconnect_scheduled' | 'trying_to_reconnect' = 'initial'

const joinSound = new Audio(enteringKnockUrl)
const leavingSound = new Audio(leavingBirdsUrl)

const roomId = computed(() => route.params.roomId as string)

// Truncate room id
if (roomId.value && roomId.value.length > 50) {
  router.replace({ path: roomId.value.substring(0, 50) })
}

// Set page title reactively
watchEffect(() => {
  const peerCount = peers.value.length
  const emoji = fancyNumber(peerCount) || t('room.emptyTitle')
  const decoded = decodeURIComponent(roomId.value ?? '')
  document.title = `palava.tv | ${emoji} | ${decoded}`
})

function updateUiState(component: Component, props: Record<string, unknown> = {}) {
  screenMessage.value = null
  uiStateComponent.value = markRaw(component)
  uiStateProps.value = props
}

// Build session config
const sessionConfig = {
  roomId: roomId.value,
  webSocketAddress: config.env.rtcUrl || config.defaultRtcUrl,
  stun: config.env.stunUrl || config.defaultStunUrl,
  joinTimeout: config.defaultJoinTimeout,
  filterIceCandidateTypes: config.env.filterIceCandidateTypes,
  turnUrls: config.env.turnUrls,
}

const rtc = new Session(sessionConfig)

// Wire up RTC events
rtc.on('webrtc_no_support', () => {
  logger.error('webrtc not supported')
  if (route.query.supported === '1') return
  router.push({ path: '/', query: { supported: '0' } })
})

rtc.on('signaling_not_reachable', () => {
  logger.error('signaling server not reachable')
  reconnectRtcWhenOnLine()
})

rtc.on('signaling_error', (errorType, error) => {
  logger.error('signaling error', errorType, error)
  if (errorType === 'socket' || errorType === 'missing_pongs') {
    reconnectRtcWhenOnLine()
  }
})

rtc.on('signaling_shutdown', (seconds) => {
  logger.warn(`Sorry, your connection will be reset in ${seconds} seconds!`)
  updateUiState(RoomError, { error: 'maintenance' })
})

rtc.on('local_stream_error', (error) => {
  logger.error('local stream error', error)
  updateUiState(UserMediaConfigurator, { error: 'local_stream_error' })
})

rtc.on('local_stream_ready', (stream) => {
  logger.log('local stream ready', stream)
})

rtc.on('room_join_error', () => {
  logger.error('room join error (timeout)')
  updateUiState(RoomError, { error: 'connection_error' })
})

rtc.on('room_full', () => {
  logger.error('room full')
  updateUiState(RoomError, { error: 'room_full' })
})

rtc.on('room_joined', (room) => {
  logger.log(`room joined with ${room.getRemotePeers().length} other peers`)
  signalingState = 'connected'

  const allPeers = room.getAllPeers()
  if (allPeers.length > config.maximumPeers) {
    rtc.destroy()
    updateUiState(RoomError, { error: 'room_full' })
    return
  }

  peers.value = allPeers
  localPeer.value = room.getLocalPeer()
  updateUiState(PartyPanel)
})

rtc.on('peer_joined', (peer) => {
  logger.log('peer joined', peer)
  joinSound.play()
  if (rtc.room) peers.value = rtc.room.getAllPeers()
})

rtc.on('peer_stream_ready', (peer) => {
  logger.log('peer stream ready', peer)
})

rtc.on('peer_stream_removed', (peer) => {
  logger.log('peer stream removed', peer)
})

rtc.on('peer_left', (peer) => {
  logger.log('peer left', peer)
  leavingSound.play()
  if (rtc.room) peers.value = rtc.room.getAllPeers()
})

rtc.on('session_reconnect', () => {
  logger.log('trying to reconnect and rejoin room')
})

rtc.on('session_before_destroy', () => {
  logger.log('destroying rtc session')
})

rtc.on('peer_connection_pending', (peer) => {
  logger.log('peer connection pending', peer)
})

rtc.on('peer_connection_established', (peer) => {
  logger.log('peer connection established', peer)
})

rtc.on('peer_connection_disconnected', (peer) => {
  logger.warn('peer connection disconnected', peer)
})

rtc.on('peer_connection_closed', (peer) => {
  logger.warn('peer connection closed', peer)
})

rtc.on('peer_connection_failed', (peer) => {
  logger.error('peer connection failed', peer)
})

function joinRoom(userMediaConfig: MediaStreamConstraints) {
  screenMessage.value = t('room.waitingForUserMedia')
  rtc.connect({ userMediaConfig })
}

function onlineEventListener() {
  logger.log('now online, trying to reconnect')
  window.removeEventListener('online', onlineEventListener)

  if (signalingState === 'reconnect_scheduled') {
    signalingState = 'trying_to_reconnect'
    rtc.reconnect()
  } else if (signalingState === 'trying_to_reconnect') {
    setTimeout(() => rtc.reconnect(), config.reconnectTimeout)
  }
}

function reconnectRtcWhenOnLine() {
  logger.log('scheduled reconnect when online')
  if (signalingState !== 'initial' && signalingState !== 'reconnect_scheduled') {
    screenMessage.value = t('room.waitingForRoomServer')
    signalingState = 'reconnect_scheduled'
    window.addEventListener('online', onlineEventListener)
    if (navigator.onLine) window.dispatchEvent(new Event('online'))
  } else {
    updateUiState(RoomError, { error: 'connection_error' })
  }
}

onBeforeUnmount(() => {
  rtc.destroy()
  window.removeEventListener('online', onlineEventListener)
})
</script>

<style lang="scss">
.room {
  height: 100%;
}
</style>
