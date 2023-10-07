<template>
  <aside class="network-info">
    <button
      type="button"
      class="close"
      @click="$emit('close')"
    >
      <inline-svg
        :alt="$t('closeAlt')"
        :aria-label="$t('closeAlt')"
        src="@/assets/icons/cross.svg"
      />
    </button>

    <section>
      <h2>
        {{ relayStatusLocalized }}
        <button
          type="button"
          class="more-info"
          @click="$emit('open-info-screen', 'network')"
          :title="$t('moreInfoTitle')"
        >
          <inline-svg
            :alt="$t('moreInfoAlt')"
            :aria-label="$t('moreInfoAlt')"
            src="@/assets/icons/info-with-circle.svg"
          />
        </button>
      </h2>
    </section>

    <!-- TODO: Abstract into ip-list-component? -->
    <section>
      <h3>{{ $t('networkInfo.remoteIps') }}</h3>
      <ul>
        <li
          v-for="ip in allRemoteIps"
          :key="ip"
          :title="$t('networkInfo.ipTitle')"
        >
          <inline-svg
            :aria-label="$t('networkInfo.ipAlt')"
            :alt="$t('networkInfo.ipAlt')"
            src="@/assets/icons/dot-single.svg"
          />
          {{ ip }}
          <span v-if="allRelayIps.includes(ip)"> ({{ $t('networkInfo.ipIsRelay') }})</span>
        </li>
      </ul>
    </section>

    <section>
      <h3>{{ $t('networkInfo.localIps') }}</h3>
      <ul>
        <li
          v-for="ip in allLocalIps"
          :key="ip"
          :title="$t('networkInfo.ipTitle')"
        >
          <inline-svg
            :aria-label="$t('networkInfo.ipAlt')"
            :alt="$t('networkInfo.ipAlt')"
            src="@/assets/icons/dot-single.svg"
          />
          {{ ip }}
          <span v-if="allRelayIps.includes(ip)"> ({{ $t('networkInfo.ipIsRelay') }})</span>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import {
  getRemoteIps,
  getLocalIps,
  getRelayIps,
  getMyRelayStatus,
} from "../webrtc"

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    }
  },
  emits: ['close', 'open-info-screen'],
  data() {
    return {
      relayStatus: null,
    }
  },
  created() {
    if(!this.peer.peerConnection) { return }

    getMyRelayStatus(this.peer.peerConnection).then((iAmRelayed) => {
      if(iAmRelayed) {
        this.relayStatus = "relayed"
      } else if (this.allRemoteIps.some((ip) => this.allRelayIps.includes(ip))) {
        this.relayStatus = "relayed"
      } else {
        this.relayStatus = "direct"
      }
    })
  },
  computed: {
    allLocalIps() {
      return getLocalIps(this.peer.peerConnection)
    },
    allRemoteIps() {
      return getRemoteIps(this.peer.peerConnection)
    },
    allRelayIps() {
      return getRelayIps()
    },
    relayStatusLocalized() {
      if(this.relayStatus === "relayed") {
        return this.$t('networkInfo.relayedConnection')
      }

      if(this.relayStatus === "direct") {
        return this.$t('networkInfo.directConnection')
      }

      return this.$t('networkInfo.unknownConnection')
    }
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

// TODO style
// TODO see comments below
// .peer--on-stage {
//   position: relative;
// }

.network-info {
  position: absolute;
  .lobby & {
    position: fixed; // this is not correct...
  }
  z-index: 700;
  border-radius: $lobby-border-radius;
  background: white;
  opacity: 0.8;
  color: $action-1;
  padding: 7px 8px 1px;
  @include lightShadow();
  @include defaultFont();
  text-align: left;

  // TODO improve this (needs different concept...)
  .peer--on-stage & {
    bottom: 60px;
    left: calc(50% - 150px);
  }

  .peer--in-lobby.peer--party-landscape & {
    right: $lobby-width-mobile + $small-spacing;
    @media (min-width: $mobile-plus)  { right: $lobby-width-mobile-plus + $small-spacing; }
    @media (min-width: $desktop)      { right: $lobby-width-desktop + $small-spacing; }
    @media (min-width: $desktop-plus) { right: $lobby-width-desktop-plus + $small-spacing; }
    @media (min-width: $desktop-large){ right: $lobby-width-desktop-large + $small-spacing; }
    @media (min-width: $desktop-huge) { right: $lobby-width-desktop-huge + $small-spacing; }
  }

  .peer--in-lobby.peer--party-portrait & {
    bottom: $lobby-height-mobile + $small-spacing;
    @media (min-height: $mobile-plus-height)  { bottom: $lobby-height-mobile-plus + $small-spacing; }
    @media (min-height: $desktop-height)      { bottom: $lobby-height-desktop + $small-spacing; }
    @media (min-height: $desktop-plus-height) { bottom: $lobby-height-desktop-plus + $small-spacing; }
    @media (min-height: $desktop-large-height){ bottom: $lobby-height-desktop-large + $small-spacing; }
    @media (min-height: $desktop-huge-height) { bottom: $lobby-height-desktop-huge + $small-spacing; }
  }

  li {
    white-space: nowrap;
    svg {
      fill: currentColor;
      width: 1em;
      height: 1em;
      cursor: default;
      user-select: none;
      margin-right: 3px;
    }
  }

  button {
    @include inlineButton();
  }

  .close {
    @include closeButton(20px);
  }

  .more-info {
    & > * {
      width: 16px;
      height: 16px;
      fill: red;
    }
  }

  h2, h3 {
    font-weight: bold;
    cursor: default;
    margin-bottom: 4px;
  }

  section {
    margin-bottom: 7px;
  }
}
</style>
