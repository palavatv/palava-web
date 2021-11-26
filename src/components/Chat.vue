<template>
  <li class="peer chat-peer">
      <div class="chat">
        <div class="messages-area">
          <div class="message-and-avatar message-and-avatar--right" v-if="peerCount == 1">
            <span class="message message-error" v-html="$t('chat.error')"></span>
          </div>
          <div class="message-and-avatar"
            v-for="chatMessage in chatMessages" :key="chatMessage.time"
            :class="{'message-and-avatar--right': chatMessage.from !== localPeerId}">
            <PeerAvatar :peerId="chatMessage.from" />
            <span class="message" :title="chatMessage.time" v-html="escapeHTML(chatMessage.msg)">
            </span>
          </div>
        </div>
        <form class="send-area">
          <input type="textarea" aria-label="Write message" v-model="newChatMessage" />
          <button type="submit" @click.prevent="sendChatMessage()">
            <inline-svg
              :alt="$t('chat.sendAlt')"
              :src="require('../assets/send.svg')"
              />
          </button>
        </form>
      </div>
  </li>
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
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.chat-peer {
  height: 100%;
  width: 100%;
}

.chat {
  background: $chat-background;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @include defaultFont()
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
      display: inline-flex;
      margin: 0 0.2em;
      padding: 0.25em 0.5em;
      background-color: white;
      border-radius: 3px;
      text-align: left;
      word-break: break-word;
    }

    .message-error {
      color: white;
      background-color: lighten($action-3, 15%);
      padding: 0.5em 0.75em;
    }

    .avatar {
      margin: 0.1em;
    }

    &--right {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}

.send-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25em;

  input {
    flex: 1;
    border-radius: 3px;
    padding: 0.5em 0.5em;
    padding-right: 2em;
    background-color: white;
    border: 0.1em solid $gray;

    &:focus {
      border: 0.1em solid darken($chat-background, 30%);

      +button {
        color: darken($chat-background, 45%);
      }
    }
  }

  button {
    position: absolute;
    cursor: pointer;
    color: $chat-background;
    fill: currentColor;
    align-self: center;
    width: $small-control-size;
    height: $small-control-size;
    padding: 0.25em;
    right: 0.3em;

    &:hover, &:focus {
      color: $action-1;
    }
  }
}
</style>
