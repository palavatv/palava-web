<template>
  <button
    :title="$t('switchTheme.title')"
    class="theme-switcher"
    @click="switchTheme"
  >
    <span v-text="themeSwitcherTitle" :aria-label="$t('switchTheme.alt')" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: "light",
      themeSwitcherTitle: this.$t("switchTheme.light.title"),
    };
  },
  mounted() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.switchTheme();
    }
  },
  methods: {
    switchTheme() {
      if (this.currentTheme === "light") {
        this.themeSwitcherTitle = this.$t("switchTheme.dark.title");
        this.currentTheme = "dark";
      } else {
        this.themeSwitcherTitle = this.$t("switchTheme.light.title");
        this.currentTheme = "light";
      }
      document.body.classList.toggle("dark");
    },
  },
};
</script>

<style lang="scss">
@import "@/css/styles.scss";

.theme-switcher {
  text-transform: uppercase;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  @include footerFont();
  color: $shade;
  &:hover {
    color: $action-2;
  }
}
</style>
