/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2024-01-10 11:48:54
 * @FilePath: /vue3-cms/.eslintrc.cjs
 * @Description:
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-prettier/skip-formatting'
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
