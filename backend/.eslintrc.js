module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
		'eslint:recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'plugin:jest/recommended',
    'prettier',
  ],
  plugins: ['jest'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
}