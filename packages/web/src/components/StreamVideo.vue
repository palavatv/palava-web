<template>
  <video
    ref="videoEl"
    autoplay
    playsinline
    :class="{
      'media': status === 'video',
      'media--hidden': status !== 'video',
      'media--orientation-landscape': status === 'video' && orientation === 'landscape',
      'media--orientation-portrait': status === 'video' && orientation === 'portrait',
      'media--orientation-unknown': status === 'video' && orientation === 'unknown',
    }"
    @click="emit('click')"
    @keypress.enter="emit('click')"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { Peer } from '@palava/client'
import { attachMediaStream } from '@/composables/useWebrtc'

const props = defineProps<{
  peer: Peer
  status: string
  muted?: boolean
  requestFullscreen?: string | null
}>()

const emit = defineEmits<{ click: [] }>()

const videoEl = ref<HTMLVideoElement>()
const attached = ref(false)

const orientation = ref<'landscape' | 'portrait' | 'unknown'>('unknown')

function isMutedState(): boolean {
  return props.peer.isMuted() || props.peer.isLocal() || !!props.muted
}

function attachPeerStream() {
  if (!videoEl.value) return
  attachMediaStream(videoEl.value, props.peer.getStream(), isMutedState())
  attached.value = true
  updateOrientation()
}

function updateOrientation() {
  if (!attached.value || !videoEl.value) {
    orientation.value = 'unknown'
    return
  }
  orientation.value = videoEl.value.videoWidth < videoEl.value.videoHeight ? 'portrait' : 'landscape'
}

function onStreamReady() {
  attachPeerStream()
}

onMounted(() => {
  props.peer.on('stream_ready', onStreamReady)
  if (props.peer.isReady()) {
    attachPeerStream()
  }
})

onBeforeUnmount(() => {
  props.peer.off('stream_ready', onStreamReady)
})

watch(() => props.requestFullscreen, () => {
  videoEl.value?.requestFullscreen?.()
})

watch(() => props.muted, (newMuteStatus) => {
  if (videoEl.value) {
    videoEl.value.muted = !!newMuteStatus
  }
})
</script>

<style lang="scss" scoped>
video {
  background: black;
}

.media--hidden {
  height: 0;
}
</style>
