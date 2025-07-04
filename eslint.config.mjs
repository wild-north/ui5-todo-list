import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // Global ignores
  {
    ignores: [
      'node_modules/**', 
      'dist/**', 
      'build/**',
      '*.min.js',
      '.cursor/**'
    ]
  },

  // Base configuration for all JS files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        sap: 'readonly'
      }
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,
      
      // UI5 specific adjustments
      'no-undef': 'error',
      'max-len': 'off', // Let prettier handle line length
      quotes: ['error', 'single'],
      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      
      // Best practices for modern JavaScript
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      'eqeqeq': ['error', 'always'],
      'no-console': 'warn',
      'consistent-return': 'error',
      'curly': ['error', 'all'],
      'default-case': 'error',
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': ['warn', { 
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: true,
        detectObjects: false 
      }],
      'no-multi-spaces': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error',
      'radix': 'error',
      'wrap-iife': ['error', 'inside'],
      'yoda': ['error', 'never']
    }
  },

  // Prettier compatibility - must come last to override conflicting rules
  prettierConfig,

  // Override for specific files if needed
  {
    files: ['webapp/test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.qunit
      }
    },
    rules: {
      'no-console': 'off' // Allow console in tests
    }
  }
]); 