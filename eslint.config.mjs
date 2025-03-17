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
	{
		languageOptions: {
			globals: { JSX: 'readonly', require: 'readonly' },
		},
	},

	// Configuração para React, React Hooks, TypeScript
	{ settings: { react: { version: 'detect' } } },
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
			react,
			'react-hooks': reactHooks,
			'@typescript-eslint': tseslint,
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'arrow-body-style': ['error', 'as-needed'],
			'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/no-unescaped-entities': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'react/display-name': 'off',
		},
	},

	// Configuração do Prettier
	{
		plugins: {
			prettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{ singleQuote: true, semi: false, useTabs: true },
			],
		},
	},
	prettierConfig,
]
