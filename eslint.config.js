module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals'
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  }
  