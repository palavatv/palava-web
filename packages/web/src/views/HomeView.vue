<template>
  <main class="home">
    <header>
      <LanguageSwitcher />
    </header>

    <form
      class="signpost"
      v-if="browserCanUseWebRTC"
      @submit.prevent="goIntoRoom"
    >
      <div class="logo">
        <router-link
          to="/info/about"
          :title="t('home.palavaLogoTitle')"
        >
          <PalavaIcon :aria-label="t('palavaLogoAlt')" role="img" />
        </router-link>
      </div>

      <div class="room-selection">
        <input
          v-model="roomId"
          :placeholder="t('home.roomIdPlaceholder')"
          ref="roomInput"
          maxlength="50"
          type="text"
        >
        <button
          type="submit"
          :title="t('home.goTitle')"
        >
          <SubmitIcon :aria-label="t('home.goAlt')" role="img" />
        </button>
      </div>

      <div class="hidden-room">
        {{ t('home.hiddenRoomIntro') }}
        <a
          href="/"
          @click.prevent="goIntoHiddenRoom"
          :title="t('home.hiddenRoomTitle')"
        >
          {{ t("home.hiddenRoom") }}
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
          :title="t('home.palavaLogoTitle')"
        >
          <PalavaIcon :aria-label="t('palavaLogoAlt')" role="img" />
        </router-link>
      </div>

      <div
        class="no-support"
        v-html="t('home.noSupportMessage')"
      />
    </div>

    <footer>
      <nav class="footer-social">
        <ul>
          <li>
            <a
              href="https://github.com/palavatv/palava"
              :title="t('home.github')"
            >
              <LogoGithubIcon :aria-label="t('home.github')" role="img" />
            </a>
          </li>
          <li>
            <a
              href="https://social.tchncs.de/@palavatv"
              :title="t('home.mastodon')"
            >
              <LogoMastodonIcon :aria-label="t('home.mastodon')" role="img" />
            </a>
          </li>
        </ul>
      </nav>

      <nav class="footer-navigation">
        <ul>
          <li
            v-for="page in infoPages"
            :key="page.id"
          >
            <router-link :to="`/info/${page.id}`">
              {{ page.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </main>
</template>

<script setup lang="ts">
import PalavaIcon from '@/assets/icons/palava.svg?component'
import SubmitIcon from '@/assets/icons/people-outline.svg?component'
import LogoGithubIcon from '@/assets/icons/logo-github.svg?component'
import LogoMastodonIcon from '@/assets/icons/logo-mastodon.svg?component'

const { t, tm, rt } = useI18n()
const router = useRouter()
const route = useRoute()
const { checkWebRTCSupport } = useWebRTC()

const roomInput = ref<HTMLInputElement>()
const roomId = ref('')

const infoPages = computed(() => {
  const pages = tm('infoPages') as any[]
  return pages
    .map(p => ({
      ...p,
      id: rt(p.id),
      title: rt(p.title),
      content: rt(p.content),
    }))
    .filter(p => p.linked !== false)
})

const browserCanUseWebRTC = computed(() => {
  return checkWebRTCSupport() && route.query.supported !== '0'
})

onMounted(() => {
  roomInput.value?.focus()
})

function goIntoRoom() {
  if (roomId.value) {
    router.push(`/${encodeURIComponent(roomId.value.toLowerCase())}`)
  } else {
    goIntoHiddenRoom()
  }
}

function goIntoHiddenRoom() {
  const randomId = crypto.randomUUID().slice(0, 8)
  router.push(`/${randomId}`)
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: $shade;

  .signpost {
    width: 90vw;
    margin: auto;
    margin-top: -$medium-plus-spacing;
    display: flex;
    flex-direction: column;

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
    margin-bottom: 3vh;

    svg {
      width: 30vw;
      height: 30vw;
      border-radius: 50%;
      box-shadow: 0px 0px 4px $action-1;

      @media (min-width: $mobile-plus) {
        width: 250px;
        height: 250px;
      }
    }

    a {
      display: inline-block;
    }
  }

  .room-selection {
    padding: 0;
    padding-right: 1px;
    display: flex;
    @include lightShadow();

    input, button {
      padding: 4px 8px;
      margin: 0;
      border: none;
      @include homeFont();
      letter-spacing: -1px;
    }

    input {
      flex: 1;
      background: white;

      &:focus, &:active {
        outline: none;
      }
    }

    &::placeholder {
      letter-spacing: -1px;
      color: #999;
    }

    button[type=submit] {
      appearance: none;
      margin-right: -1px;
      flex-shrink: 0;
      background: $white;
      cursor: pointer;
      @include homeSymbol();

      &:focus {
        outline: 1px dashed $action-2;
      }

      svg {
        width: 100%;
        height: 100%;
      }
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
}
</style>
