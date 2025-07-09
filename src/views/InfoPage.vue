<template>
  <div class="info">
    <!-- TODO: Replace redundant mobile/desktop languageswitcher+logo combination -->
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />
      <Navigation />

      <div
        class="info-content"
        v-html="infoPage.content"
      />
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'
import i18nStrings from "../i18nStrings"
import { detectLanguage } from "../support"

const lang = detectLanguage()

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
  computed: {
    infoPage() {
      return i18nStrings[lang].infoPages.filter((ip) => ip.id === this.page)[0] || {}
    }
  },
}
</script>

<style lang="scss">
@use "@/css/styles" as *;

.info {
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  
  /* Responsive */
  @media (min-width: $mobile-plus) {
    height: auto;
  }

  .logo {
    /* SVG styles */
    svg {
      /* Visual */
      border-radius: 50%;
      box-shadow: 0px 0px 3px $action-1;
    }
    
    /* Link styles */
    a {
      display: inline-block;
    }
  }

  .logo--desktop {
    /* Responsive */
    @media (min-width: $mobile-plus) {
      /* Box model */
      display: block;
      margin: $large-spacing;
      
      /* SVG styles */
      svg {
        width: $logo-info-size;
        height: $logo-info-size;
      }
    }
  }

  .logo--mobile {
    /* SVG styles */
    svg {
      width: $logo-control-size;
      height: $logo-control-size;
    }
    
    /* Responsive */
    @media (min-width: $mobile-plus) {
      display: none;
    }
  }

  .language-switcher {
    /* Positioning */
    position: absolute;
    top: $small-plus-spacing;
    right: $medium-spacing;
    
    /* Modifiers */
    &--desktop {
      /* Box model */
      display: none;
      
      /* Responsive */
      @media (min-width: $mobile-plus) {
        display: block;
      }
    }
  }

  /* Mobile language switcher */
  .language-switcher--mobile {
    /* Responsive */
    @media (min-width: $mobile-plus) {
      display: none;
    }
  }
}

.info-page {
  /* Box model */
  width: 100%;
  
  /* Flex layout */
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Typography */
  color: $action-1;
  text-align: center;
  
  /* Visual */
  border-radius: $lobby-border-radius;
  overflow: hidden;
  
  /* Responsive styles */
  @media (min-width: $mobile-plus) {
    @include mediumShadow();
    margin-bottom: $medium-plus-spacing;
  }
  
  $mobile-plus-medium: $mobile-plus + $medium-spacing;
  @media (min-width: $mobile-plus-medium) {
    width: $mobile-plus-medium;
  }
  
  @media (min-width: $desktop) {
    width: $desktop - $medium-spacing;
  }
  
  @media (min-width: $desktop-large) {
    width: $desktop-plus;
  }
}

.info-page, .info-screen {
  /* Base styles */
  flex: 1;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  background: $white;
  color: $black;
  padding: $medium-plus-spacing;
  
  /* Typography */
  & {
    @include defaultFont();
  }

  h1 {
    color: $heading-1;
    text-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    text-transform: capitalize;
    margin: $medium-spacing 0 $medium-spacing;
    & {
      @include headingFont();
    }
    a, a:hover { color: inherit }
  }

  h2 {
    margin-top: $medium-plus-spacing;
    color: $action-1;
    // text-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    & {
      @include subheadingFont();
    }
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
