<template>
  <aside class="network-info">
    <button @click="$emit('close')"><span role="img" aria-label="cross mark">❌︎</span></button>

    <section>
      <h2>{{ isRelayed ? "Relayed" : "Direct" }} connection</h2>
    </section>

    <section>
      <h3>Remote IPs</h3>
      <ul>
        <li v-for="ip in remotePrimaryIps" :key="ip" title="Primary IP">
          <span role="img" aria-label="star">★</span>{{ ip }}
        </li>
        <li v-for="ip in remoteCandidateIps" :key="ip"  title="Candidate IP">
          <span role="img" aria-label="circle">⚪︎</span>{{ ip }}
        </li>
      </ul>
    </section>

    <section>
      <h3>Local IPs</h3>
      <ul>
        <li v-for="ip in localPrimaryIps" :key="ip" title="Primary IP">
          <span role="img" aria-label="star">★</span>{{ ip }}
        </li>
        <li v-for="ip in localCandidateIps" :key="ip"  title="Candidate IP">
          <span role="img" aria-label="circle">⚪︎</span>{{ ip }}
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import { getRemoteNetworkInfo, getLocalNetworkInfo } from "@/webrtc"

export default {
  props: {
    peer: {
      type: Object,
      required: true,
    }
  },
  computed: {
    remoteNetworkInfo() {
      return getRemoteNetworkInfo(this.peer.peerConnection)
    },
    localNetworkInfo() {
      return getLocalNetworkInfo(this.peer.peerConnection)
    },
    isRelayed() {
      return false
    },
    localPrimaryIps() {
      return this.localNetworkInfo.primaryIps.map((ip) => ip.address)
    },
    localCandidateIps() {
      return this.localNetworkInfo.candidateIps.map((ip) => ip.address)
    },
    remotePrimaryIps() {
      return this.remoteNetworkInfo.primaryIps.map((ip) => ip.address)
    },
    remoteCandidateIps() {
      return this.remoteNetworkInfo.candidateIps.map((ip) => ip.address)
    },
  },
}
</script>

<style lang="scss">
@import '@/css/support.scss';

.network-info {
  position: absolute;
  z-index: 700;
  border: 1px solid $action-1;
  border-radius: 14px;
  background: white;
  color: $action-1;
  padding: 7px 8px 1px;
  @include fontDefault();

  .peer--party-landscape & {
    right: 192px;
  }

  .peer--party-portrait & {
    bottom: 144px;
  }

  li {
    white-space: nowrap;
    span[role=img] {
      cursor: default;
      user-select: none;
      padding-right: 7px;
    }
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    color: $action-1;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansSymbols2;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px $action-1;
    }
  }

  h2, h3 {
    font-weight: bold;
    cursor: default;
  }

  section {
    margin-bottom: 6px;
  }
}
</style>
