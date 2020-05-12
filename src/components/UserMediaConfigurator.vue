<template>
  <div class="info gum">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />

      <h1 class="info-title gum-title">
        {{ $t('room.gumHeading')}}
      </h1>
      <div class="info-content">
        <p><router-link to="/info/about">{{ $t('room.aboutPalava') }}</router-link></p>

        <p v-html="$t('room.gumIntro')"/>

        <!-- Use relay server<br/>
        Use password<br/> -->

        <p>{{ $t('room.gumChooseMedia') }}</p>

        <ul class="gum-buttons">
          <li><button @click="$emit('join-room', { video: { facingMode: 'user' }, audio:false })">Only Video</button></li>
          <li><button @click="$emit('join-room', { video: { facingMode: 'user' }, audio:true })" autofocus>Video &amp; Audio</button></li>
          <li><button @click="$emit('join-room', { video: false, audio:true })">Only Audio</button></li>
        </ul>

        <div v-if="error" class="gum-error">
          <h2><div v-html="$t('room.gumErrorTitle')" /></h2>

          <div v-html="$t('room.gumErrorReasons')" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'

export default {
  components: {
    LanguageSwitcher,
    Logo,
  },
  props: {
    error: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
@import "@/css/styles.scss";

.gum .info-page {
  padding-top: $medium-spacing;
  h1 {
    text-transform: none;
    margin: 0;
    line-height: 130%;
  }

  // TODO style gum buttons
  .gum-buttons {
    margin-top: $medium-spacing;
    margin-bottom: -$medium-spacing;

    display: flex;
    flex-direction: column;
    @media (min-width: $mobile) {
      flex-direction: row;
      justify-content: space-between;
    }

    button {
      text-align: center;
      @include defaultFont();
      padding: $small-spacing $medium-spacing;
      margin-bottom: $medium-spacing;
      width: 100%;
      cursor: pointer;
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
