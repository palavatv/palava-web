<template>
  <div class="logo">
    <router-link to="/">
      <inline-svg
        :alt="$t('palavaLogoAlt')"
        :src="require('../assets/icons/palava.svg')"
      />
    </router-link>
  </div>
</template>
