<template>
  <div class="lds-grid">
    <div /><div /><div /><div /><div /><div /><div /><div /><div />
  </div>
</template>

<style lang="scss" scoped>
// Loading spinner: 3x3 grid of pulsing dots with staggered animation
// Context-specific scaling (lobby/stage) is handled by parent Peer.vue using :deep()
.lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    animation: lds-grid 1.2s linear infinite;
    box-shadow: 1px 1px 5px $black;

    // Position each dot in 3x3 grid with staggered animation delays
    &:nth-child(1) { top: 8px; left: 8px; animation-delay: 0s; }
    &:nth-child(2) { top: 8px; left: 32px; animation-delay: -0.4s; }
    &:nth-child(3) { top: 8px; left: 56px; animation-delay: -0.8s; }
    &:nth-child(4) { top: 32px; left: 8px; animation-delay: -0.4s; }
    &:nth-child(5) { top: 32px; left: 32px; animation-delay: -0.8s; }
    &:nth-child(6) { top: 32px; left: 56px; animation-delay: -1.2s; }
    &:nth-child(7) { top: 56px; left: 8px; animation-delay: -0.8s; }
    &:nth-child(8) { top: 56px; left: 32px; animation-delay: -1.2s; }
    &:nth-child(9) { top: 56px; left: 56px; animation-delay: -1.6s; }
  }
}

@keyframes lds-grid {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
