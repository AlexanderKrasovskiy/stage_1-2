module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
        'plugin:prettier/recommended',
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    rules: {
        'no-debugger': 'off',
        'no-console': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/prefer-default-export': 'off',
    },
};
