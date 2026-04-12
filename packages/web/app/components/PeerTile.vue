<template>
  <li :class="peerClasses">
    <transition name="fade-control">
      <NetworkInfoPanel
        v-if="networkInfoActive"
        @close="hideNetworkInfo()"
        @open-info-screen="(page) => emit('open-info-screen', page)"
        :peer="peer"
      />
    </transition>

    <PeerStatusIndicator
      v-if="status !== 'video'"
      :status="status"
      :error="peer.error"
      @click="togglePeerMenu()"
    />

    <div v-if="peerName || (status === 'video' && !hasAudio)" class="peer-name">
      <MicOffIcon
        v-if="status === 'video' && !hasAudio"
        class="peer-name__icon"
        :aria-label="t('peer.mutedMicrophoneAlt')"
        role="img"
      />
      <span v-if="peerName" class="peer-name__text">{{ peerName }}</span>
    </div>

    <div class="frame">
      <PlaceholderImage
        v-if="status !== 'video' || !videoReady"
        :color-index="colorIndex"
        :class="{ 'placeholder--hidden': status === 'video' && !videoReady }"
        @click="togglePeerMenu()"
      />
      <StreamVideo
        v-if="status === 'video' || status === 'audio'"
        :peer="peer"
        :status="status"
        :request-fullscreen="requestFullscreen"
        :muted="muted"
        :class="{ 'stream--loading': status === 'video' && !videoReady }"
        @click="togglePeerMenu()"
        @video-ready="videoReady = true"
      />
      <nav
        :class="{
          'peer-menu': true,
          'peer-menu--in-lobby': type === 'lobby',
          'peer-menu--on-stage': type === 'stage',
        }"
      >
        <transition name="fade-control">
          <button
            type="button"
            :title="t('peer.toggleEnlargeTitle')"
            class="menu-control menu-control--toggle"
            v-if="peerMenuActive && type === 'lobby'"
            @click="togglePeer()"
          >
            <LevelUpIcon :aria-label="t('peer.toggleEnlargeAlt')" role="img" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            type="button"
            :title="t('peer.toggleMinimizeTitle')"
            class="menu-control menu-control--toggle"
            v-if="peerMenuActive && type === 'stage'"
            @click="togglePeer()"
          >
            <LevelDownIcon :aria-label="t('peer.toggleMinimizeAlt')" role="img" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            type="button"
            :title="t('peer.fullScreenTitle')"
            class="menu-control menu-control--full-screen"
            v-if="peerMenuActive && status === 'video'"
            @click="makePeerFullScreen()"
          >
            <ResizeFullScreenIcon :aria-label="t('peer.fullScreenAlt')" role="img" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            type="button"
            :title="t('peer.networkInfoTitle')"
            class="menu-control menu-control--network-info"
            ref="networkInfoButton"
            v-if="peerMenuActive && !peer.isLocal()"
            @click="toggleNetworkInfo()"
          >
            <NetworkIcon :aria-label="t('peer.networkInfoAlt')" role="img" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            type="button"
            :title="muted ? t('peer.unmuteAudioTitle') : t('peer.muteAudioTitle')"
            :class="{
              'menu-control': true,
              'menu-control--mute': !muted,
              'menu-control--unmute': muted,
            }"
            ref="muteButton"
            v-if="peerMenuActive && !peer.isLocal() && peer.hasAudio() && !peer.hasError()"
            @click="toggleMute()"
          >
            <VolumeOffIcon v-if="muted" :aria-label="t('peer.mutedAudioAlt')" role="img" />
            <VolumeUpIcon v-else :aria-label="t('peer.withAudioAlt')" role="img" />
          </button>
        </transition>
      </nav>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Peer } from '@palava/client'
import LevelUpIcon from '~/assets/icons/level-up.svg?component'
import LevelDownIcon from '~/assets/icons/level-down.svg?component'
import ResizeFullScreenIcon from '~/assets/icons/resize-full-screen.svg?component'
import NetworkIcon from '~/assets/icons/network.svg?component'
import VolumeOffIcon from '~/assets/icons/volume-off.svg?component'
import VolumeUpIcon from '~/assets/icons/volume-up.svg?component'
import MicOffIcon from '~/assets/icons/mic-off.svg?component'

const { t } = useI18n()

const props = defineProps<{
  peer: Peer
  colorIndex: number
  type: 'lobby' | 'stage'
  partyMode: 'landscape' | 'portrait'
  stageMode: 'landscape' | 'portrait'
}>()

const emit = defineEmits<{
  'toggle-peer': []
  'open-info-screen': [page: string]
}>()

// Template refs
const networkInfoButton = ref<HTMLButtonElement>()
const muteButton = ref<HTMLButtonElement>()

// State
const muted = ref(false)
const peerMenuActiveInLobby = ref(true)
const requestFullscreen = ref<string>()
const networkInfoActive = ref(false)
const status = ref<'error' | 'not-ready' | 'video' | 'audio' | 'no-media'>('not-ready')
const videoReady = ref(false)
const hasAudio = ref(false)
const hasVideo = ref(false)

// Computed
const peerMenuActive = computed(() => {
  return peerMenuActiveInLobby.value
})

const peerName = computed(() => {
  return props.peer.status?.name || ''
})

const peerClasses = computed(() => ({
  'peer': true,
  'peer--is-local': props.peer.isLocal(),
  'peer--is-remote': !props.peer.isLocal(),
  'peer--is-ready': props.peer.isReady(),
  'peer--not-ready': !props.peer.isReady(),
  'peer--has-audio': props.peer.hasAudio(),
  'peer--has-no-audio': !props.peer.hasAudio(),
  'peer--text-only': !props.peer.hasAudio() && !props.peer.hasVideo(),
  'peer--muted-by-user': muted.value,
  'peer--has-media': props.peer.hasVideo(),
  'peer--has-no-video': !props.peer.hasVideo(),
  'peer--has-error': props.peer.hasError(),
  'peer--in-lobby': props.type === 'lobby',
  'peer--on-stage': props.type === 'stage',
  'peer--party-landscape': props.partyMode === 'landscape',
  'peer--party-portrait': props.partyMode === 'portrait',
  'peer--stage-landscape': props.stageMode === 'landscape',
  'peer--stage-portrait': props.stageMode === 'portrait',
}))

function updateStatus() {
  const oldStatus = status.value

  // Sync reactive flags so the template re-renders when audio/video toggle
  hasAudio.value = props.peer.hasAudio()
  hasVideo.value = props.peer.hasVideo()

  if (props.peer.error) {
    status.value = 'error'
  } else if (!props.peer.isReady()) {
    status.value = 'not-ready'
  } else if (hasVideo.value) {
    status.value = 'video'
  } else if (hasAudio.value) {
    status.value = 'audio'
  } else {
    status.value = 'no-media'
  }

  // Reset videoReady when transitioning away from video status
  if (oldStatus === 'video' && status.value !== 'video') {
    videoReady.value = false
  }
}

onMounted(() => {
  updateStatus()
  props.peer.on('stream_ready', updateStatus)
  props.peer.on('stream_removed', updateStatus)
  props.peer.on('error', updateStatus)
  props.peer.on('video_added', updateStatus)
  props.peer.on('audio_added', updateStatus)
  props.peer.on('video_removed', updateStatus)
  props.peer.on('audio_removed', updateStatus)
})

onBeforeUnmount(() => {
  props.peer.off('stream_ready', updateStatus)
  props.peer.off('stream_removed', updateStatus)
  props.peer.off('error', updateStatus)
  props.peer.off('video_added', updateStatus)
  props.peer.off('audio_added', updateStatus)
  props.peer.off('video_removed', updateStatus)
  props.peer.off('audio_removed', updateStatus)
})

// Methods
function togglePeerMenu() {
  peerMenuActiveInLobby.value = !peerMenuActiveInLobby.value
}

function togglePeer() {
  emit('toggle-peer')
}

function makePeerFullScreen() {
  requestFullscreen.value = crypto.randomUUID()
}

function toggleMute() {
  muted.value = !muted.value
  muteButton.value?.blur()
}

function toggleNetworkInfo() {
  networkInfoActive.value = !networkInfoActive.value
  networkInfoButton.value?.blur()
}

function hideNetworkInfo() {
  networkInfoActive.value = false
}
</script>

<style lang="scss" scoped>
.peer {
  width: auto;
  height: auto;
  box-sizing: border-box;
  font-size: 0;
  opacity: 1;
  position: relative;

  @include fadeControl();

  .frame {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  :deep(.media) {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  &--is-local {
    :deep(video) {
      transform: scale(-1, 1);
    }
  }

  &--in-lobby {
    :deep(.lds-grid) {
      transform: scale(80%);
    }
  }

  &--on-stage {
    :deep(.lds-grid) {
      transform: scale(120%);
    }
  }

  &--on-stage {
    :deep(.network-info) {
      bottom: 60px;
      left: calc(50% - 150px);
    }
  }

  &--in-lobby {
    &.peer--party-landscape :deep(.network-info) {
      right: $lobby-width-mobile + $small-spacing;
      @media (min-width: $mobile-plus)  { right: $lobby-width-mobile-plus + $small-spacing; }
      @media (min-width: $desktop)      { right: $lobby-width-desktop + $small-spacing; }
      @media (min-width: $desktop-plus) { right: $lobby-width-desktop-plus + $small-spacing; }
      @media (min-width: $desktop-large){ right: $lobby-width-desktop-large + $small-spacing; }
      @media (min-width: $desktop-huge) { right: $lobby-width-desktop-huge + $small-spacing; }
    }

    &.peer--party-portrait :deep(.network-info) {
      bottom: $lobby-height-mobile + $small-spacing;
      @media (min-height: $mobile-plus-height)  { bottom: $lobby-height-mobile-plus + $small-spacing; }
      @media (min-height: $desktop-height)      { bottom: $lobby-height-desktop + $small-spacing; }
      @media (min-height: $desktop-plus-height) { bottom: $lobby-height-desktop-plus + $small-spacing; }
      @media (min-height: $desktop-large-height){ bottom: $lobby-height-desktop-large + $small-spacing; }
      @media (min-height: $desktop-huge-height) { bottom: $lobby-height-desktop-huge + $small-spacing; }
    }
  }
}

.peer-name {
  position: absolute;
  bottom: $small-spacing;
  left: $small-spacing;
  z-index: 400;

  padding: 2px 8px;
  font-size: 14px;
  line-height: 1.4;

  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);

  pointer-events: none;
  max-width: calc(100% - #{$small-spacing * 2});
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  &__icon {
    width: 1em;
    height: 1em;
    fill: white;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
    flex-shrink: 0;
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: $mobile) {
    font-size: 15px;
    bottom: $small-plus-spacing;
    left: $small-plus-spacing;
  }

  @media (min-width: $desktop) {
    font-size: 16px;
    bottom: $medium-spacing;
    left: $medium-spacing;
  }
}

.peer-menu {
  position: absolute;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  left: 0px;
  right: 0px;
  @include fadeControl();

  .menu-control {
    @include knob();
    &:focus-visible, &:hover {
      &::after {
        bottom: 120%;
        right: 0;
      }
    }
  }

  &--in-lobby {
    bottom: calc($small-control-size / 8);
    right: calc($small-control-size / 8);
    .menu-control {
      height: $small-control-size;
      width: $small-control-size;
      font-size: calc($small-control-size / 2);
      margin: calc($small-control-size / 8);
      & > * { padding: 2px; }
    }
  }

  &--on-stage {
    bottom: calc($small-control-size / 8);
    right: calc($small-control-size / 8);
    @media (min-width: $mobile) {
      bottom: calc($large-control-size / 8);
      right: calc($large-control-size / 8);
    }

    .menu-control {
      height: $small-control-size;
      width: $small-control-size;
      margin: calc($small-control-size / 8);
      @media (min-width: $mobile) {
        height: $large-control-size;
        width: $large-control-size;
        margin: calc($large-control-size / 8);
      }
    }
  }
}

.placeholder--hidden {
  visibility: hidden;
  position: absolute;
}

.stream--loading {
  position: absolute;
  opacity: 0;
}
</style>
