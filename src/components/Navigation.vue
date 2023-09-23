<template>
  <nav class="navigation">
    <ul>
      <li v-for="infoPage in infoPages" :key="infoPage.id">
        <router-link :to="`/info/${infoPage.id}`">
          <span
            @click="checkScreen(infoPage.id, $event)"
            @keypress.enter="checkScreen(infoPage.id, $event)"
          >
            {{ infoPage.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import i18nStrings from '@/i18nStrings'
import { detectLanguage } from '@/support'

const lang = detectLanguage()

export default {
  props: {
    type: {
      type: String,
      default: "page",
    },
  },
  methods: {
    checkScreen(infoPage, $event) {
      if (this.type === 'screen') {
        $event.preventDefault()
        this.$emit('open-info-screen', infoPage)
      }
    },
  },
  computed: {
    infoPages() {
      return i18nStrings[lang].infoPages.filter((ip) => ip.linked !== false)
    }
  }
}
</script>

<style lang="scss">
@import '@/css/styles.scss';

.navigation {
  border-bottom: 1px solid $background;
  margin-top: -$tiny-plus-spacing;
  padding-top: $medium-spacing - 1px;
  border-top: 1px solid $background;

  @media (min-width: $mobile-plus) {
    padding-top: 0;
    border-top: none;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    @media (min-width: $mobile-plus) {
      grid-template-rows: 1fr;
    }
  }

  li {
    padding-bottom: $medium-spacing - 1px;
    padding-right: $medium-spacing;

    // &:nth-child(-n+2) {
    //   background: pink;
    // }
    // &:not(:nth-child(1n)) {
    //   border-right: 1px solid $background;
    //   padding-right: $small-spacing;
    // }
    // &:not(:first-child) {
    //   padding-left: $small-spacing;
    // }
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
