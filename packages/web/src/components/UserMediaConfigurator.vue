<template>
  <InfoLayout class="gum">
    <h1
      class="info-title gum-title"
      v-html="t('room.gumHeading')"
    />
    <div class="info-content">
      <p>
        <router-link to="/info/about">
          {{ t('room.aboutPalava') }}
        </router-link>
      </p>
      <p v-html="t('room.gumIntro')" />

      <div class="gum-options">
        <div class="gum-name">
          <input
            v-model="userName"
            type="text"
            :placeholder="t('room.gumNamePlaceholder')"
            maxlength="30"
          >
        </div>

        <div class="gum-sounds">
          <label>
            <input
              v-model="soundsEnabled"
              type="checkbox"
            >
            {{ t('room.gumSoundsEnabled') }}
          </label>
        </div>
      </div>

      <p v-html="t('room.gumChooseMedia')" />

      <ul class="gum-buttons">
        <li class="gum-choice gum-choice--video-and-audio">
          <button
            type="button"
            autofocus
            :title="t('room.gumChoiceVideoAndAudio')"
            @click="emit('join-room', { userMediaConfig: { video: videoConstraints, audio: true }, name: userName, soundsEnabled })"
          >
            <VideoCameraIcon :aria-label="t('party.cameraAlt')" role="img" />
            <MicIcon :aria-label="t('party.microphoneAlt')" role="img" />
          </button>
        </li>

        <li class="gum-choice gum-choice--video">
          <button
            type="button"
            :title="t('room.gumChoiceVideo')"
            @click="emit('join-room', { userMediaConfig: { video: videoConstraints, audio: false }, name: userName, soundsEnabled })"
          >
            <VideoCameraIcon :aria-label="t('party.cameraAlt')" role="img" />
          </button>
        </li>

        <li class="gum-choice gum-choice--audio">
          <button
            type="button"
            :title="t('room.gumChoiceAudio')"
            @click="emit('join-room', { userMediaConfig: { video: false, audio: true }, name: userName, soundsEnabled })"
          >
            <MicIcon :aria-label="t('party.microphoneAlt')" role="img" />
          </button>
        </li>
      </ul>

      <div
        v-if="error"
        class="gum-error"
      >
        <h2 v-html="t('room.gumErrorHeading')" />
        <p v-html="t('room.gumErrorReasons')" />
      </div>
    </div>
  </InfoLayout>
</template>

<script setup lang="ts">
import VideoCameraIcon from '@/assets/icons/video-camera.svg?component'
import MicIcon from '@/assets/icons/mic.svg?component'

const { t } = useI18n()
const config = usePalavaConfig()

defineProps<{
  error?: string | null
}>()

const emit = defineEmits<{
  'join-room': [config: { userMediaConfig: { video: any, audio: boolean }, name: string, soundsEnabled: boolean }]
}>()

const userName = ref('')
const soundsEnabled = ref(true)
const videoConstraints = computed(() => config.gumVideoConstraints)
</script>

<style lang="scss" scoped>
.gum :deep(.info-page) {
  padding-top: $medium-spacing;

  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
  }

  .gum-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $small-spacing;
    margin: $large-plus-spacing 0 $medium-spacing;

    @media (min-width: $mobile) {
      flex-direction: row;
      justify-content: center;
      gap: $medium-spacing;
    }
  }

  .gum-name {
    flex: 0 1 auto;

    input {
      width: 30ch;
      max-width: 100%;
      padding: $small-spacing $medium-spacing;
      border: 1px solid $gray;
      border-radius: 4px;
      font-size: 16px;
      line-height: 24px;

      &:focus {
        outline: none;
        border-color: $action-1;
      }

      &::placeholder {
        color: $shade;
      }
    }
  }

  .gum-sounds {
    flex-shrink: 0;

    label {
      display: flex;
      align-items: center;
      gap: $small-spacing;
      cursor: pointer;
      font-size: 14px;
      color: $action-1;

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;

        width: 18px;
        height: 18px;
        flex-shrink: 0;
        cursor: pointer;

        border: 2px solid $action-1;
        border-radius: 3px;
        background-color: white;

        &:checked {
          background-color: $action-1;

          &::after {
            content: '';
            display: block;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            margin: 1px auto;
          }
        }

        &:focus {
          outline: 2px solid $action-2;
          outline-offset: 1px;
        }
      }
    }
  }

  .gum-buttons {
    margin-top: $medium-spacing;
    margin-bottom: -$medium-spacing;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    list-style: none;

    @media (min-width: $mobile) {
      margin-top: $medium-plus-spacing;
      justify-content: space-around;
    }

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
      width: 100%;
      padding: $small-spacing $medium-spacing;
      margin-bottom: $medium-spacing;
      text-align: center;
      @include defaultFont();
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
