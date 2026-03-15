<template>
  <aside class="network-info">
    <button class="close" @click="emit('close')">
      <CrossIcon :alt="t('closeAlt')" :aria-label="t('closeAlt')" />
    </button>

    <section>
      <h2>
        {{ relayStatusLocalized }}
        <button class="more-info" @click="emit('open-info-screen', 'network')" :title="t('moreInfoTitle')">
          <InfoIcon :alt="t('moreInfoAlt')" :aria-label="t('moreInfoAlt')" />
        </button>
      </h2>
    </section>

    <section>
      <h3>{{ t('networkInfo.remoteIps') }}</h3>
      <ul>
        <li v-for="ip in allRemoteIps" :key="ip" :title="t('networkInfo.ipTitle')">
          <DotIcon :aria-label="t('networkInfo.ipAlt')" :alt="t('networkInfo.ipAlt')" />
          {{ ip }}
          <span v-if="allRelayIps.includes(ip)"> ({{ t('networkInfo.ipIsRelay') }})</span>
        </li>
      </ul>
    </section>

    <section>
      <h3>{{ t('networkInfo.localIps') }}</h3>
      <ul>
        <li v-for="ip in allLocalIps" :key="ip" :title="t('networkInfo.ipTitle')">
          <DotIcon :aria-label="t('networkInfo.ipAlt')" :alt="t('networkInfo.ipAlt')" />
          {{ ip }}
          <span v-if="allRelayIps.includes(ip)"> ({{ t('networkInfo.ipIsRelay') }})</span>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RemotePeer } from '@palava/client'
import { getRemoteIps, getLocalIps, getRelayIps, getMyRelayStatus } from '@/composables/useWebrtc'
import CrossIcon from '@/assets/icons/cross.svg?component'
import InfoIcon from '@/assets/icons/info-with-circle.svg?component'
import DotIcon from '@/assets/icons/dot-single.svg?component'

const props = defineProps<{ peer: RemotePeer }>()
const emit = defineEmits<{
  close: []
  'open-info-screen': [page: string]
}>()

const { t } = useI18n()
const relayStatus = ref<string | null>(null)

onMounted(() => {
  if (!props.peer.peerConnection) return

  getMyRelayStatus(props.peer.peerConnection).then((iAmRelayed) => {
    if (iAmRelayed) {
      relayStatus.value = 'relayed'
    } else if (allRemoteIps.value?.some((ip) => allRelayIps.value.includes(ip))) {
      relayStatus.value = 'relayed'
    } else {
      relayStatus.value = 'direct'
    }
  })
})

const allLocalIps = computed(() => getLocalIps(props.peer.peerConnection))
const allRemoteIps = computed(() => getRemoteIps(props.peer.peerConnection))
const allRelayIps = computed(() => getRelayIps())

const relayStatusLocalized = computed(() => {
  if (relayStatus.value === 'relayed') return t('networkInfo.relayedConnection')
  if (relayStatus.value === 'direct') return t('networkInfo.directConnection')
  return t('networkInfo.unknownConnection')
})
</script>

<style lang="scss">
.network-info {
  position: absolute;
  .lobby & { position: fixed; }
  z-index: 700;
  border-radius: $lobby-border-radius;
  background: white;
  opacity: 0.8;
  color: $action-1;
  padding: 7px 8px 1px;
  @include lightShadow();
  @include defaultFont();
  text-align: left;

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

  button { @include inlineButton(); }
  .close { @include closeButton(20px); }
  .more-info {
    & > * { width: 16px; height: 16px; fill: red; }
  }

  h2, h3 { font-weight: bold; cursor: default; margin-bottom: 4px; }
  section { margin-bottom: 7px; }
}
</style>
