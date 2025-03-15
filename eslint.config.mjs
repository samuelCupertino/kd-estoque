import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Configuração base
  js.configs.recommended,
  { ignores: ['node_modules/', 'dist/', 'components/ui/'] },

  // Configuração para React e React Hooks
  { settings: { react: { version: 'detect' } } },
  {
    files: ['**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Configuração para TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  // Configuração do Prettier
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    },
  },
  prettierConfig,
]
