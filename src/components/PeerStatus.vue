<template>
  <div class="peer-status" @click="$emit('click')">
    <div v-if="status === 'audio'">
      <span class="symbol" role="img" aria-label="megaphone">☎︎</span>
    </div>
    <!-- <div v-else-if="status === 'not-ready'">
      <span class="symbol" role="img" aria-label=""></span>
    </div> -->
    <div v-else-if="status === 'no-media'">
      <span class="symbol" role="img" aria-label="speech bubble">🗨︎</span>
    </div>
    <div v-else-if="status === 'error'">
      <span class="symbol" role="img" aria-label="cross mark">✖</span>
      <div v-if="error === 'connection_closed'" class="description">Connection closed</div>
      <div v-else-if="error === 'connection_failed'" class="description">No connection</div>
      <div v-else-if="error === 'connection_disconnected'" class="description">Disconnected</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
@import "@/css/support.scss";

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

  .symbol, .description {
    color: white;
    text-shadow: 1px 1px 1px $action-1;
    opacity: 0.6;
    cursor: default;
    user-select: none;
    line-height: 100%;
  }

  .symbol {
    .peer--on-stage & {
      font-size: 10vw;
    }
    .peer--in-lobby & {
      @include fontBig();
    }
  }

  .description {
    white-space: nowrap;

    .peer--on-stage & {
      font-size: 4vw;
    }
    .peer--in-lobby & {
      @include fontDefault();
    }
  }
}
</style>
