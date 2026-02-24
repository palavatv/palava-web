<template>
  <main :class="{
    'party': true,
    'party--landscape': partyMode === 'landscape',
    'party--portrait': partyMode === 'portrait',
  }">
    <nav class="top-control">
      <button
        :title="t('party.toggleControls')"
        :class="{
          'logo-control': true,
          'logo-control--active': controlsActive,
          'logo-control--inactive': !controlsActive,
        }"
        ref="logoBtn"
        @click="toggleControls"
      >
        <PalavaIcon :alt="t('palavaLogoAlt')" />
      </button>

      <transition name="fade-control">
        <button
          v-if="controlsActive"
          :title="t('party.infoTitle')"
          class="control control--info"
          @click="emit('open-info-screen', 'about')"
        >
          <InfoIcon :alt="t('party.infoAlt')" :aria-label="t('party.infoAlt')" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          v-if="controlsActive && canShare"
          :title="t('party.copyLinkTitle')"
          class="control control--copy-link"
          ref="copyLinkBtn"
          @click="copyShareLink"
        >
          <LinkIcon :alt="t('party.copyLinkAlt')" :aria-label="t('party.copyLinkAlt')" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          v-if="controlsActive && localPeer.hasVideo()"
          :title="cameraOff ? t('party.turnOnCameraTitle') : t('party.turnOffCameraTitle')"
          class="control control--camera"
          @click="toggleCamera"
        >
          <VideoCameraOffIcon v-if="cameraOff" :alt="t('party.cameraAlt')" :aria-label="t('party.cameraAlt')" />
          <VideoCameraIcon v-else :alt="t('party.cameraAlt')" :aria-label="t('party.cameraAlt')" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          v-if="controlsActive && localPeer.hasAudio()"
          :title="microphoneMuted ? t('party.unmuteMicrophoneTitle') : t('party.muteMicrophoneTitle')"
          class="control control--microphone"
          @click="toggleMicrophone"
        >
          <MicOffIcon v-if="microphoneMuted" :alt="t('party.microphoneAlt')" :aria-label="t('party.microphoneAlt')" />
          <MicIcon v-else :alt="t('party.microphoneAlt')" :aria-label="t('party.microphoneAlt')" />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          v-if="controlsActive"
          :title="t('switchLanguageTitle')"
          class="control control--switch-language"
          ref="switchLanguageBtn"
          @click="switchLanguage"
        >
          <span :aria-label="t('switchLanguageAlt')">{{ locale }}</span>
        </button>
      </transition>

      <transition name="fade-control">
        <router-link
          v-if="controlsActive"
          to="/"
          :title="t('party.hangUpTitle')"
          class="control control--hang-up"
        >
          <PhoneIcon :alt="t('party.hangUpAlt')" :aria-label="t('party.hangUpAlt')" />
        </router-link>
      </transition>
    </nav>

    <div
      :class="{
        'stage': true,
        'stage--landscape': stageMode === 'landscape',
        'stage--portrait': stageMode === 'portrait',
      }"
      ref="stageEl"
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
        }"
      >
        <PeerTile v-for="peer in stagePeers"
          :key="peer.id"
          type="stage"
          :partyMode="partyMode"
          :stageMode="stageMode"
          :peer="peer"
          :colorIndex="getColorIndex(peer)"
          @togglePeer="togglePeer(peer)"
          @open-info-screen="(page) => emit('open-info-screen', page)"
        />
      </transition-group>
    </div>

    <transition name="fade-control" @after-leave="onResize">
      <div class="lobby" v-if="lobbyPeers.length > 0">
        <transition-group name="fade-control" tag="ul" class="couch">
          <PeerTile v-for="peer in lobbyPeers"
            :key="peer.id"
            type="lobby"
            :partyMode="partyMode"
            :stageMode="stageMode"
            :peer="peer"
            :colorIndex="getColorIndex(peer)"
            @togglePeer="togglePeer(peer)"
            @open-info-screen="(page) => emit('open-info-screen', page)"
          />
        </transition-group>
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Peer, LocalPeer } from '@palava/client'
import PeerTile from '@/components/PeerTile.vue'
import config from '@/config'
import PalavaIcon from '@/assets/icons/palava.svg?component'
import InfoIcon from '@/assets/icons/info-with-circle.svg?component'
import LinkIcon from '@/assets/icons/link.svg?component'
import VideoCameraIcon from '@/assets/icons/video-camera.svg?component'
import VideoCameraOffIcon from '@/assets/icons/video-camera-off.svg?component'
import MicIcon from '@/assets/icons/mic.svg?component'
import MicOffIcon from '@/assets/icons/mic-off.svg?component'
import PhoneIcon from '@/assets/icons/phone.svg?component'

const props = defineProps<{
  peers: Peer[]
  localPeer: LocalPeer
}>()

const emit = defineEmits<{
  'open-info-screen': [page: string]
}>()

const { t, locale } = useI18n()

const partyMode = ref<'landscape' | 'portrait'>('landscape')
const stageMode = ref<'landscape' | 'portrait'>('landscape')
const peersInLobby = ref<string[]>([])
const peerColors = ref<(string | null)[]>(Array(config.peerColors.length - 1).fill(null))
const controlsActive = ref(true)
const cameraOff = ref(false)
const microphoneMuted = ref(false)

const logoBtn = ref<HTMLButtonElement>()
const copyLinkBtn = ref<HTMLButtonElement>()
const switchLanguageBtn = ref<HTMLButtonElement>()
const stageEl = ref<HTMLDivElement>()

const stagePeers = computed(() =>
  props.peers.filter((peer) => !peersInLobby.value.includes(peer.id)),
)
const lobbyPeers = computed(() =>
  props.peers.filter((peer) => peersInLobby.value.includes(peer.id)),
)
const canShare = computed(() =>
  !!(navigator.share || navigator.clipboard?.writeText),
)

function togglePeer(peer: Peer) {
  if (peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = peersInLobby.value.filter((id) => id !== peer.id)
  } else {
    peersInLobby.value = [...peersInLobby.value, peer.id]
  }
}

function sendPeerToLobby(peer: Peer) {
  if (!peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = [...peersInLobby.value, peer.id]
  }
}

function sendPeerToStage(peer: Peer) {
  if (peersInLobby.value.includes(peer.id)) {
    peersInLobby.value = peersInLobby.value.filter((id) => id !== peer.id)
  }
}

function cleanLobby(removedPeers: Peer[]) {
  const removedIds = removedPeers.map((p) => p.id)
  peersInLobby.value = peersInLobby.value.filter((id) => !removedIds.includes(id))
}

function getColorIndex(peer: Peer): number {
  return peerColors.value.indexOf(peer.id) + 1
}

function assignColorIndexes(introducedPeers: Peer[], removedPeers: Peer[] = []) {
  const removedIds = removedPeers.map((rp) => rp.id)
  peerColors.value = peerColors.value.map((idOrNull) =>
    removedIds.includes(idOrNull as string) ? null : idOrNull,
  )

  introducedPeers.forEach((peer) => {
    if (!peerColors.value.includes(null)) return
    let newIndex: number
    do {
      newIndex = Math.floor(Math.random() * (config.peerColors.length - 1))
    } while (peerColors.value[newIndex] !== null)
    peerColors.value = peerColors.value.map((idOrNull, index) =>
      index === newIndex ? peer.id : idOrNull,
    )
  })
}

function autoAdjustPeers(peers: Peer[]) {
  const remotePeers = peers.filter((peer) => !peer.isLocal())
  if (remotePeers.length === 1) {
    sendPeerToLobby(props.localPeer)
    sendPeerToStage(remotePeers[0]!)
  }
}

function toggleControls() {
  controlsActive.value = !controlsActive.value
  logoBtn.value?.blur()
}

function copyShareLink() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ url })
  } else {
    navigator.clipboard.writeText(url)
  }
  copyLinkBtn.value?.blur()
}

function switchLanguage() {
  locale.value = locale.value === 'de' ? 'en' : 'de'
  switchLanguageBtn.value?.blur()
}

function toggleMicrophone() {
  microphoneMuted.value = !microphoneMuted.value
  if (microphoneMuted.value) {
    props.localPeer.disableAudio()
  } else {
    props.localPeer.requestAudio()
  }
}

function toggleCamera() {
  cameraOff.value = !cameraOff.value
  if (cameraOff.value) {
    props.localPeer.disableVideo()
  } else {
    props.localPeer.requestVideo()
  }
}

function onResize() {
  const partyWidth = window.innerWidth
  const partyHeight = window.innerHeight
  const sw = stageEl.value?.clientWidth ?? 0
  const sh = stageEl.value?.clientHeight ?? 0

  if (partyMode.value === 'landscape' && partyWidth < partyHeight) {
    partyMode.value = 'portrait'
  } else if (partyMode.value === 'portrait' && partyWidth >= partyHeight) {
    partyMode.value = 'landscape'
  }

  if (stageMode.value === 'landscape' && sw < sh) {
    stageMode.value = 'portrait'
  } else if (stageMode.value === 'portrait' && sw >= sh) {
    stageMode.value = 'landscape'
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
  assignColorIndexes(props.peers)
  autoAdjustPeers(props.peers)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

watch(() => props.peers, (newPeers, oldPeers) => {
  const introduced = newPeers.filter((np) => !oldPeers.includes(np))
  const removed = oldPeers.filter((op) => !newPeers.includes(op))
  cleanLobby(removed)
  assignColorIndexes(introduced, removed)
  autoAdjustPeers(newPeers)
})
</script>

<style lang="scss">
.top-control {
  position: absolute;
  z-index: 1000;
  top: calc($small-control-size / 3);
  @media (min-width: $mobile) { top: calc($large-control-size / 3); }
  display: flex;
  align-items: center;

  .logo-control, .control {
    margin-left: calc($small-control-size / 3);
    @media (min-width: $mobile) { margin-left: calc($large-control-size / 3); }
  }

  .logo-control {
    height: $large-control-size;
    width: $large-control-size;
    @media (min-width: $mobile) {
      height: $logo-control-size;
      width: $logo-control-size;
    }
    opacity: 0.7;
    filter: grayscale(1);
    @include knobLike();
    @include focusTitle();
    &:focus, &:hover {
      outline: none;
      filter: none;
      opacity: 1;
      &::after { top: 120%; left: 0; }
    }
    svg { height: 100%; width: 100%; }
  }

  .control {
    height: $small-control-size;
    width: $small-control-size;
    @media (min-width: $mobile) {
      height: $large-control-size;
      width: $large-control-size;
    }
    @include knob();
    &:focus, &:hover {
      &::after { top: 120%; left: 0; }
    }

    &--switch-language > * {
      font-size: calc($small-control-size / 2.2);
      @media (min-width: $mobile) { font-size: calc($large-control-size / 2.2); }
      transform: translate(-1px, 0px);
      text-transform: uppercase;
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
    .lobby .peer {
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
    .lobby { width: 100%; }
    .lobby .peer {
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

  .party--portrait & { flex-direction: row; overflow-x: auto; }
  .party--landscape & { flex-direction: column; overflow-y: auto; }
  @include fadeControl();
}
</style>
