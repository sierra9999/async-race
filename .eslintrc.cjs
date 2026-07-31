module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Suppress unsupported TS version warning. Does not affect functionality or parsing behavior.
    warnOnUnsupportedTypeScriptVersion: false,
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/extensions': 'off',
    'react/require-default-props': ['error', {
      forbidDefaultForRequired: true,
      ignoreFunctionalComponents: true,
    }],
  },
};
