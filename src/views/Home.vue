<template>
  <main class="home">
    <form class="signpost" v-if="browserCanUseWebrtc" @submit.prevent="goIntoRoom">
      <div class="logo">
        <router-link to="/info/about" :title="$t('home.palavaLogoTitle')">
          <inline-svg
            alt="$t('palavaLogoAlt')"
            :src="require('../assets/palava.svg')"
            @click="$refs.roomInput.focus()"
            />
        </router-link>
      </div>

      <div class="room-selection">
        <input
          v-model="roomId"
          :placeholder="$t('home.roomIdPlaceholder')"
          ref="roomInput"
          maxlength="50"
          autofocus
          />
        <button type="submit" :title="$t('home.goTitle')">
          <span role="img" :aria-label="$t('home.goAlt')">🕊︎</span>
        </button>
      </div>

      <div class="hidden-room">
        {{ $t('home.hiddenRoomIntro') }}
        <a href="/" @click.prevent="goIntoHiddenRoom" :title="$t('home.hiddenRoomTitle')">
          {{ $t("home.hiddenRoom") }}
        </a>
      </div>
    </form>

    <div class="signpost" v-else>
      <div class="logo">
        <router-link to="/info/about" :title="$t('home.palavaLogoTitle')">
          <img :alt="$t('palavaLogoAlt')" src="@/assets/palava.svg">
        </router-link>
      </div>

      <div class="no-support" v-html="$t('home.noSupportMessage')" />
    </div>

    <footer>
      <!-- <div v-if="providedBy">
        This palava.tv instance is provided by: {{ providedBy }}
      </div> -->
      <nav class="footer-navigation">
        <ul>
          <li><router-link to="/info/about">{{ $t('infoPages.about.title') }}</router-link></li>
          <!-- <li><a href="https://blog.palava.tv">Blog</a></li>
          <li><a href="https://github.com/palavatv/palava">GitHub</a></li>
          <li><a href="https://twitter.com/palavatv">Twitter</a></li> -->
          <li><router-link to="/info/ev">{{ $t('infoPages.ev.title') }}</router-link></li>
          <li><router-link to="/info/contact">{{ $t('infoPages.contact.title') }}</router-link></li>
          <li><router-link to="/info/privacy">{{ $t('infoPages.privacy.title') }}</router-link></li>
        </ul>
      </nav>
    </footer>
  </main>
</template>

<script>
import { uuid } from '@/support'
import { browserCanUseWebrtc } from '@/webrtc'

export default {
  components: {
  },
  data() {
    return {
      roomId: '',
    }
  },
  computed: {
    browserCanUseWebrtc() {
      return browserCanUseWebrtc() && this.$route.query.supported !== "0"
    },
    // providedBy() {
    //   return null
    // }
  },
  methods: {
    goIntoRoom() {
      if (this.roomId) {
        this.$router.push({ path: encodeURIComponent(this.roomId) })
      } else {
        this.goIntoHiddenRoom()
      }
    },
    goIntoHiddenRoom() {
      this.$router.push({ path: uuid() })
    },
  },
  metaInfo() {
    return {
      titleTemplate: null,
    }
  },
}
</script>

<style lang="scss">
@import "@/css/support.scss";

.home {
  min-height: 100%;
  color: $home-color;
  background: $home-background;
  display: flex;
  flex-direction: column;

  .signpost {
    width: 90vw;
    margin: auto;
    margin-top: 5vh;
    @media (min-width: $mobile) {
      width: 450px;
    }
    @media (min-height: $mobile-height) {
      margin-top: 18vh;
    }
    display: flex;
    flex-direction: column;
    > * {
      margin: 1vh auto;
      width: 100%;
      text-align: center;
    }
  }

  .logo {
    img {
      width: 30vw;
      height: 30vw;

      @media (min-width: $mobile-plus) {
        width: 250px;
        height: 250px;
      }

      border-radius: 50%;
      box-shadow: 0px 0px 4px $action-1;
    }
    a {
      display: inline-block;
    }
    margin-bottom: 3vh;
  }

  .room-selection {
    display: flex;
    padding: 0;
    padding-right: 1px;
    box-shadow: 1px 1px 3px rgba(83, 83, 83, 0.4);

    input, button {
      @include homeFont();
      padding: 4px 8px;
      letter-spacing: -1px;
      border: none;
      margin: 0;
    }

    input {
      flex: 1;
      background: white;
      &:focus, &:active {
        outline: none;
        // box-shadow: inherit;
      }
    }

    ::placeholder {
      letter-spacing: -1px;
      color: #999;
    }

    button[type=submit] {
      margin-right: -1px;
      cursor: pointer;
    }
  }

  .hidden-room {
    @include homeFont();
    white-space: nowrap;
    a {
      color: $action-2;
    }
  }

  footer {
    flex-basis: content;
    padding: $small-plus-spacing $small-spacing;
  }

  .footer-navigation {
    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    li {
      margin: auto $small-spacing;
      @include footerFont();
    }
  }

  .no-support {
  }
}
</style>
