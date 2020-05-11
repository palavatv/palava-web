<template>
  <nav class="navigation">
    <ul>
      <li><router-link to="/info/about"><span @click="checkScreen('about', $event)">{{ $t('infoPages.about.title') }}</span></router-link></li>
      <li><router-link to="/info/usage"><span @click="checkScreen('usage', $event)">{{ $t('infoPages.usage.title') }}</span></router-link></li>
      <li><router-link to="/info/webrtc"><span @click="checkScreen('webrtc', $event)">{{ $t('infoPages.webrtc.title') }}</span></router-link></li>
      <li><router-link to="/info/hosting"><span @click="checkScreen('hosting', $event)">{{ $t('infoPages.hosting.title') }}</span></router-link></li>
      <li><router-link to="/info/ev"><span @click="checkScreen('ev', $event)">{{ $t('infoPages.ev.title') }}</span></router-link></li>
      <li><router-link to="/info/contact"><span @click="checkScreen('contact', $event)">{{ $t('infoPages.contact.title') }}</span></router-link></li>
      <li><router-link to="/info/privacy"><span @click="checkScreen('privacy', $event)">{{ $t('infoPages.privacy.title') }}</span></router-link></li>
    </ul>
    <!-- <LanguageSwitcher /> -->
  </nav>
</template>

<script>
// import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  props: {
    type: {
      type: String,
      default: "page",
    },
  },
  components: {
    // LanguageSwitcher,
  },
  methods: {
    checkScreen(infoPage, $event) {
      if (this.type === 'screen') {
        $event.preventDefault()
        this.$emit('open-info-screen', infoPage)
      }
    },
  }
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.navigation {
  padding-top: $medium-spacing - 1px;
  border-top: 1px solid $background;

  padding-bottom: $medium-spacing - 1px;
  border-bottom: 1px solid $background;

  @media (min-width: $mobile-plus) {
    padding-top: 0;
    border-top: none;
  }

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    padding-right: $tiny-spacing;

    &:not(:last-child) {
      border-right: 1px solid $background;
      padding-right: $small-spacing;
    }
    &:not(:first-child) {
      padding-left: $small-spacing;
    }
  }
  a, a span {
    display: block;
    height: 100%;
  }

  .router-link-active {
    color: $action-2;
  }
}

</style>
