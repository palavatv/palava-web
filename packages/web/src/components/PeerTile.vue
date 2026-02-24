<template>
  <li :class="peerClasses">
    <transition name="fade-control">
      <NetworkInfoPanel
        v-if="networkInfoActive && !peer.isLocal()"
        @close="hideNetworkInfo()"
        @open-info-screen="(page) => emit('open-info-screen', page)"
        :peer="(peer as RemotePeer)"
      />
    </transition>

    <PeerStatusIndicator
      v-if="status !== 'video'"
      :status="status"
      :error="peer.error"
      @click="togglePeerMenu()"
    />

    <div class="frame">
      <PlaceholderImage
        v-if="status !== 'video'"
        :colorIndex="colorIndex"
        @click="togglePeerMenu()"
      />
      <StreamVideo
        v-if="status === 'video' || status === 'audio'"
        :peer="peer"
        :status="status"
        :requestFullscreen="requestFullscreenToken"
        :muted="muted"
        @click="togglePeerMenu()"
      />
      <nav :class="{
        'peer-menu': true,
        'peer-menu--in-lobby': type === 'lobby',
        'peer-menu--on-stage': type === 'stage',
      }">
        <transition name="fade-control">
          <button
            v-if="peerMenuActive && type === 'lobby'"
            :title="t('peer.toggleEnlargeTitle')"
            class="menu-control menu-control--toggle"
            @click="togglePeer()"
          >
            <LevelUpIcon :alt="t('peer.toggleEnlargeAlt')" :aria-label="t('peer.toggleEnlargeAlt')" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            v-if="peerMenuActive && type === 'stage'"
            :title="t('peer.toggleMinimizeTitle')"
            class="menu-control menu-control--toggle"
            @click="togglePeer()"
          >
            <LevelDownIcon :alt="t('peer.toggleMinimizeAlt')" :aria-label="t('peer.toggleMinimizeAlt')" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            v-if="peerMenuActive && status === 'video'"
            :title="t('peer.fullScreenTitle')"
            class="menu-control menu-control--full-screen"
            @click="makePeerFullScreen()"
          >
            <ResizeIcon :alt="t('peer.fullScreenAlt')" :aria-label="t('peer.fullScreenAlt')" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            v-if="peerMenuActive && !peer.isLocal()"
            :title="t('peer.networkInfoTitle')"
            class="menu-control menu-control--network-info"
            ref="networkInfoBtn"
            @click="toggleNetworkInfo()"
          >
            <NetworkIcon :alt="t('peer.networkInfoAlt')" :aria-label="t('peer.networkInfoAlt')" />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            v-if="peerMenuActive && !peer.isLocal() && peer.hasAudio() && !peer.hasError()"
            :title="muted ? t('peer.unmuteAudioTitle') : t('peer.muteAudioTitle')"
            :class="{
              'menu-control': true,
              'menu-control--mute': !muted,
              'menu-control--unmute': muted,
            }"
            ref="muteBtn"
            @click="toggleMute()"
          >
            <VolumeOffIcon v-if="muted" :alt="t('peer.mutedAudioAlt')" :aria-label="t('peer.mutedAudioAlt')" />
            <VolumeUpIcon v-else :alt="t('peer.withAudioAlt')" :aria-label="t('peer.withAudioAlt')" />
          </button>
        </transition>
      </nav>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Peer, RemotePeer } from '@palava/client'
import StreamVideo from '@/components/StreamVideo.vue'
import PeerStatusIndicator from '@/components/PeerStatusIndicator.vue'
import PlaceholderImage from '@/components/PlaceholderImage.vue'
import NetworkInfoPanel from '@/components/NetworkInfoPanel.vue'
import LevelUpIcon from '@/assets/icons/level-up.svg?component'
import LevelDownIcon from '@/assets/icons/level-down.svg?component'
import ResizeIcon from '@/assets/icons/resize-full-screen.svg?component'
import NetworkIcon from '@/assets/icons/network.svg?component'
import VolumeOffIcon from '@/assets/icons/volume-off.svg?component'
import VolumeUpIcon from '@/assets/icons/volume-up.svg?component'

const props = defineProps<{
  peer: Peer
  colorIndex?: number
  type: 'stage' | 'lobby'
  partyMode: string
  stageMode: string
}>()

const emit = defineEmits<{
  togglePeer: []
  'open-info-screen': [page: string]
}>()

const { t } = useI18n()

const muted = ref(false)
const peerMenuActiveInLobby = ref(true)
const requestFullscreenToken = ref<string | null>(null)
const networkInfoActive = ref(false)

const networkInfoBtn = ref<HTMLButtonElement>()
const muteBtn = ref<HTMLButtonElement>()

const peerMenuActive = computed(() => peerMenuActiveInLobby.value)

const status = computed(() => {
  if (props.peer.error) return 'error'
  if (!props.peer.isReady()) return 'not-ready'
  if (props.peer.hasVideo()) return 'video'
  if (props.peer.hasAudio()) return 'audio'
  return 'no-media'
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

function togglePeerMenu() {
  peerMenuActiveInLobby.value = !peerMenuActiveInLobby.value
}

function togglePeer() {
  emit('togglePeer')
}

function makePeerFullScreen() {
  requestFullscreenToken.value = crypto.randomUUID()
}

function toggleMute() {
  muted.value = !muted.value
  muteBtn.value?.blur()
}

function toggleNetworkInfo() {
  networkInfoActive.value = !networkInfoActive.value
  networkInfoBtn.value?.blur()
}

function hideNetworkInfo() {
  networkInfoActive.value = false
}
</script>

<style lang="scss">
.peer {
  font-size: 0;
  opacity: 1;
  position: relative;
  box-sizing: border-box;
  width: auto;
  height: auto;
  @include fadeControl();

  .frame {
    position: relative;
    display: inline;
  }

  .media {
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
  }

  &--is-local {
    video { transform: scale(-1, 1); }
  }
}

.lobby {
  .peer {
    border-top: $lobby-peer-padding solid transparent;
    border-left: $lobby-peer-padding solid transparent;
    .media { border-radius: $lobby-border-radius; }
  }

  .peer--party-landscape {
    border-right: $lobby-peer-padding solid transparent;
    &:last-child { border-bottom: $lobby-peer-padding solid transparent; }
    .media { width: 100%; }
  }

  .peer--party-portrait {
    border-bottom: $lobby-peer-padding solid transparent;
    &:last-child { border-right: $lobby-peer-padding solid transparent; }
    .media { height: 100%; }
  }
}

.stage {
  .spotlight {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .peer { padding: $stage-gap; }
  .media { object-fit: cover; border-radius: $stage-border-radius; }

  .spotlight--three, .spotlight--four {
    padding: $stage-gap;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50% 50%;
    .peer .media { width: 100%; height: 100%; }
  }

  .spotlight--five, .spotlight--six {
    padding: $stage-gap;
    display: grid;
    .peer .media { width: 100%; height: 100%; }
  }
}

.stage--landscape {
  .spotlight--empty, .spotlight--one {
    text-align: center;
    .peer, .peer .media { height: 100%; max-width: 100%; }
  }

  .spotlight--two {
    padding: $stage-gap;
    display: flex;
    align-items: center;
    .peer, .peer .media { max-height: 100%; }
    .peer { width: 50%; }
    .media { width: 100%; }
  }

  .spotlight--five, .spotlight--six {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50% 50%;
  }
}

.stage--portrait {
  .spotlight--empty, .spotlight--one {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .peer, .peer .media { width: 100%; max-height: 100%; }
  }

  .spotlight--two {
    padding: $stage-gap;
    text-align: center;
    .peer, .peer .media { max-width: 100%; }
    .peer { height: 50%; }
    .media { height: 100%; }
  }

  .spotlight--five, .spotlight--six {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
    &:focus, &:hover {
      &::after { bottom: 120%; right: 0; }
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
</style>
