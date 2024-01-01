module.exports = {
  root: true,
  extends: ['universe', 'universe/native'],
  rules: {
    'import/order': ['warn', {}],
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
};
