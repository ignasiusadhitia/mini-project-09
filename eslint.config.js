import prettierConfig from 'eslint-config-prettier';
import cypress from 'eslint-plugin-cypress';
import eslintPluginImport from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import js from '@eslint/js';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.jest,
        ...globals.cypress,
        cy: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' },
      'import/resolver': {
        alias: {
          map: [
            ['@images', './src/assets/images'],
            ['@icons', './src/assets/icons'],
            ['@images', './src/assets/images'],
            ['@components/guests', './src/components/guests'],
            ['@components/admin', './src/components/admin'],
            ['@hooks', './src/hooks'],
            ['@pages', './src/pages'],
            ['@pages/guests', './src/pages/guests'],
            ['@pages/admin', './src/pages/admin'],
            ['@store', './src/store'],
            ['@services', './src/services'],
            ['@utils', './src/utils'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      prettier,
      jest,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      ...jest.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          printWidth: 80,
          trailingComma: 'es5',
          jsxSingleQuote: false,
          arrowParens: 'always',
        },
      ],
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^React$',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '@*/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/jsx-curly-newline': [
        'error',
        {
          multiline: 'consistent',
          singleline: 'consistent',
        },
      ],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      'jest/expect-expect': 'off',
    },
  },
  {
    files: ['**/*.cy.js', '**/*.cy.jsx'],
    plugins: {
      cypress,
    },
    rules: {
      'no-undef': ['error', { typeof: true }],
      'cypress/no-assigning-return-values': 'error',
    },
  },
];
