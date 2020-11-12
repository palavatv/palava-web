<template>
  <li class="peer chat-peer">
      <div class="chat">
        <div class="messages-area">
          <div class="message-and-avatar"
            v-for="chatMessage in chatMessages" :key="chatMessage.time"
            :class="{'message-and-avatar--right': chatMessage.from !== localPeerId}">
            <PeerAvatar :peerId="chatMessage.from" v-if="chatMessage.from !== 'error'" />
            <span class="message" :title="chatMessage.time" v-html="escapeHTML(chatMessage.msg)"
                  :class="{'message-error': chatMessage.from === 'error'}">
            </span>
          </div>
        </div>
        <form class="send-area">
          <input type="text" aria-label="Write message" v-model="newChatMessage" />
          <button type="submit" @click.prevent="sendChatMessage()">▸</button>
        </form>
      </div>
  </li>
</template>

<script>
import PeerAvatar from "@/components/PeerAvatar.vue"

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
        .replace(/'/g, "&#039;");

      const urlRegex = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
      return escaped.replace(urlRegex, '<a href="$&">$&</a>')
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
  background: pink;
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
  margin-bottom: 1em;

  .message-and-avatar {
    display: flex;
    align-items: center;
    margin: 0.3em 1em;

    .message {
      display: inline-block;
      margin: 0 0.2em;
      padding: 0 0.5em;
      background-color: white;
      border-radius: 3px;
    }

    .message-error {
      color: white;
      background-color: red;
    }

    &--right {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}

.send-area {
  width: 100%;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
  }
}
</style>
