<template>
  <main
    :class="{
      party: true,
      'party--landscape': partyMode === 'landscape',
      'party--portrait': partyMode === 'portrait',
    }"
  >
    <nav class="top-control">
      <button
        type="button"
        :title="t('party.toggleControls')"
        :class="{
          'logo-control': true,
          'logo-control--active': controlsActive,
          'logo-control--inactive': !controlsActive,
        }"
        ref="logoButton"
        @click="toggleControls"
      >
        <PalavaIcon :aria-label="t('palavaLogoAlt')" role="img" />
      </button>

      <transition name="fade-control">
        <button
          type="button"
          :title="t('party.infoTitle')"
          class="control control--info"
          @click="emit('open-info-screen', 'about')"
          v-if="controlsActive"
        >
          <InfoWithCircleIcon :aria-label="t('party.infoAlt')" role="img" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          type="button"
          :title="t('party.copyLinkTitle')"
          class="control control--copy-link"
          @click="copyShareLink"
          ref="copyLinkButton"
          v-if="controlsActive && canShare"
        >
          <LinkIcon :aria-label="t('party.copyLinkAlt')" role="img" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          type="button"
          :title="cameraOff ? t('party.turnOnCameraTitle') : t('party.turnOffCameraTitle')"
          class="control control--camera"
          @click="toggleCamera"
          v-if="controlsActive"
        >
          <VideoCameraOffIcon v-if="cameraOff" :aria-label="t('party.cameraAlt')" role="img" />
          <VideoCameraIcon v-else :aria-label="t('party.cameraAlt')" role="img" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          type="button"
          :title="microphoneMuted ? t('party.unmuteMicrophoneTitle') : t('party.muteMicrophoneTitle')"
          class="control control--microphone"
          @click="toggleMicrophone"
          v-if="controlsActive"
        >
          <MicOffIcon v-if="microphoneMuted" :aria-label="t('party.microphoneAlt')" role="img" />
          <MicIcon v-else :aria-label="t('party.microphoneAlt')" role="img" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          type="button"
          :title="t('switchLanguageTitle')"
          class="control control--switch-language"
          ref="switchLanguageButton"
          @click="switchLanguage"
          v-if="controlsActive"
        >
          <span :aria-label="t('switchLanguageAlt')">{{ locale.toUpperCase() }}</span>
        </button>
      </transition>

      <transition name="fade-control">
        <router-link
          to="/"
          :title="t('party.hangUpTitle')"
          class="control control--hang-up"
          v-if="controlsActive"
        >
          <PhoneIcon :aria-label="t('party.hangUpAlt')" role="img" />
        </router-link>
      </transition>
    </nav>

    <div
      :class="{
        stage: true,
        'stage--landscape': stageMode === 'landscape',
        'stage--portrait': stageMode === 'portrait',
      }"
      ref="stageElement"
    >
      <transition-group
        name="fade-control"
        tag="ul"
        :class="{
          spotlight: true,
          'spotlight--empty': stagePeers.length === 0,
          'spotlight--one': stagePeers.length === 1,
          'spotlight--two': stagePeers.length === 2,
          'spotlight--three': stagePeers.length === 3,
          'spotlight--four': stagePeers.length === 4,
          'spotlight--five': stagePeers.length === 5,
          'spotlight--six': stagePeers.length === 6,
        }"
      >
        <PeerTile
          v-for="peer in stagePeers"
          :key="peer.id"
          type="stage"
          :party-mode="partyMode"
          :stage-mode="stageMode"
          :peer="peer"
          :color-index="getColorIndex(peer)"
          @toggle-peer="togglePeer(peer)"
          @open-info-screen="(page) => emit('open-info-screen', page)"
        />
      </transition-group>
    </div>

    <transition name="fade-control" @after-leave="onResize">
      <div class="lobby" v-if="lobbyPeers.length > 0">
        <transition-group name="fade-control" tag="ul" class="couch">
          <PeerTile
            v-for="peer in lobbyPeers"
            :key="peer.id"
            type="lobby"
            :party-mode="partyMode"
            :stage-mode="stageMode"
            :peer="peer"
            :color-index="getColorIndex(peer)"
            @toggle-peer="togglePeer(peer)"
            @open-info-screen="(page) => emit('open-info-screen', page)"
          />
        </transition-group>
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
import type { Peer as PeerType, LocalPeer } from '@palava/client'
import PalavaIcon from '~/assets/icons/palava.svg?component'
import InfoWithCircleIcon from '~/assets/icons/info-with-circle.svg?component'
import LinkIcon from '~/assets/icons/link.svg?component'
import VideoCameraIcon from '~/assets/icons/video-camera.svg?component'
import VideoCameraOffIcon from '~/assets/icons/video-camera-off.svg?component'
import MicIcon from '~/assets/icons/mic.svg?component'
import MicOffIcon from '~/assets/icons/mic-off.svg?component'
import PhoneIcon from '~/assets/icons/phone.svg?component'

const { t, locale, setLocale } = useI18n()
const config = usePalavaConfig()

const props = defineProps<{
  peers: PeerType[]
  localPeer: LocalPeer
  initialVideoEnabled: boolean
  initialAudioEnabled: boolean
}>()

const emit = defineEmits<{
  'open-info-screen': [page: string]
}>()

// Template refs
const logoButton = ref<HTMLButtonElement>()
const copyLinkButton = ref<HTMLButtonElement>()
const switchLanguageButton = ref<HTMLButtonElement>()
const stageElement = ref<HTMLDivElement>()

// State
const partyMode = ref<'landscape' | 'portrait'>('landscape')
const stageMode = ref<'landscape' | 'portrait'>('landscape')
const peersInLobby = ref<string[]>([])
const manuallyAdjustedPeers = ref<string[]>([])
const peerColors = ref<(string | null)[]>(Array(config.peerColors.length - 1).fill(null))
const controlsActive = ref(true)
const cameraOff = ref(false)
const microphoneMuted = ref(false)

// Computed
const stagePeers = computed(() => {
  return props.peers.filter((peer) => !peersInLobby.value.includes(peer.id))
})

const lobbyPeers = computed(() => {
  return props.peers.filter((peer) => peersInLobby.value.includes(peer.id))
})

const canShare = computed(() => {
  return !!(navigator.share || (navigator.clipboard && navigator.clipboard.writeText))
})

// Methods
function togglePeer(peer: PeerType) {
  if (!manuallyAdjustedPeers.value.includes(peer.id)) {
    manuallyAdjustedPeers.value = [...manuallyAdjustedPeers.value, peer.id]
  }

  if (peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = peersInLobby.value.filter((id) => id !== peer.id)
  } else {
    peersInLobby.value = [...peersInLobby.value, peer.id]
  }
}

function sendPeerToLobby(peer: PeerType) {
  if (!peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = [...peersInLobby.value, peer.id]
  }
}

function sendPeerToStage(peer: PeerType) {
  if (peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = peersInLobby.value.filter((id) => id !== peer.id)
  }
}

function cleanLobby(removedPeers: PeerType[]) {
  const removedIds = removedPeers.map((peer) => peer.id)
  peersInLobby.value = peersInLobby.value.filter(
    (id) => !removedIds.includes(id)
  )
  manuallyAdjustedPeers.value = manuallyAdjustedPeers.value.filter(
    (id) => !removedIds.includes(id)
  )
}

function getColorIndex(peer: PeerType): number {
  return peerColors.value.indexOf(peer.id) + 1
}

function assignColorIndexes(introducedPeers: PeerType[], removedPeers: PeerType[] = []) {
  peerColors.value = peerColors.value.map((idOrNull) => {
    const removedPeersIds = removedPeers.map((rp) => rp.id)
    if (removedPeersIds.includes(idOrNull as string)) {
      return null
    }
    return idOrNull
  })

  introducedPeers.forEach((peer) => {
    if (!peerColors.value.includes(null)) {
      return
    }
    let newIndex: number | null = null
    do {
      newIndex = Math.floor(Math.random() * Math.floor(config.peerColors.length - 1))
    } while (peerColors.value[newIndex!] !== null)

    peerColors.value = peerColors.value.map((idOrNull, index) =>
      index === newIndex ? peer.id : idOrNull
    )
  })
}

function autoAdjustPeers(peers: PeerType[]) {
  const remotePeers = peers.filter((peer) => !peer.isLocal())

  if (remotePeers.length === 1) {
    if (!manuallyAdjustedPeers.value.includes(props.localPeer.id)) {
      sendPeerToLobby(props.localPeer)
    }
    if (!manuallyAdjustedPeers.value.includes(remotePeers[0]!.id)) {
      sendPeerToStage(remotePeers[0]!)
    }
  } else if (remotePeers.length === 0) {
    if (!manuallyAdjustedPeers.value.includes(props.localPeer.id)) {
      sendPeerToStage(props.localPeer)
    }
  } else {
    if (!manuallyAdjustedPeers.value.includes(props.localPeer.id)) {
      sendPeerToStage(props.localPeer)
    }
  }
}

function toggleControls() {
  controlsActive.value = !controlsActive.value
  logoButton.value?.blur()
}

function copyShareLink() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ url })
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
  }
  copyLinkButton.value?.blur()
}

function switchLanguage() {
  setLocale(locale.value === 'de' ? 'en' : 'de')
  switchLanguageButton.value?.blur()
}

async function toggleCamera() {
  if (cameraOff.value) {
    try {
      await props.localPeer.requestVideo(config.gumVideoConstraints)
      cameraOff.value = false
    } catch (error) {
      console.error('Failed to request video:', error)
    }
  } else {
    props.localPeer.disableVideo()
    cameraOff.value = true
  }
}

async function toggleMicrophone() {
  if (microphoneMuted.value) {
    try {
      await props.localPeer.requestAudio()
      microphoneMuted.value = false
    } catch (error) {
      console.error('Failed to request audio:', error)
    }
  } else {
    props.localPeer.disableAudio()
    microphoneMuted.value = true
  }
}

function onResize() {
  const partyWidth = window.innerWidth
  const partyHeight = window.innerHeight
  const stageWidth = stageElement.value?.clientWidth || 0
  const stageHeight = stageElement.value?.clientHeight || 0

  if (partyMode.value === 'landscape' && partyWidth < partyHeight) {
    partyMode.value = 'portrait'
  } else if (partyMode.value === 'portrait' && partyWidth >= partyHeight) {
    partyMode.value = 'landscape'
  }

  if (stageMode.value === 'landscape' && stageWidth < stageHeight) {
    stageMode.value = 'portrait'
  } else if (stageMode.value === 'portrait' && stageWidth >= stageHeight) {
    stageMode.value = 'landscape'
  }
}

// Lifecycle
onMounted(() => {
  cameraOff.value = !props.initialVideoEnabled
  microphoneMuted.value = !props.initialAudioEnabled

  window.addEventListener('resize', onResize)
  onResize()
  assignColorIndexes(props.peers)
  autoAdjustPeers(props.peers)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

watch(() => props.peers, (newPeers, oldPeers) => {
  const introducedPeers = newPeers.filter((newPeer) => !oldPeers.includes(newPeer))
  const removedPeers = oldPeers.filter((oldPeer) => !newPeers.includes(oldPeer))
  cleanLobby(removedPeers)
  assignColorIndexes(introducedPeers, removedPeers)
  autoAdjustPeers(newPeers)
})
</script>

<style lang="scss" scoped>
.top-control {
  position: absolute;
  z-index: 1000;
  top: calc($small-control-size / 3);
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: $mobile) {
    top: calc($large-control-size / 3);
  }

  .logo-control, .control {
    margin-left: calc($small-control-size / 3);
    @media (min-width: $mobile) {
      margin-left: calc($large-control-size / 3);
    }
  }

  .logo-control {
    height: $large-control-size;
    width: $large-control-size;
    opacity: 0.7;
    filter: grayscale(1);

    @include knobLike();
    @include focusTitle();

    @media (min-width: $mobile) {
      height: $logo-control-size;
      width: $logo-control-size;
    }

    &:focus-visible,
    &:hover {
      outline: none;
      filter: none;
      opacity: 1;

      &::after {
        top: 120%;
        left: 0;
      }
    }

    svg {
      height: 100%;
      width: 100%;
    }
  }

  .control {
    height: $small-control-size;
    width: $small-control-size;

    @include knob();

    @media (min-width: $mobile) {
      height: $large-control-size;
      width: $large-control-size;
    }

    &:focus-visible, &:hover {
      &::after {
        top: 120%;
        left: 0;
      }
    }

    &--switch-language > * {
      font-size: calc($small-control-size / 2.2);
      text-transform: uppercase;
      transform: translate(-1px, 0px);

      @media (min-width: $mobile) {
        font-size: calc($large-control-size / 2.2);
      }
    }

    &--hang-up > * {
      filter: grayscale(0);
      transform: rotate(225deg);
      fill: red;
    }
  }

  @include fadeControl();
}

.party {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: black;
  display: flex;
  @include fadeControl();

  &--landscape {
    flex-direction: row;
    .lobby { height: 100%; }

    .lobby :deep(.peer) {
      width: $lobby-width-mobile;
      @media (min-width: $mobile-plus)  { width: $lobby-width-mobile-plus; }
      @media (min-width: $desktop)      { width: $lobby-width-desktop; }
      @media (min-width: $desktop-plus) { width: $lobby-width-desktop-plus; }
      @media (min-width: $desktop-large){ width: $lobby-width-desktop-large; }
      @media (min-width: $desktop-huge) { width: $lobby-width-desktop-huge; }
    }

    .lobby :deep(.peer .media) {
      width: 100%;
    }
  }

  &--portrait {
    flex-direction: column;
    .lobby { width: 100%; }
    .lobby :deep(.peer) {
      height: $lobby-height-mobile;
      @media (min-height: $mobile-plus-height)  { height: $lobby-height-mobile-plus; }
      @media (min-height: $desktop-height)      { height: $lobby-height-desktop; }
      @media (min-height: $desktop-plus-height) { height: $lobby-height-desktop-plus; }
      @media (min-height: $desktop-large-height){ height: $lobby-height-desktop-large; }
      @media (min-height: $desktop-huge-height) { height: $lobby-height-desktop-huge; }
    }

    .lobby :deep(.peer .media) {
      height: 100%;
    }
  }
}

.lobby {
  overflow: hidden;
  background: #222;
  opacity: 1;
}

.stage {
  flex: 1;
  overflow: hidden;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;

  .spotlight {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  :deep(.media) {
    object-fit: cover;
  }

  .spotlight--three,
  .spotlight--four {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50% 50%;

    :deep(.peer .media) {
      width: 100%;
      height: 100%;
    }
  }

  .spotlight--five,
  .spotlight--six {
    display: grid;

    :deep(.peer .media) {
      width: 100%;
      height: 100%;
    }
  }
}

.stage--landscape {
  .spotlight--empty,
  .spotlight--one {
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.peer) {
      height: 100%;
      max-width: 100%;
    }

    :deep(.peer .media) {
      height: 100%;
      max-width: 100%;
    }
  }

  .spotlight--two {
    display: flex;
    align-items: center;

    :deep(.peer), :deep(.peer .media) {
      max-height: 100%;
    }
    :deep(.peer) {
      width: 50%;
    }
    :deep(.media) {
      width: 100%;
    }
  }

  .spotlight--five,
  .spotlight--six {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50% 50%;
  }
}

.stage--portrait {
  .spotlight--empty,
  .spotlight--one {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    :deep(.peer) {
      width: 100%;
      max-height: 100%;
    }

    :deep(.peer .media) {
      width: 100%;
      max-height: 100%;
    }
  }

  .spotlight--two {
    text-align: center;

    :deep(.peer), :deep(.peer .media) {
      max-width: 100%;
    }
    :deep(.peer) {
      height: 50%;
    }
    :deep(.media) {
      height: 100%;
    }
  }

  .spotlight--five,
  .spotlight--six {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
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
