module.exports = {
  extends: ['plugin:vue/essential', 'airbnb', 'prettier'],
  plugins: ['vue'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-alert': "off",
    'no-console': "off",
    'prefer-destructuring': "off",
  },
};

