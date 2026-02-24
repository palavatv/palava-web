<template>
  <main class="home">
    <header>
      <LanguageSwitcher />
    </header>

    <form class="signpost" v-if="canUseWebrtc" @submit.prevent="goIntoRoom">
      <div class="logo">
        <router-link to="/info/about" :title="t('home.palavaLogoTitle')">
          <PalavaIcon :alt="t('palavaLogoAlt')" />
        </router-link>
      </div>

      <div class="room-selection">
        <input
          v-model="roomId"
          :placeholder="t('home.roomIdPlaceholder')"
          ref="roomInput"
          maxlength="50"
        />
        <button type="submit" :title="t('home.goTitle')">
          <PeopleIcon :alt="t('home.goAlt')" :aria-label="t('home.goAlt')" />
        </button>
      </div>

      <div class="hidden-room">
        {{ t('home.hiddenRoomIntro') }}
        <a href="/" @click.prevent="goIntoHiddenRoom" :title="t('home.hiddenRoomTitle')">
          {{ t('home.hiddenRoom') }}
        </a>
      </div>
    </form>

    <div class="signpost" v-else>
      <div class="logo">
        <router-link to="/info/about" :title="t('home.palavaLogoTitle')">
          <PalavaIcon :alt="t('palavaLogoAlt')" />
        </router-link>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="no-support" v-html="t('home.noSupportMessage')" />
    </div>

    <footer>
      <nav class="footer-social">
        <ul>
          <li>
            <a href="https://blog.palava.tv" :title="t('home.blog')">
              <RssIcon :alt="t('home.blog')" :aria-label="t('home.blog')" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/palavatv" :title="t('home.twitter')">
              <TwitterIcon :alt="t('home.twitter')" :aria-label="t('home.twitter')" />
            </a>
          </li>
          <li>
            <a href="https://github.com/palavatv/palava" :title="t('home.github')">
              <GithubIcon :alt="t('home.github')" :aria-label="t('home.github')" />
            </a>
          </li>
        </ul>
      </nav>

      <nav class="footer-navigation">
        <ul>
          <li v-for="infoPage in infoPages" :key="infoPage.id">
            <router-link :to="`/info/${infoPage.id}`">
              {{ infoPage.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { browserCanUseWebrtc } from '@/composables/useWebrtc'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import PalavaIcon from '@/assets/icons/palava.svg?component'
import PeopleIcon from '@/assets/icons/people-outline.svg?component'
import RssIcon from '@/assets/icons/logo-rss.svg?component'
import TwitterIcon from '@/assets/icons/logo-twitter.svg?component'
import GithubIcon from '@/assets/icons/logo-github.svg?component'
import en from '@/i18n/en'
import de from '@/i18n/de'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

const roomId = ref('')
const roomInput = ref<HTMLInputElement>()

const messages: Record<string, typeof en> = { en, de }

const canUseWebrtc = computed(() =>
  browserCanUseWebrtc() && route.query.supported !== '0',
)

const infoPages = computed(() => {
  const msgs = messages[locale.value] ?? en
  return msgs.infoPages.filter((ip) => !('linked' in ip && ip.linked === false))
})

onMounted(() => {
  roomInput.value?.focus()
  document.title = 'palava.tv'
})

function goIntoRoom() {
  if (roomId.value) {
    router.push({ path: encodeURIComponent(roomId.value) })
  } else {
    goIntoHiddenRoom()
  }
}

function goIntoHiddenRoom() {
  router.push({ path: crypto.randomUUID() })
}
</script>

<style lang="scss">
.home {
  min-height: 100%;
  color: $shade;
  display: flex;
  flex-direction: column;

  .signpost {
    width: 90vw;
    margin: auto;
    margin-top: -$medium-plus-spacing;
    @media (min-width: $mobile) { width: 450px; }
    @media (min-height: $mobile-height) { margin-top: 13vh; }
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
      @media (min-width: $mobile-plus) { width: 250px; height: 250px; }
      border-radius: 50%;
      box-shadow: 0px 0px 4px $action-1;
    }
    a { display: inline-block; }
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
      &:focus, &:active { outline: none; }
    }

    ::placeholder { letter-spacing: -1px; color: #999; }

    button[type=submit] {
      appearance: none;
      margin-right: -1px;
      cursor: pointer;
      flex-shrink: 0;
      background: $white;
      &:focus { outline: 1px dashed $action-2; }
      @include homeSymbol();
      svg { width: 100%; height: 100%; }
    }
  }

  .hidden-room {
    @include homeFont();
    white-space: nowrap;
    a { color: $action-2; }
  }

  header {
    flex-basis: content;
    padding: $small-plus-spacing $small-spacing;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    .language-switcher { margin-right: $small-spacing; }
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
    ul { display: flex; flex-direction: row; }
    li {
      margin: $tiny-spacing $small-plus-spacing $tiny-spacing $tiny-spacing;
      transform: translateY($small-spacing);
    }
    svg {
      width: $home-social-size;
      height: $home-social-size;
      fill: $gray;
      &:hover { fill: $action-2; }
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
}
</style>
