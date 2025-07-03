module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    sap: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
    // UI5 specific adjustments
    'no-undef': 'error',
    'import/no-unresolved': 'off', // UI5 modules are resolved differently
    'import/extensions': 'off',
    'max-len': 'off', // Let prettier handle line length
    quotes: ['error', 'single'],
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
  },
};
