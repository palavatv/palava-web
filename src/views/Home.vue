<template>
  <main class="home">
    <header>
      <button
        :title="$t('switchLanguageTitle')"
        class="switch-language"
        @click="switchLanguage"
        >
        <span :aria-label="$t('switchLanguageAlt')">{{ $root.$i18n.locale }}</span>
      </button>
    </header>

    <form class="signpost" v-if="browserCanUseWebrtc" @submit.prevent="goIntoRoom">
      <div class="logo">
        <router-link to="/info/about" :title="$t('home.palavaLogoTitle')">
          <inline-svg
            :alt="$t('palavaLogoAlt')"
            :src="require('../assets/palava.svg')"
            />
        </router-link>
      </div>

      <div class="room-selection">
        <input
          v-model="roomId"
          :placeholder="$t('home.roomIdPlaceholder')"
          ref="roomInput"
          maxlength="50"
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
          <inline-svg
            :alt="$t('palavaLogoAlt')"
            :src="require('../assets/palava.svg')"
            />
        </router-link>
      </div>

      <div class="no-support" v-html="$t('home.noSupportMessage')" />
    </div>

    <footer>
      <!-- <div v-if="providedBy">
        This palava.tv instance is provided by: {{ providedBy }}
      </div> -->
      <nav class="footer-social">
        <ul>
          <li>
            <a href="https://blog.palava.tv" :title="$t('home.blog')">
              <inline-svg
                :alt="$t('home.blog')"
                :aria-label="$t('home.blog')"
                :src="require('../assets/logo-rss.svg')"
                />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/palavatv" :title="$t('home.twitter')">
              <inline-svg
                :alt="$t('home.twitter')"
                :aria-label="$t('home.twitter')"
                :src="require('../assets/logo-twitter.svg')"
                />
            </a>
          </li>
          <li>
            <a href="https://github.com/palavatv/palava" :title="$t('home.github')">
              <inline-svg
                :alt="$t('home.github')"
                :aria-label="$t('home.github')"
                :src="require('../assets/logo-github.svg')"
                />
            </a>
          </li>
        </ul>
      </nav>

      <nav class="footer-navigation">
        <ul>
          <li><router-link to="/info/about">{{ $t('home.about') }}</router-link></li>
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
  mounted() {
    this.$refs.roomInput.focus()
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
    switchLanguage() {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'de' ? 'en' : 'de'
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
@import "@/css/styles.scss";

.home {
  min-height: 100%;
  color: $shade;
  display: flex;
  flex-direction: column;

  .signpost {
    width: 90vw;
    margin: auto;
    @media (min-width: $mobile) {
      width: 450px;
    }
    @media (min-height: $mobile-height) {
      margin-top: 13vh;
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
    svg {
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
    @include lightShadow();

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

  header {
    flex-basis: content;
    padding: $small-plus-spacing $small-spacing;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;

    .switch-language {
      text-transform: uppercase;
      margin-right: $small-spacing;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      @include footerFont();
      color: $shade;
      &:hover {
        color: $action-2;
      }
    }
  }

  footer {
    flex-basis: content;
    padding: $small-plus-spacing $small-spacing;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .footer-social {
    ul {
      display: flex;
      flex-direction: row;
    }

    li {
      margin: $tiny-spacing $small-plus-spacing $tiny-spacing $tiny-spacing;
      transform: translateY($small-spacing);
    }

    svg {
      width: $home-social-size;
      height: $home-social-size;
      fill: $gray;
      // filter: drop-shadow(1px 1px 4px rgba(150, 150, 150, 0.3));
      &:hover {
        fill: $action-2;
      }
    }
  }

  .footer-navigation {
    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
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
