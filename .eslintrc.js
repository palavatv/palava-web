module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'vuejs-accessibility',
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:vuejs-accessibility/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
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
