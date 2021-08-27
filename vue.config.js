module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false) // see https://github.com/vuejs/vue-cli/issues/2948
    config.optimization.minimize(!process.env.BUILD_NOT_MINIFIED)

    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
    }
}
