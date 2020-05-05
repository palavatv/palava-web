<template>
  <div class="peer-status" @click="$emit('click')">
    <div v-if="status === 'audio'">
      <span class="symbol" role="img" aria-label="old telephone">☎︎</span>
    </div>
    <div v-else-if="status === 'not-ready'">
      <span class="symbol" role="img" aria-label="pulsating rectangels">
        <div class="lds-grid"><div/><div/><div/><div/><div/><div/><div/><div/><div/></div>
      </span>
    </div>
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
    text-shadow: 1px 1px 5px $black;

    .peer--on-stage & {
      font-size: 10vw;
      line-height: 100%;
    }
    .peer--in-lobby & {
      @include fontBig();
      line-height: 100%;
    }
  }

  .description {
    white-space: nowrap;
    text-shadow: 1px 1px 3px $black;

    .peer--on-stage & {
      font-size: 4vw;
      line-height: 100%;
    }
    .peer--in-lobby & {
      @include fontDefault();
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
  .peer--in-lobby & {
    transform: scale(80%);
  }
  .peer--on-stage & {
    transform: scale(120%);
  }
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
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
