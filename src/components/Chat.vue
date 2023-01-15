<template>
  <aside class="chat-panel" tabindex="0" @keydown.esc="$emit('close')">
    <button class="close" @click="$emit('close')">
      <inline-svg
        :aria-label="$t('closeAlt')"
        :src="require('../assets/icons/cross.svg')"
        />
    </button>

    <div class="messages-area">
      <div class="message-and-avatar" v-if="peerCount == 1">
        <span class="message message-error" v-html="$t('chat.error')">
        </span>
      </div>

      <div class="message-and-avatar"
        v-for="chatMessage in chatMessages" :key="chatMessage.time"
        :class="{'message-and-avatar--right': chatMessage.from !== localPeerId}">
        <PeerAvatar :peerId="chatMessage.from" />
        <span class="message"
          :title="displayTime(chatMessage.time)"
          v-html="escapeHTML(chatMessage.msg)">
        </span>
      </div>
    </div>

    <form class="send-area">
      <input type="textarea"
        ref="messageInput"
        v-model="newChatMessage"
        :aria-label="$t('chat.messagePlaceholder')"
        :placeholder="$t('chat.messagePlaceholder')" />
      <button type="submit" :title="$t('chat.sendAlt')" @click.prevent="sendChatMessage()">
        <inline-svg
          :alt="$t('chat.sendAlt')"
          :aria-label="$t('chat.sendAlt')"
          :src="require('../assets/send.svg')"
          />
      </button>
    </form>
  </aside>
</template>

<script>
import PeerAvatar from '@/components/PeerAvatar.vue'

export default {
  props: {
    chatMessages: {
      type: Array,
      required: true,
    },
    localPeerId: {
      type: String,
      required: true,
    },
    peerCount: {
      type: Number,
      required: true,
    },
  },
  components: {
    PeerAvatar,
  },
  data() {
    return {
      newChatMessage: "",
    }
  },
  mounted() {
    this.$refs.messageInput.focus()
  },
  methods: {
    escapeHTML(str) {
      const escaped = str
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

      const urlRegex = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
      const urlTemplate = '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>'
      return escaped.replace(urlRegex, urlTemplate)
    },
    sendChatMessage() {
      if (this.newChatMessage === "") return;
      const newMessage = {
        from: this.localPeerId,
        msg: this.newChatMessage,
        time: (new Date()).getTime(),
      }

      this.$emit('send-chat-message', newMessage)
      this.newChatMessage = ""
    },
    displayTime(time) {
      return new Date(time).toLocaleString()
    },
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.chat-panel {
  background: $chat-background;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 54px;

  @include chatFont();
  @include defaultShadow();
  outline: none;

  .close {
    @include inlineButton();
    @include closeButton(36px);
  }
}

.messages-area {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 0.5em;

  .message-and-avatar {
    display: flex;
    align-items: flex-start;
    margin: 0.3em 0.65em;

    .message {
      display: inline-block;
      margin: 0 0.2em;
      padding: 0.25em 0.5em;
      background-color: white;
      border-radius: 3px;
      text-align: left;
      word-break: break-word;
    }

    .avatar {
      margin: 0.1em;
    }

    .message-error {
      flex: 1;
      color: white;
      background-color: lighten($action-3, 15%);
    }

    &--right {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}

.send-area {
  display: flex;
  padding: 0.2em;
  padding-top: 0;
  flex-direction: row;
  align-items: center;
  @include lightShadow();

  input, button {
    @include chatFont();
    padding: 0 8px;
    letter-spacing: -1px;
    border: none;
    margin: 0;
  }

  input {
    flex: 1;
    height: 100%;
    background: white;

    &:focus, &:active {
      outline: none;

      +button {
        color: $action-1;
      }
    }
  }

  ::placeholder {
    letter-spacing: -1px;
    color: #999;
  }

  button[type=submit] {
    appearance: none;
    cursor: pointer;
    flex-shrink: 0;
    background: $white;
    color: darken($chat-background, 10%);
    fill: currentColor;
    &:focus {
      outline: 1px dashed $action-2;
      color: $action-1;
    }
    @include homeSymbol();
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
