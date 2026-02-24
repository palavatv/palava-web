<template>
  <aside class="chat-panel">
    <header class="chat-panel__header">
      <h2 class="chat-panel__title">{{ t('chat.title') }}</h2>
      <button
        :title="t('chat.closeTitle')"
        class="chat-panel__close"
        @click="emit('close')"
      >
        <CrossIcon :alt="t('closeAlt')" :aria-label="t('closeAlt')" />
      </button>
    </header>

    <div class="chat-panel__messages" ref="messagesEl">
      <p v-if="messages.length === 0" class="chat-panel__empty">
        {{ t('chat.emptyState') }}
      </p>
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="{
          'chat-message': true,
          'chat-message--own': msg.own,
          'chat-message--other': !msg.own,
        }"
      >
        <span v-if="!msg.own" class="chat-message__sender">{{ msg.peerName }}</span>
        <span class="chat-message__text">{{ msg.text }}</span>
        <span class="chat-message__time">{{ formatTime(msg.timestamp) }}</span>
      </div>
    </div>

    <form class="chat-panel__input" @submit.prevent="sendMessage">
      <input
        v-model="inputText"
        type="text"
        :placeholder="t('chat.inputPlaceholder')"
        class="chat-panel__input-field"
        ref="inputEl"
      />
      <button type="submit" class="chat-panel__send" :title="t('chat.sendButton')">
        {{ t('chat.sendButton') }}
      </button>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CrossIcon from '@/assets/icons/cross.svg?component'

export interface DisplayMessage {
  id: string
  peerId: string
  peerName: string
  text: string
  timestamp: number
  own: boolean
}

const props = defineProps<{
  messages: DisplayMessage[]
}>()

const emit = defineEmits<{
  close: []
  send: [text: string]
}>()

const { t } = useI18n()

const inputText = ref('')
const messagesEl = ref<HTMLDivElement>()
const inputEl = ref<HTMLInputElement>()

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return
  emit('send', text)
  inputText.value = ''
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, scrollToBottom)

onMounted(() => {
  scrollToBottom()
  inputEl.value?.focus()
})
</script>

<style lang="scss">
.chat-panel {
  width: 320px;
  min-width: 320px;
  height: 100%;
  background: rgba(30, 30, 30, 0.95);
  display: flex;
  flex-direction: column;
  color: $white;
  @include defaultFont();

  @media (max-width: $mobile - 1px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1100;
    width: 100%;
    min-width: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $small-spacing $medium-spacing;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: $tiny-spacing;
    fill: $white;
    opacity: 0.7;
    width: 20px;
    height: 20px;

    &:hover {
      opacity: 1;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: $small-spacing;
    display: flex;
    flex-direction: column;
    gap: $small-spacing;
  }

  &__empty {
    color: $shade;
    text-align: center;
    margin-top: $large-spacing;
  }

  &__input {
    display: flex;
    padding: $small-spacing;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: $small-spacing;
  }

  &__input-field {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    color: $white;
    padding: $small-spacing $small-plus-spacing;
    @include defaultFont();
    outline: none;

    &::placeholder {
      color: $shade;
    }

    &:focus {
      border-color: $action-1;
    }
  }

  &__send {
    background: $action-1;
    color: $white;
    border: none;
    border-radius: 4px;
    padding: $small-spacing $small-plus-spacing;
    cursor: pointer;
    @include defaultFont();
    white-space: nowrap;

    &:hover {
      opacity: 0.9;
    }
  }
}

.chat-message {
  display: flex;
  flex-direction: column;
  max-width: 85%;
  padding: $small-spacing $small-plus-spacing;
  border-radius: 8px;
  word-break: break-word;

  &--own {
    align-self: flex-end;
    background: $action-1;
  }

  &--other {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.15);
  }

  &__sender {
    font-size: 11px;
    opacity: 0.7;
    margin-bottom: 2px;
  }

  &__text {
    white-space: pre-wrap;
  }

  &__time {
    font-size: 10px;
    opacity: 0.5;
    margin-top: 2px;
    align-self: flex-end;
  }
}
</style>
