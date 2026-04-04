<template>
  <div
    tabindex="0"
    role="button"
    class="peer-status"
    @click="emit('click')"
    @keypress.enter="emit('click')"
  >
    <div v-if="status === 'audio'">
      <PhoneIcon class="symbol" :aria-label="t('peer.statusAudioAlt')" role="img" />
    </div>
    <div v-else-if="status === 'not-ready'">
      <span
        class="symbol"
        role="img"
        :aria-label="t('peer.statusNotReadyAlt')"
      >
        <LoadingSpinner />
      </span>
      <p class="description">
        {{ t('peer.waiting') }}
      </p>
    </div>
    <div v-else-if="status === 'no-media'">
      <BlockIcon class="symbol" :aria-label="t('peer.statusNoMediaAlt')" role="img" />
      <p class="description">
        {{ t('peer.noMedia') }}
      </p>
    </div>
    <div v-else-if="status === 'error'">
      <CircleWithCrossIcon class="symbol" :aria-label="t('peer.statusErrorAlt')" role="img" />
      <p v-if="error === 'connection_closed'" class="description">
        {{ t('peer.errorConnectionClosed') }}
      </p>
      <p v-else-if="error === 'connection_failed'" class="description">
        {{ t('peer.errorConnectionFailed') }}
      </p>
      <p v-else-if="error === 'connection_disconnected'" class="description">
        {{ t('peer.errorConnectionDisconnected') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhoneIcon from '@/assets/icons/phone.svg?component'
import BlockIcon from '@/assets/icons/block.svg?component'
import CircleWithCrossIcon from '@/assets/icons/circle-with-cross.svg?component'

const { t } = useI18n()

defineProps<{
  status: string
  error?: string | null
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<style lang="scss">
.peer-status {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
</style>
