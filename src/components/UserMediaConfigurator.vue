<template>
  <div class="info gum">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />

      <h1
        class="info-title gum-title"
        v-html="$t('room.gumHeading')"
      />
      <div class="info-content">
        <p>
          <router-link to="/info/about">
            {{ $t('room.aboutPalava') }}
          </router-link>
        </p>
        <p v-html="$t('room.gumIntro')" />
        <p v-html="$t('room.gumChooseMedia')" />

        <ul class="gum-buttons">
          <li class="gum-choice gum-choice--video-and-audio">
            <button
              autofocus
              :title="$t('room.gumChoiceVideoAndAudio')"
              @click="$emit('join-room', { video: videoConstraints, audio: true })"
            >
              <inline-svg
                :alt="$t('party.cameraAlt')"
                :aria-label="$t('party.cameraAlt')"
                src="@/assets/icons/video-camera.svg"
              />
              <inline-svg
                :alt="$t('party.microphoneAlt')"
                :aria-label="$t('party.microphoneAlt')"
                src="@/assets/icons/mic.svg"
              />
            </button>
          </li>

          <li class="gum-choice gum-choice--video">
            <button
              :title="$t('room.gumChoiceVideo')"
              @click="$emit('join-room', { video: videoConstraints, audio: false })"
            >
              <inline-svg
                :alt="$t('party.cameraAlt')"
                :aria-label="$t('party.cameraAlt')"
                src="@/assets/icons/video-camera.svg"
              />
            </button>
          </li>

          <li class="gum-choice gum-choice--audio">
            <button
              :title="$t('room.gumChoiceAudio')"
              @click="$emit('join-room', { video: false, audio: true })"
            >
              <inline-svg
                :alt="$t('party.microphoneAlt')"
                :aria-label="$t('party.microphoneAlt')"
                src="@/assets/icons/mic.svg"
              />
            </button>
          </li>
        </ul>

        <div
          v-if="error"
          class="gum-error"
        >
          <h2 v-html="$t('room.gumErrorHeading')" />
          <p v-html="$t('room.gumErrorReasons')" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'
import config from '@/config'

export default {
  components: {
    LanguageSwitcher,
    Logo,
  },
  emits: ['join-room'],
  props: {
    error: {
      type: String,
      default: null,
    },
  },
  computed: {
    videoConstraints() {
      return config.gumVideoConstraints
    }
  }
}
</script>

<style lang="scss">
@use "@/css/styles" as *;

.gum .info-page {
  /* Box model */
  padding-top: $medium-spacing;
  
  /* Typography */
  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
  }

  .gum-buttons {
    /* Box model */
    margin-top: $medium-spacing;
    margin-bottom: -$medium-spacing;
    padding-left: 0;
    
    /* Layout */
    display: flex;
    justify-content: space-between;
    
    /* List styling */
    list-style: none;
    
    /* Responsive styles */
    @media (min-width: $mobile) {
      margin-top: $medium-plus-spacing;
      justify-content: space-around;
    }

    .gum-choice {
      svg {
        @include size($gum-choice-size);
      }
      @media (min-width: $mobile) {
        svg {
          @include size($gum-choice-mobile-size);
        }
      }

      &--video-and-audio { order: 2; }
      &--video { order: 1; }
      &--audio { order: 3; }
    }

    button {
      // Layout and box model
      width: 100%;
      padding: $small-spacing $medium-spacing;
      margin-bottom: $medium-spacing;
      
      // Typography
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      
      // Interactive
      cursor: pointer;
      
      // Responsive typography
      @media (min-width: $mobile) {
        font-size: 13px;
        line-height: 18px;
      }
      @media (min-width: $mobile-plus) {
        font-size: 14px;
        line-height: 20px;
      }
      @media (min-width: $desktop) {
        font-size: 15px;
        line-height: 21px;
      }
      @media (min-width: $desktop-plus) {
        font-size: 16px;
        line-height: 22px;
      }
      @media (min-width: $desktop-large) {
        font-size: 17px;
        line-height: 23px;
      }
      @media (min-width: $desktop-huge) {
        font-size: 18px;
        line-height: 24px;
      }
      // background: $action-3;
      &:hover {
        svg {
          fill: $action-2;
        }
      }
    }
  }

  .gum-error {
    margin-top: $medium-spacing;

    h2 {
      color: $action-3;
      margin-bottom: $small-spacing;
    }

    ul {
      margin-top: $tiny-spacing;
    }

    li {
      list-style: circle;
      margin-left: 18px;
    }
  }
}

</style>
