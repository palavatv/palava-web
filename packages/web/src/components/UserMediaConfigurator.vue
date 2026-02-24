<template>
  <div class="info gum">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <PalavaLogo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <PalavaLogo class="logo logo--mobile" />

      <h1 class="info-title gum-title">
        {{ t('room.gumHeading') }}
      </h1>
      <div class="info-content">
        <p><router-link to="/info/about">{{ t('room.aboutPalava') }}</router-link></p>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="t('room.gumIntro')" />

        <p>{{ t('room.gumChooseMedia') }}</p>

        <ul class="gum-buttons">
          <li class="gum-choice gum-choice--video-and-audio">
            <button
              autofocus
              :title="t('room.gumChoiceVideoAndAudio')"
              @click="emit('join-room', { video: videoConstraints, audio: true })"
            >
              <VideoCameraIcon :alt="t('party.cameraAlt')" :aria-label="t('party.cameraAlt')" />
              <MicIcon :alt="t('party.microphoneAlt')" :aria-label="t('party.microphoneAlt')" />
            </button>
          </li>

          <li class="gum-choice gum-choice--video">
            <button
              :title="t('room.gumChoiceVideo')"
              @click="emit('join-room', { video: videoConstraints, audio: false })"
            >
              <VideoCameraIcon :alt="t('party.cameraAlt')" :aria-label="t('party.cameraAlt')" />
            </button>
          </li>

          <li class="gum-choice gum-choice--audio">
            <button
              :title="t('room.gumChoiceAudio')"
              @click="emit('join-room', { video: false, audio: true })"
            >
              <MicIcon :alt="t('party.microphoneAlt')" :aria-label="t('party.microphoneAlt')" />
            </button>
          </li>
        </ul>

        <div v-if="error" class="gum-error">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2><div v-html="t('room.gumErrorHeading')" /></h2>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="t('room.gumErrorReasons')" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import PalavaLogo from '@/components/PalavaLogo.vue'
import VideoCameraIcon from '@/assets/icons/video-camera.svg?component'
import MicIcon from '@/assets/icons/mic.svg?component'
import config from '@/config'

withDefaults(defineProps<{ error?: string | null }>(), { error: null })
const emit = defineEmits<{
  'join-room': [config: MediaStreamConstraints]
}>()

const { t } = useI18n()

const videoConstraints = config.gumVideoConstraints
</script>

<style lang="scss">
.gum .info-page {
  padding-top: $medium-spacing;
  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
  }

  .gum-buttons {
    margin-top: $medium-spacing;
    margin-bottom: -$medium-spacing;

    display: flex;
    justify-content: space-between;
    @media (min-width: $mobile) {
      margin-top: $medium-plus-spacing;
      justify-content: space-around;
    }
    list-style: none;
    padding-left: 0;

    .gum-choice {
      svg { @include size($gum-choice-size); }
      @media (min-width: $mobile) {
        svg { @include size($gum-choice-mobile-size); }
      }

      &--video-and-audio { order: 2; }
      &--video { order: 1; }
      &--audio { order: 3; }
    }

    button {
      text-align: center;
      @include defaultFont();
      padding: $small-spacing $medium-spacing;
      margin-bottom: $medium-spacing;
      width: 100%;
      cursor: pointer;
      &:hover {
        svg { fill: $action-2; }
      }
    }
  }

  .gum-error {
    margin-top: $medium-spacing;

    h2 {
      color: $action-3;
      margin-bottom: $small-spacing;
    }

    ul { margin-top: $tiny-spacing; }

    li {
      list-style: circle;
      margin-left: 18px;
    }
  }
}
</style>
