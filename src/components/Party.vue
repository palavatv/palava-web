<template>
  <main :class="{
    'party': true,
    'party--landscape': partyMode === 'landscape',
    'party--portrait': partyMode === 'portrait',
  }">
    <nav class="top-control">
      <button
        :title="$t('party.toggleControls')"
        :class="{
          'logo-control': true,
          'logo-control--active': controlsActive,
          'logo-control--inactive': !controlsActive,
          }"
        ref="logo"
        @click="toggleControls"
        >
        <inline-svg
          :alt="$t('palavaLogoAlt')"
          :src="require('../assets/palava.svg')"
          />
      </button>

      <transition name="fade-control">
        <button
          :title="$t('party.infoTitle')"
          class="control control--info"
          @click="$emit('open-info-screen', 'about')"
          v-if="controlsActive"
          >
          <inline-svg
            :alt="$t('party.infoAlt')"
            :aria-label="$t('party.infoAlt')"
            :src="require('../assets/info-with-circle.svg')"
            />
        </button>
      </transition>

      <transition name="fade-control">
        <button
          :title="$t('party.copyLinkTitle')"
          class="control control--copy-link"
          @click="copyShareLink"
          ref="copyLink"
          v-if="controlsActive && canShare"
          >
          <inline-svg
            :alt="$t('party.copyLinkAlt')"
            :aria-label="$t('party.copyLinkAlt')"
            :src="require('../assets/link.svg')"
            />
        </button>
      </transition>

      <!-- <transition name="fade-control">
        <button
          :title="$t('party.turnOffCameraTitle')"
          class="control control--camera"
          v-if="controlsActive"
          >
          <inline-svg
            :alt="$t('party.cameraAlt')"
            :aria-label="$t('party.cameraAlt')"
            :src="require('../assets/video-camera.svg')"
            />
        </button>
      </transition> -->

      <!-- <transition name="fade-control">
        <button
          :title="$t('party.muteMicrophoneTitle')"
          class="control control--microphone"
          v-if="controlsActive"
          >
          <inline-svg
            :alt="$t('party.microphoneAlt')"
            :aria-label="$t('party.microphoneAlt')"
            :src="require('../assets/mic.svg')"
            />
        </button>
      </transition> -->

      <!-- <transition name="fade-control">
        <button
          :title="$t('party.screenShareTitle')"
          class="control control--screen-share"
          v-if="controlsActive"
          >
          <inline-svg
            :alt="$t('party.screenShareAlt')"
            :aria-label="$t('party.screenShareAlt')"
            :src="require('../assets/tv.svg')"
            />
        </button>
      </transition> -->

      <!-- <transition name="fade-control">
        <button
          :title="$t('party.openTextChatTitle')"
          class="control control--text-chat"
          v-if="controlsActive"
          >
          <inline-svg
            :src="require('../assets/chat.svg')"
            :alt="$t('party.textChatAlt')"
            :aria-label="$t('party.textChatAlt')"
            \>
        </button>
      </transition> -->

      <transition name="fade-control">
        <button
          :title="$t('switchLanguageTitle')"
          class="control control--switch-language"
          ref="switchLanguage"
          @click="switchLanguage"
          v-if="controlsActive"
          >
          <span :aria-label="$t('switchLanguageAlt')">{{ $root.$i18n.locale }}</span>
        </button>
      </transition>

      <transition name="fade-control">
        <router-link to="/"
          :title="$t('party.hangUpTitle')"
          class="control control--hang-up"
          v-if="controlsActive"
          >
          <inline-svg
            :alt="$t('party.hangUpAlt')"
            :aria-label="$t('party.hangUpAlt')"
            :src="require('../assets/phone.svg')"
            />
        </router-link>
      </transition>
    </nav>

    <div
      :class="{
        'stage': true,
        'stage--landscape': stageMode === 'landscape',
        'stage--portrait': stageMode === 'portrait',
      }"
      ref="stage"
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
        }">
        <Peer v-for="peer in stagePeers"
          :key="peer.id"
          type="stage"
          :partyMode="partyMode"
          :stageMode="stageMode"
          :peer="peer"
          :colorIndex="getColorIndex(peer)"
          @togglePeer="togglePeer(peer)"
          @open-info-screen="(page) => $emit('open-info-screen', page)"
          />
      </transition-group>
    </div>

    <transition name="fade-control" @after-leave="onResize">
      <div class="lobby" v-if="lobbyPeers.length > 0">
        <transition-group name="fade-control" tag="ul" class="couch">
          <Peer v-for="peer in lobbyPeers"
            :key="peer.id"
            type="lobby"
            :partyMode="partyMode"
            :stageMode="stageMode"
            :peer="peer"
            :colorIndex="getColorIndex(peer)"
            @togglePeer="togglePeer(peer)"
            @open-info-screen="(page) => $emit('open-info-screen', page)"
            />
        </transition-group>
      </div>
    </transition>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

import config from '@/config'

export default {
  props: ["peers", "localPeer"],
  data() {
    return {
      partyMode: "landscape",
      stageMode: "landscape",
      peersInLobby: [],
      peerColors: Array(config.peerColors.length - 1).fill(null),
      controlsActive: true,
    }
  },
  components: {
    Peer,
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
    this.assignColorIndexes(this.peers)
    this.autoAdjustPeers(this.peers)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },
  watch: {
    peers(newPeers, oldPeers) {
      const introducedPeers = newPeers.filter((newPeer) => !oldPeers.includes(newPeer))
      const removedPeers = oldPeers.filter((oldPeer) => !newPeers.includes(oldPeer))
      this.cleanLobby(removedPeers)
      this.assignColorIndexes(introducedPeers, removedPeers)
      this.autoAdjustPeers(newPeers)
    },
  },
  computed: {
    stagePeers() {
      return this.peers.filter((peer) => !this.peersInLobby.includes(peer.id))
    },
    lobbyPeers() {
      return this.peers.filter((peer) => this.peersInLobby.includes(peer.id))
    },
    shareLink() {
      return window.location.href
    },
    canShare() {
      return !!(navigator.share || (navigator.clipboard && navigator.clipboard.writeText))
    },
  },
  methods: {
    togglePeer(peer) {
      if (this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = this.peersInLobby.filter((id) => id !== peer.id)
      } else {
        this.peersInLobby = [...this.peersInLobby, peer.id]
      }
    },
    sendPeerToLobby(peer) {
      if (!this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = [...this.peersInLobby, peer.id]
      }
    },
    sendPeerToStage(peer) {
      if (this.peersInLobby.includes(peer.id)) {
        this.peersInLobby = this.peersInLobby.filter((id) => id !== peer.id)
      }
    },
    cleanLobby(removedPeers) {
      this.peersInLobby = this.peersInLobby.filter((id) => !removedPeers.map((peer) => peer.id).includes(id))
    },
    getColorIndex(peer) {
      return this.peerColors.indexOf(peer.id) + 1
    },
    assignColorIndexes(introducedPeers, removedPeers = []) {
      // Remove old peers from color index list
      this.peerColors = this.peerColors.map((idOrNull) => {
        const removedPeersIds = removedPeers.map((rp) => rp.id)
        if (removedPeersIds.includes(idOrNull)) {
          return null
        }

        return idOrNull
      })

      // Assign random color index (which is not taken yet)
      introducedPeers.forEach((peer) => {
        if (!this.peerColors.includes(null)) { return }
        let newIndex = null
        do {
          newIndex = Math.floor(Math.random() * Math.floor(config.peerColors.length - 1))
        } while (this.peerColors[newIndex] !== null)
        this.peerColors = this.peerColors.map((idOrNull, index) => (index === newIndex ? peer.id : idOrNull))
      })
    },
    autoAdjustPeers(peers) {
      const remotePeers = peers.filter((peer) => !peer.isLocal())
      if (remotePeers.length === 1) {
        this.sendPeerToLobby(this.localPeer)
        this.sendPeerToStage(remotePeers[0])
      }
    },
    toggleControls() {
      this.controlsActive = !this.controlsActive
      this.$refs.logo.blur()
    },
    copyShareLink() {
      if (navigator.share) {
        navigator.share({ url: this.shareLink })
      } else {
        navigator.clipboard.writeText(this.shareLink)
      }

      this.$refs.copyLink.blur()
    },
    switchLanguage() {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'de' ? 'en' : 'de'
      this.$refs.switchLanguage.blur()
    },
    onResize() {
      const partyWidth = window.innerWidth
      const partyHeight = window.innerHeight
      const stageWidth = this.$refs.stage.clientWidth
      const stageHeight = this.$refs.stage.clientHeight

      if (this.partyMode === "landscape" && partyWidth < partyHeight) {
        this.partyMode = "portrait"
      } else if (this.partyMode === "portrait" && partyWidth >= partyHeight) {
        this.partyMode = "landscape"
      }

      if (this.stageMode === "landscape" && stageWidth < stageHeight) {
        this.stageMode = "portrait"
      } else if (this.stageMode === "portrait" && stageWidth >= stageHeight) {
        this.stageMode = "landscape"
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.top-control {
  position: absolute;
  z-index: 1000;
  top: $small-control-size / 3;
  @media (min-width: $mobile) {
    top: $large-control-size / 3;
  }
  display: flex;
  align-items: center;

  .logo-control, .control {
    margin-left: $small-control-size / 3;
    @media (min-width: $mobile) {
      margin-left: $large-control-size / 3;
    }
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

    @media (min-width: $mobile) {
      height: $large-control-size;
      width: $large-control-size;
    }
    @include knob();
    &:focus, &:hover {
      &::after {
        top: 120%;
        left: 0;
      }
    }

    &--switch-language > * {
      font-size: $small-control-size / 2.2;
      @media (min-width: $mobile) {
        font-size: $large-control-size / 2.2;
      }
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
    .lobby {
      height: 100%;
    }

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
    .lobby {
      width: 100%;
    }
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
