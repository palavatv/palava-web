<template>
  <div class="info">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />
      <Navigation />

      <h1 class="info-title">
        {{ $t(`infoPages.${this.page}.title`) }}
      </h1>
      <div class="info-content" v-html="$t(`infoPages.${this.page}.content`)" />
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    LanguageSwitcher,
    Logo,
    Navigation,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  metaInfo() {
    return {
      title: this.$t(`infoPages.${this.page}.title`),
    }
  },
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  @media (min-width: $mobile-plus) {
    height: auto;
  }

  .logo {
    svg {
      border-radius: 50%;
      box-shadow: 0px 0px 3px $action-1;
    }
    a {
      display: inline-block;
    }
  }

  .logo--desktop {
    display: none;
    @media (min-width: $mobile-plus) {
      display: block;
    }

    margin: $large-spacing;
    svg {
      width: $logo-info-size;
      height: $logo-info-size;
    }
  }

  .logo--mobile {
    @media (min-width: $mobile-plus) {
      display: none;
    }

    margin: 0 auto $medium-spacing;
    svg {
      width: $logo-control-size;
      height: $logo-control-size;
    }
  }

  .language-switcher {
    position: absolute;
    top: $small-plus-spacing;
    right: $medium-spacing;
  }

  .language-switcher--desktop {
    display: none;
    @media (min-width: $mobile-plus) {
      display: block;
    }
  }

  .language-switcher--mobile {
    @media (min-width: $mobile-plus) {
      display: none;
    }
  }
}

.info-page {
  width: 100%;

  @media (min-width: $mobile-plus) {
    @include mediumShadow();
    margin-bottom: $medium-plus-spacing;
  }

  @media (min-width: $mobile-plus + $medium-spacing) {
    width: $mobile-plus + $medium-spacing;
  }

  @media (min-width: $desktop) {
    width: $desktop - $medium-spacing;
  }

  @media (min-width: $desktop-large) {
    width: $desktop-plus;
  }
}

.info-page, .info-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  background: $white;
  color: $black;
  @include defaultFont();
  padding: $medium-plus-spacing;

  h1 {
    @include headingFont();
    color: $heading-1;
    text-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    text-transform: capitalize;
    margin: $medium-spacing 0 $medium-spacing;
    a, a:hover { color: inherit }
  }

  h2 {
    &:not(:first-child) {
      margin-top: $medium-plus-spacing;
    }
    color: $action-1;
    // text-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    @include subheadingFont();
  }

  .info-content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;

    ul {
      list-style: circle;
      padding-left: $medium-spacing;
    }

    table {
      border: 0;
      margin-top: $small-spacing;
    }
    th, td {
      border: 0;
      text-align: left;
    }
    th {
      padding-right: $medium-spacing;
    }

    strong {
      font-weight: normal;
      text-decoration: underline;
      // color: $action-1;
    }
  }
}

.fade-enter-active {
  transition: opacity .3s ease-in;
}

.fade-leave-active {
  transition: opacity .5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
