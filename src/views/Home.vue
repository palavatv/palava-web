<template>
  <main class="home">
    <header>
      <LanguageSwitcher />
    </header>

    <form
      class="signpost"
      v-if="browserCanUseWebrtc"
      @submit.prevent="goIntoRoom"
    >
      <!-- Why isn't <Logo /> being used here? -->
      <div class="logo">
        <router-link
          to="/info/about"
          :title="$t('home.palavaLogoTitle')"
        >
          <inline-svg
            :alt="$t('palavaLogoAlt')"
            :src="logo"
          />
        </router-link>
      </div>

      <div class="room-selection">
        <!-- Add type text? -->
        <input
          v-model="roomId"
          :placeholder="$t('home.roomIdPlaceholder')"
          ref="roomInput"
          maxlength="50"
        >
        <button
          type="submit"
          :title="$t('home.goTitle')"
        >
          <inline-svg
            :alt="$t('home.goAlt')"
            :aria-label="$t('home.goAlt')"
            :src="goButton"
          />
        </button>
      </div>

      <div class="hidden-room">
        {{ $t('home.hiddenRoomIntro') }}
        <a
          href="/"
          @click.prevent="goIntoHiddenRoom"
          :title="$t('home.hiddenRoomTitle')"
        >
          {{ $t("home.hiddenRoom") }}
        </a>
      </div>
    </form>

    <div
      class="signpost"
      v-else
    >
      <div class="logo">
        <router-link
          to="/info/about"
          :title="$t('home.palavaLogoTitle')"
        >
          <inline-svg
            :alt="$t('palavaLogoAlt')"
            :src="logo"
          />
        </router-link>
      </div>

      <div
        class="no-support"
        v-html="$t('home.noSupportMessage')"
      />
    </div>

    <footer>
      <nav class="footer-social">
        <ul>
          <li>
            <a
              href="https://social.tchncs.de/@palavatv"
              :title="$t('home.mastodon')"
            >
              <inline-svg
                :alt="$t('home.mastodon')"
                :aria-label="$t('home.mastodon')"
                :src="mastodonLogo"
              />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/palavatv/palava"
              :title="$t('home.github')"
            >
              <inline-svg
                :alt="$t('home.github')"
                :aria-label="$t('home.github')"
                :src="githubLogo"
              />
            </a>
          </li>
        </ul>
      </nav>

      <nav class="footer-navigation">
        <ul>
          <li
            v-for="infoPage in infoPages"
            :key="infoPage.id"
          >
            <router-link :to="`/info/${infoPage.id}`">
              {{ infoPage.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </main>
</template>

<script>
import yyid from 'yyid';
import { browserCanUseWebrtc } from '../webrtc';
import { detectLanguage } from '../support';
import i18nStrings from '../i18nStrings';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

// Import SVGs
import logo from '../assets/icons/palava.svg';
import goButton from '../assets/icons/people-outline.svg';
import mastodonLogo from '../assets/icons/logo-mastodon.svg';
import githubLogo from '../assets/icons/logo-github.svg';

const lang = detectLanguage()

export default {
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      logo,
      goButton,
      mastodonLogo,
      githubLogo,
      roomId: '',
    };
  },
  computed: {
    browserCanUseWebrtc() {
      return browserCanUseWebrtc() && this.$route.query.supported !== "0"
    },
    infoPages() {
      return i18nStrings[lang].infoPages.filter((ip) => ip.linked !== false)
    }
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
      this.$router.push({ path: yyid() })
    },
  },
}
</script>

<style lang="scss">
@use "../css/styles.scss" as *;

.home {
  /* Layout */
  min-height: 100%;
  display: flex;
  flex-direction: column;

  /* Typography */
  color: $shade;

  .signpost {
    /* Box model */
    width: 90vw;
    margin: auto;
    margin-top: -$medium-plus-spacing; // language-switch

    /* Layout */
    display: flex;
    flex-direction: column;

    /* Responsive */
    @media (min-width: $mobile) {
      width: 450px;
    }
    @media (min-height: $mobile-height) {
      margin-top: 13vh;
    }
    > * {
      margin: 1vh auto;
      width: 100%;
      text-align: center;
    }
  }

  .logo {
    /* Box model */
    margin-bottom: 3vh;

    /* SVG styles */
    svg {
      /* Sizing */
      width: 30vw;
      height: 30vw;

      /* Visual */
      border-radius: 50%;
      box-shadow: 0px 0px 4px $action-1;

      /* Responsive */
      @media (min-width: $mobile-plus) {
        width: 250px;
        height: 250px;
      }
    }

    /* Link styles */
    a {
      display: inline-block;
    }
  }

  .room-selection {
    /* Wrap all styles in a nested block to avoid mixed declarations */
    & {
      /* Box model */
      padding: 0;
      padding-right: 1px;

      /* Layout */
      display: flex;

      /* Visual */
      @include lightShadow();
    }

    /* Input and button styles */
    input, button {
      /* Box model */
      padding: 4px 8px;
      margin: 0;
      border: none;

      /* Typography */
      & {
        @include homeFont();
      }

      /* Letter spacing */
      & {
        letter-spacing: -1px;
      }
    }

    /* Input styles */
    input {
      /* Layout */
      flex: 1;

      /* Visual */
      background: white;

      /* States */
      &:focus, &:active {
        outline: none;
        // box-shadow: inherit;
      }
    }

    /* Placeholder styles */
    &::placeholder {
      /* Typography */
      letter-spacing: -1px;
      color: #999;
    }

    /* Submit button styles */
    button[type=submit] {
      /* Box model */
      appearance: none;
      margin-right: -1px;

      /* Layout */
      flex-shrink: 0;

      /* Visual */
      background: $white;
      cursor: pointer;

      /* Include home symbol */
      & {
        @include homeSymbol();
      }

      /* States */
      &:focus {
        outline: 1px dashed $action-2;
      }

      /* SVG icon */
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .hidden-room {
    /* Wrap styles in a nested block to avoid mixed declarations */
    & {
      /* Typography */
      @include homeFont();
    }

    /* White space */
    & {
      white-space: nowrap;
    }

    /* Link styles */
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

    .language-switcher {
      margin-right: $small-spacing;
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
      & {
        @include footerFont();
      }
    }
  }
}
</style>
