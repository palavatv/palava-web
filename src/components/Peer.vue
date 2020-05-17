<template>
  <li :class="{
    'peer': true,
    'peer--is-local': peer.isLocal(),
    'peer--is-remote': !peer.isLocal(),
    'peer--is-ready': peer.isReady(),
    'peer--not-ready': !peer.isReady(),
    'peer--has-audio': !peer.hasAudio(),
    'peer--has-no-audio': !peer.hasAudio(),
    'peer--text-only': !peer.hasAudio() && !peer.hasVideo(),
    'peer--muted-by-user': muted,
    'peer--has-media': peer.hasVideo(),
    'peer--has-no-video': !peer.hasVideo(),
    'peer--has-error': peer.hasError(),
    'peer--in-lobby': type === 'lobby',
    'peer--on-stage': type === 'stage',
    'peer--party-landscape': partyMode === 'landscape',
    'peer--party-portrait': partyMode === 'portrait',
    'peer--stage-landscape': stageMode === 'landscape',
    'peer--stage-portrait': stageMode === 'portrait',
  }"
  >
    <transition name="fade-control">
      <NetworkInfo
        v-if="networkInfoActive"
        @close="hideNetworkInfo()"
        @open-info-screen="(page) => $emit('open-info-screen', page)"
        :peer="peer"
        />
    </transition>

    <PeerStatus
      v-if="status !== 'video'"
      :status="status"
      :error="peer.error"
      @click="togglePeerMenu()"
      />

    <div class="frame">
      <Placeholder
        v-if="status !== 'video'"
        :peer="peer"
        :colorIndex="colorIndex"
        @click="togglePeerMenu()"
        />
      <Stream
        v-if="status === 'video' || status === 'audio'"
        :peer="peer"
        :status="status"
        :requestFullscreen="requestFullscreen"
        :muted="muted"
        @click="togglePeerMenu()"
        />
      <nav :class="{
          'peer-menu': true,
          'peer-menu--in-lobby': type === 'lobby',
          'peer-menu--on-stage': type === 'stage',
        }"
        >
        <transition name="fade-control">
          <button
            :title="$t('peer.toggleEnlargeTitle')"
            class="menu-control menu-control--toggle"
            v-if="peerMenuActive && type === 'lobby'"
            @click="togglePeer()"
            >
            <inline-svg
              :alt="$t('peer.toggleEnlargeAlt')"
              :aria-label="$t('peer.toggleEnlargeAlt')"
              :src="require('../assets/level-up.svg')"
              />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            :title="$t('peer.toggleMinimizeTitle')"
            class="menu-control menu-control--toggle"
            v-if="peerMenuActive && type === 'stage'"
            @click="togglePeer()"
            >
            <inline-svg
              :alt="$t('peer.toggleMinimizeAlt')"
              :aria-label="$t('peer.toggleMinimizeAlt')"
              :src="require('../assets/level-down.svg')"
              />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            :title="$t('peer.fullScreenTitle')"
            class="menu-control menu-control--full-screen"
            v-if="peerMenuActive && peer.hasVideo()"
            @click="makePeerFullScreen()"
            >
            <inline-svg
              :alt="$t('peer.fullScreenAlt')"
              :aria-label="$t('peer.fullScreenAlt')"
              :src="require('../assets/resize-full-screen.svg')"
              />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            :title="$t('peer.networkInfoTitle')"
            class="menu-control menu-control--network-info"
            ref="networkInfo"
            v-if="peerMenuActive && !peer.isLocal()"
            @click="toggleNetworkInfo()"
            >
            <inline-svg
              :alt="$t('peer.networkInfoAlt')"
              :aria-label="$t('peer.networkInfoAlt')"
              :src="require('../assets/network.svg')"
              />
          </button>
        </transition>

        <transition name="fade-control">
          <button
            :title="muted ? $t('peer.unmuteAudioTitle') : $t('peer.muteAudioTitle')"
            :class="{
              'menu-control': true,
              'menu-control--mute': !muted,
              'menu-control--unmute': muted,
            }"
            ref="mute"
            v-if="peerMenuActive && !peer.isLocal() && peer.hasAudio() && !peer.hasError()"
            @click="toggleMute()"
            >
            <inline-svg v-if="muted"
              :alt="$t('peer.mutedAudioAlt')"
              :aria-label="$t('peer.mutedAudioAlt')"
              :src="require('../assets/volume-off.svg')"
              />
            <inline-svg v-else
              :alt="$t('peer.withAudioAlt')"
              :aria-label="$t('peer.withAudioAlt')"
              :src="require('../assets/volume-up.svg')"
              />
          </button>
        </transition>
      </nav>
    </div>
  </li>
</template>

<script>
import yyid from "yyid"

import Stream from "@/components/Stream.vue"
import PeerStatus from "@/components/PeerStatus.vue"
import Placeholder from "@/components/Placeholder.vue"
import NetworkInfo from "@/components/NetworkInfo.vue"

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    },
    colorIndex: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
    },
    partyMode: {
      type: String,
      required: true,
    },
    stageMode: {
      type: String,
      required: true,
    },
  },
  components: {
    PeerStatus,
    Placeholder,
    Stream,
    NetworkInfo,
  },
  data() {
    return {
      muted: false,
      peerMenuActiveInLobby: true,
      requestFullscreen: null,
      networkInfoActive: false,
    }
  },
  computed: {
    peerMenuActive() {
      // return this.type === "stage" || this.peerMenuActiveInLobby
      return this.peerMenuActiveInLobby
    },
    status() {
      if (this.peer.error) { return "error" }
      if (!this.peer.isReady()) { return "not-ready" }
      if (this.peer.hasVideo()) { return "video" }
      if (this.peer.hasAudio()) { return "audio" }
      return "no-media"
    }
  },
  methods: {
    togglePeerMenu() {
      this.peerMenuActiveInLobby = !this.peerMenuActiveInLobby
    },
    togglePeer() {
      this.$emit('togglePeer')
    },
    makePeerFullScreen() {
      this.requestFullscreen = yyid()
    },
    toggleMute() {
      this.muted = !this.muted
      this.$refs.mute.blur()
    },
    toggleNetworkInfo() {
      this.networkInfoActive = !this.networkInfoActive
      this.$refs.networkInfo.blur()
    },
    hideNetworkInfo() {
      this.networkInfoActive = false
    },
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

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
    video {
      transform: scale(-1, 1);
    }
  }
}

.lobby {
  .peer {
    border-top: $lobby-peer-padding solid transparent;
    border-left: $lobby-peer-padding solid transparent;
    .media {
      border-radius: $lobby-border-radius;
    }
  }

  .peer--party-landscape {
    border-right: $lobby-peer-padding solid transparent;
    &:last-child {
      border-bottom: $lobby-peer-padding solid transparent;
    }
    .media {
      width: 100%;
    }
  }

  .peer--party-portrait {
    border-bottom: $lobby-peer-padding solid transparent;
    &:last-child {
      border-right: $lobby-peer-padding solid transparent;
    }
    .media {
      height: 100%;
    }
  }
}

.stage {
  .spotlight {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .peer {
    padding: $stage-gap;
  }

  .media {
    object-fit: cover;
    border-radius: $stage-border-radius;
  }

  .spotlight--three,
  .spotlight--four {
    padding: $stage-gap;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50% 50%;
    .peer .media {
      width: 100%;
      height: 100%;
    }
  }

  .spotlight--five,
  .spotlight--six {
    padding: $stage-gap;
    display: grid;
    .peer .media {
      width: 100%;
      height: 100%;
    }
  }
}

.stage--landscape {
  .spotlight--empty,
  .spotlight--one {
    text-align: center;
    .peer, .peer .media {
      height: 100%;
      max-width: 100%;
    }
  }

  /* tricky case... */
  // .spotlight--two {
  //   padding: $stage-gap;
  //   display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap;
  //   justify-content: center;
  //   .peer, .peer .media {
  //     max-height: 100%;
  //   }
  //   .peer {
  //     width: 50%;
  //   }
  //   .media {
  //     width: 100%;
  //   }
  // }
  .spotlight--two {
    padding: $stage-gap;
    display: flex;
    align-items: center;

    .peer, .peer .media {
      max-height: 100%;
    }
    .peer {
      width: 50%;
    }
    .media {
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
    flex-direction: column;
    .peer, .peer .media {
      width: 100%;
      max-height: 100%;
    }
  }

  .spotlight--two {
    padding: $stage-gap;
    text-align: center;
    .peer, .peer .media {
      max-width: 100%;
    }
    .peer {
      height: 50%;
    }
    .media {
      height: 100%;
    }
  }

  .spotlight--five,
  .spotlight--six {
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
      &::after {
        bottom: 120%;
        right: 0;
      }
    }
  }

  &--in-lobby {
    bottom: $small-control-size / 8;
    right: $small-control-size / 8;
    .menu-control {
      height: $small-control-size;
      width: $small-control-size;
      font-size: $small-control-size / 2;
      margin: $small-control-size / 8;

      & > * {
        padding: 2px;
      }
    }
  }

  &--on-stage {
    bottom: $small-control-size / 8;
    right: $small-control-size / 8;
    @media (min-width: $mobile) {
      bottom: $large-control-size / 8;
      right: $large-control-size / 8;
    }

    .menu-control {
      height: $small-control-size;
      width: $small-control-size;
      margin: $small-control-size / 8;
      @media (min-width: $mobile) {
        height: $large-control-size;
        width: $large-control-size;
        margin: $large-control-size / 8;
      }
    }
  }
}
</style>
