<template>
  <div class="peer-status" @click="emit('click')" @keypress.enter="emit('click')">
    <div v-if="status === 'audio'">
      <PhoneIcon class="symbol" :alt="t('peer.statusAudioAlt')" :aria-label="t('peer.statusAudioAlt')" />
    </div>
    <div v-else-if="status === 'not-ready'">
      <span class="symbol" role="img" :aria-label="t('peer.statusNotReadyAlt')">
        <div class="lds-grid"><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
      </span>
      <div class="description">{{ t('peer.waiting') }}</div>
    </div>
    <div v-else-if="status === 'no-media'">
      <BlockIcon class="symbol" :aria-label="t('peer.statusNoMediaAlt')" :alt="t('peer.statusNoMediaAlt')" />
      <div class="description">{{ t('peer.noMedia') }}</div>
    </div>
    <div v-else-if="status === 'error'">
      <CircleCrossIcon class="symbol" :aria-label="t('peer.statusErrorAlt')" :alt="t('peer.statusErrorAlt')" />
      <div v-if="error === 'connection_closed'" class="description">{{ t('peer.errorConnectionClosed') }}</div>
      <div v-else-if="error === 'connection_failed'" class="description">{{ t('peer.errorConnectionFailed') }}</div>
      <div v-else-if="error === 'connection_disconnected'" class="description">{{ t('peer.errorConnectionDisconnected') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PhoneIcon from '@/assets/icons/phone.svg?component'
import BlockIcon from '@/assets/icons/block.svg?component'
import CircleCrossIcon from '@/assets/icons/circle-with-cross.svg?component'

defineProps<{
  status: string
  error?: string | null
}>()

const emit = defineEmits<{ click: [] }>()
const { t } = useI18n()
</script>

<style lang="scss">
.peer-status {
  position: absolute;
  left: $stage-gap;
  right: $stage-gap;
  top: $stage-gap;
  bottom: $stage-gap;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 400;
  > * {
    transform: translateY(-15%);
  }

  .symbol, .description {
    color: $white;
    opacity: 0.6;
    cursor: default;
    user-select: none;
  }

  .symbol {
    fill: white;
    filter: drop-shadow(1px 1px 1px $black);

    .peer--on-stage & {
      width: 10vw;
      height: 10vw;
    }
    .peer--in-lobby & {
      width: 5vw;
      height: 5vw;
    }
  }

  .description {
    white-space: nowrap;
    text-shadow: 1px 1px 2px $black;

    .peer--on-stage & {
      margin-top: $small-spacing;
      font-size: 4vw;
      line-height: 100%;
    }
    .peer--in-lobby & {
      @include defaultFont();
      margin-top: $tiny-spacing;
      line-height: 100%;
    }
  }
}

// based on https://loading.io/css/
.lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  .peer--in-lobby & { transform: scale(80%); }
  .peer--on-stage & { transform: scale(120%); }
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
  box-shadow: 1px 1px 5px $black;
}
.lds-grid div:nth-child(1) { top: 8px; left: 8px; animation-delay: 0s; }
.lds-grid div:nth-child(2) { top: 8px; left: 32px; animation-delay: -0.4s; }
.lds-grid div:nth-child(3) { top: 8px; left: 56px; animation-delay: -0.8s; }
.lds-grid div:nth-child(4) { top: 32px; left: 8px; animation-delay: -0.4s; }
.lds-grid div:nth-child(5) { top: 32px; left: 32px; animation-delay: -0.8s; }
.lds-grid div:nth-child(6) { top: 32px; left: 56px; animation-delay: -1.2s; }
.lds-grid div:nth-child(7) { top: 56px; left: 8px; animation-delay: -0.8s; }
.lds-grid div:nth-child(8) { top: 56px; left: 32px; animation-delay: -1.2s; }
.lds-grid div:nth-child(9) { top: 56px; left: 56px; animation-delay: -1.6s; }
@keyframes lds-grid {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
