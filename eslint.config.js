import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestPlugin from 'eslint-plugin-vitest'  // Импортирай плъгина за Vitest

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],  // Добави .ts и .tsx файловете, ако използваш TypeScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,  // За да запазиш глобалните за браузър
        'vitest/globals': true,  // Добави глобалните променливи за Vitest
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'vitest': vitestPlugin,  // Добави Vitest като плъгин
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'vitest/no-assertions-in-tests': 'error',  // Пример за правило от Vitest
      'vitest/prefer-expect-assertions': 'warn',  // Пример за правило от Vitest
    },
  },
]
