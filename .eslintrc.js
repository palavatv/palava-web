module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'vue-a11y',
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:vue-a11y/base',
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
    'vue-a11y/media-has-caption': 'off',
    'vue-a11y/no-autofocus': 'off',
    'vue-a11y/click-events-have-key-events': 'off',
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
