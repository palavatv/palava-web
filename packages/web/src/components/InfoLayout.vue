<template>
  <div class="info">
    <LanguageSwitcher class="language-switcher" />
    <PalavaLogo class="logo" />

    <main class="info-page">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Pure layout component - no logic needed
</script>

<style lang="scss" scoped>
@use "@/css/info-shared" as *;

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media (min-width: $mobile-plus) {
    height: auto;
  }

  .logo {
    :deep(svg) {
      border-radius: 50%;
      box-shadow: 0px 0px 3px $action-1;
    }

    :deep(a) {
      display: inline-block;
    }

    :deep(svg) {
      width: $logo-control-size;
      height: $logo-control-size;
    }

    @media (min-width: $mobile-plus) {
      display: block;
      margin: $large-spacing;

      :deep(svg) {
        width: $logo-info-size;
        height: $logo-info-size;
      }
    }
  }

  .language-switcher {
    position: absolute;
    top: $small-plus-spacing;
    right: $medium-spacing;
  }
}

.info-page {
  @include info-container-base();

  width: 100%;
  color: $action-1;
  text-align: center;
  overflow: hidden;

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

  :deep(h1) {
    @include headingFont();
    color: $heading-1;
    text-shadow: 1px 1px rgba(100, 100, 100, 0.1);
    text-transform: capitalize;
    margin: $medium-spacing 0 $medium-spacing;
    a, a:hover { color: inherit }
  }

  :deep(h2) {
    margin-top: $medium-plus-spacing;
    color: $action-1;
    @include subheadingFont();
  }

  :deep(.info-content) {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;

    ul {
      list-style: circle;
      padding-left: $medium-spacing;
    }

    table { border: 0; margin-top: $small-spacing; }
    th, td { border: 0; text-align: left; }
    th { padding-right: $medium-spacing; }

    strong {
      font-weight: normal;
      text-decoration: underline;
    }
  }
}
</style>
