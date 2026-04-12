<template>
  <video
    ref="videoEl"
    tabindex="0"
    role="button"
    autoplay
    playsinline
    :class="{
      media: status === 'video',
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
import type { Peer } from '@palava/client'

const { attachMediaStream } = useWebRTC()

const props = withDefaults(defineProps<{
  peer: Peer
  status: string
  muted?: boolean
  requestFullscreen?: string | null
}>(), {
  muted: false,
  requestFullscreen: null,
})

const emit = defineEmits<{
  click: []
  videoReady: []
}>()

const videoEl = ref<HTMLVideoElement>()
const attached = ref(false)
const orientation = ref<'unknown' | 'portrait' | 'landscape'>('unknown')

function isMuted() {
  return props.peer.isMuted() || props.peer.isLocal() || props.muted
}

function attachPeerStream() {
  if (!videoEl.value) return
  const stream = props.peer.getStream()
  // Skip re-attach if the same MediaStream is already bound — re-assigning
  // srcObject to the same stream causes a one-frame flicker in the local
  // preview when tracks are added/removed live.
  if (videoEl.value.srcObject === stream) return
  attachMediaStream(videoEl.value, stream, isMuted())
  attached.value = true
}

function attachPeerStreamWhenReady() {
  props.peer.on('stream_ready', attachPeerStream)
  if (props.peer.isReady()) {
    attachPeerStream()
  }
}

watch(() => props.requestFullscreen, () => {
  videoEl.value?.requestFullscreen()
})

watch(() => props.muted, (newMuteStatus) => {
  if (videoEl.value) {
    videoEl.value.muted = newMuteStatus
  }
})

function updateOrientation() {
  if (!videoEl.value) {
    orientation.value = 'unknown'
  } else if (videoEl.value.videoWidth < videoEl.value.videoHeight) {
    orientation.value = 'portrait'
  } else {
    orientation.value = 'landscape'
  }
}

function onLoadedMetadata() {
  updateOrientation()
  emit('videoReady')
}

onMounted(() => {
  videoEl.value?.addEventListener('loadedmetadata', onLoadedMetadata)
  attachPeerStreamWhenReady()

  // Re-attach stream when tracks are added (for dynamically enabling video/audio)
  props.peer.on('video_added', attachPeerStream)
  props.peer.on('audio_added', attachPeerStream)
})

onBeforeUnmount(() => {
  videoEl.value?.removeEventListener('loadedmetadata', onLoadedMetadata)
  props.peer.off('stream_ready', attachPeerStream)
  props.peer.off('video_added', attachPeerStream)
  props.peer.off('audio_added', attachPeerStream)
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
