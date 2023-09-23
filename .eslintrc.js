module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  plugins: [
    'vuejs-accessibility',
  ],
  extends: [
    '@vue/airbnb',
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/essential',
    'plugin:vuejs-accessibility/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 'off',
    'max-len': 'off',
    quotes: 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'operator-linebreak': 'off',
    'dot-location': 'off',
    'comma-dangle': 'off',
    'keyword-spacing': 'off',
    'vuejs-accessibility/anchor-has-content': 'off',
    'vuejs-accessibility/heading-has-content': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/media-has-caption': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
