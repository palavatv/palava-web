<template>
  <div class="room">
    <transition name="fade">
      <ScreenMessage :message="screenMessage" v-if="screenMessage" />
    </transition>

    <transition name="fade">
      <InfoScreenOverlay
        v-if="infoScreenIsVisible"
        :page="infoPage"
        @close="closeInfoScreen"
        @open-info-screen="openInfoScreen"
      />
    </transition>

    <!-- Media configuration screen -->
    <UserMediaConfigurator
      v-if="roomState === 'configure'"
      :error="configError"
      @join-room="joinRoom"
      @open-info-screen="openInfoScreen"
    />

    <!-- Error screen -->
    <RoomError
      v-else-if="roomState === 'error'"
      :error="errorType"
    />

    <!-- Video call party -->
    <PartyPanel
      v-else-if="roomState === 'party'"
      :peers="peers"
      :local-peer="localPeer"
      :initial-video-enabled="initialVideoEnabled"
      :initial-audio-enabled="initialAudioEnabled"
      @open-info-screen="openInfoScreen"
    />
  </div>
</template>

<script setup lang="ts">
import { Session, Identity, type Peer, type LocalPeer } from '@palava/client'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const config = usePalavaConfig()
const logger = useLogger()

// Sounds
const enteringKnock = import.meta.client ? new Audio('/sounds/entering-room-knock.mp3') : null
const leavingBirds = import.meta.client ? new Audio('/sounds/leaving-room-bird.mp3') : null

// State
type RoomState = 'configure' | 'error' | 'party'
const roomState = ref<RoomState>('configure')
const configError = ref<string>()
const errorType = ref<string>()
const screenMessage = ref<string>()
const peers = ref<Peer[]>([])
const localPeer = ref<LocalPeer>()
const infoPage = ref<string>()
const soundsEnabled = ref(true)
const initialVideoEnabled = ref(true)
const initialAudioEnabled = ref(true)

let rtc: Session | null = null
let signalingState: 'initial' | 'connected' | 'reconnect_scheduled' | 'trying_to_reconnect' = 'initial'

// Computed
const infoScreenIsVisible = computed(() => !!infoPage.value)

const roomId = computed(() => (route.params.roomid as string).toLowerCase())

// Parrot emoji page title (ported from Pascal's fancyNumber)
function fancyNumber(n: number): string {
  return n > 0 ? '🦜'.repeat(n) : ''
}

useHead({
  title: computed(() => {
    const emoji = fancyNumber(peers.value.length) || t('room.emptyTitle')
    const decoded = decodeURIComponent(roomId.value ?? '')
    return `${emoji} | ${decoded}`
  })
})

// Redirect to lowercase URL if needed
function normalizeRoomIdInUrl() {
  const rawRoomId = route.params.roomid as string
  if (rawRoomId !== rawRoomId.toLowerCase()) {
    router.replace(`/${rawRoomId.toLowerCase()}`)
  }
}

function catchInvalidRoomId(id: string) {
  if (id.length > 50) {
    router.replace(`/${id.substring(0, 50)}`)
  }
}

// UI state transitions
function showConfigure(error: string | null = null) {
  screenMessage.value = null
  roomState.value = 'configure'
  configError.value = error
}

function showError(error: string) {
  screenMessage.value = null
  roomState.value = 'error'
  errorType.value = error
}

function showParty() {
  screenMessage.value = null
  roomState.value = 'party'
}

// RTC event setup
function setupRtc(rtcSession: Session) {
  rtcSession.on('webrtc_no_support', () => {
    logger.error('webrtc not supported')
    if (route.query.supported === '1') return
    router.push({ path: '/', query: { supported: '0' } })
  })

  rtcSession.on('signaling_not_reachable', () => {
    logger.error('signaling server not reachable')
    reconnectRtcWhenOnLine()
  })

  rtcSession.on('signaling_error', (errorType, error) => {
    logger.error('signaling error', errorType, error)
    if (errorType === 'socket' || errorType === 'missing_pongs') {
      reconnectRtcWhenOnLine()
    }
  })

  rtcSession.on('signaling_shutdown', (seconds) => {
    logger.warn(`Sorry, your connection will be reset in ${seconds} seconds!`)
    showError('maintenance')
  })

  rtcSession.on('local_stream_error', (error) => {
    logger.error('local stream error', error)
    showConfigure('local_stream_error')
  })

  rtcSession.on('local_stream_ready', (stream) => {
    logger.log('local stream ready', stream)
  })

  rtcSession.on('room_join_error', () => {
    logger.error('room join error (timeout)')
    showError('connection_error')
  })

  rtcSession.on('room_full', () => {
    logger.error('room full')
    showError('room_full')
  })

  rtcSession.on('room_joined', (room) => {
    logger.log(`room joined with ${room.getRemotePeers().length} other peers`)
    signalingState = 'connected'

    const allPeers = room.getAllPeers()

    if (allPeers.length > config.maximumPeers) {
      rtcSession.destroy()
      showError('room_full')
      return
    }

    peers.value = allPeers
    localPeer.value = room.getLocalPeer()
    showParty()
  })

  rtcSession.on('peer_joined', (peer) => {
    logger.log('peer joined', peer)
    if (soundsEnabled.value) {
      enteringKnock?.play()
    }
    if (rtcSession.room) peers.value = rtcSession.room.getAllPeers()
  })

  rtcSession.on('peer_stream_ready', (peer) => {
    logger.log('peer stream ready', peer)
  })

  rtcSession.on('peer_stream_removed', (peer) => {
    logger.log('peer stream removed', peer)
  })

  rtcSession.on('peer_left', (peer) => {
    logger.log('peer left', peer)
    if (soundsEnabled.value) {
      leavingBirds?.play()
    }
    if (rtcSession.room) peers.value = rtcSession.room.getAllPeers()
  })

  rtcSession.on('session_reconnect', () => {
    logger.log('trying to reconnect and rejoin room')
  })

  rtcSession.on('session_before_destroy', () => {
    logger.log('destroying rtc session')
  })

  rtcSession.on('peer_connection_pending', (peer) => {
    logger.log('peer connection pending', peer)
  })

  rtcSession.on('peer_connection_established', (peer) => {
    logger.log('peer connection established', peer)
  })

  rtcSession.on('peer_connection_disconnected', (peer) => {
    logger.warn('peer connection disconnected', peer)
  })

  rtcSession.on('peer_connection_closed', (peer) => {
    logger.warn('peer connection closed', peer)
  })

  rtcSession.on('peer_connection_failed', (peer) => {
    logger.error('peer connection failed', peer)
  })

  return rtcSession
}

function joinRoom(joinConfig: { userMediaConfig: any, name: string, soundsEnabled: boolean }) {
  screenMessage.value = t('room.waitingForUserMedia')
  soundsEnabled.value = joinConfig.soundsEnabled

  initialVideoEnabled.value = !!joinConfig.userMediaConfig.video
  initialAudioEnabled.value = !!joinConfig.userMediaConfig.audio

  const identity = new Identity({
    userMediaConfig: joinConfig.userMediaConfig,
    name: joinConfig.name,
  })

  rtc!.connect({ identity })
}

function reconnectRtcWhenOnLine() {
  logger.log('scheduled reconnect when online')
  if (signalingState !== 'initial' && signalingState !== 'reconnect_scheduled') {
    screenMessage.value = t('room.waitingForRoomServer')
    signalingState = 'reconnect_scheduled'
    window.addEventListener('online', onlineEventListener)
    if (navigator.onLine) window.dispatchEvent(new Event('online'))
  } else {
    showError('connection_error')
  }
}

function onlineEventListener() {
  logger.log('now online, trying to reconnect')
  window.removeEventListener('online', onlineEventListener)

  if (signalingState === 'reconnect_scheduled') {
    signalingState = 'trying_to_reconnect'
    rtc!.reconnect()
  } else if (signalingState === 'trying_to_reconnect') {
    setTimeout(() => rtc!.reconnect(), config.reconnectTimeout)
  }
}

function closeInfoScreen() {
  infoPage.value = null
}

function openInfoScreen(page: string) {
  infoPage.value = page
}

// Lifecycle
onMounted(() => {
  normalizeRoomIdInUrl()

  const currentRoomId = roomId.value
  catchInvalidRoomId(currentRoomId)

  const sessionConfig = {
    roomId: currentRoomId,
    webSocketAddress: config.env.rtcUrl || config.defaultRtcUrl,
    stun: config.env.stunUrl || config.defaultStunUrl,
    joinTimeout: config.defaultJoinTimeout,
    filterIceCandidateTypes: config.env.filterIceCandidateTypes,
    turnUrls: config.env.turnUrls,
  }

  rtc = setupRtc(new Session(sessionConfig))
})

onBeforeUnmount(() => {
  rtc?.destroy()
  window.removeEventListener('online', onlineEventListener)
})
</script>

<style lang="scss" scoped>
.room {
  height: 100%;
}

.fade-enter-active {
  transition: opacity .3s ease-in;
}

.fade-leave-active {
  transition: opacity .5s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
