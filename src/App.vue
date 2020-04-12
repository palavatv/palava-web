<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">palava</router-link> |
      <router-link to="/info/how">How to Use</router-link> |
      <router-link to="/info/ev">palava e. V.</router-link> |
      <router-link to="/info/contact">Imprint</router-link> |
      <router-link to="/info/privacy">Privacy Policy</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
