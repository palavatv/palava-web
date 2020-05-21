module.exports = {
  chainWebpack: config => config.resolve.symlinks(false) // see https://github.com/vuejs/vue-cli/issues/2948
}
