/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-01-27 02:04:32
 * @FilePath: /vue3-cms/.eslintrc.cjs
 * @Description:
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ],
    'no-unused-vars': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
