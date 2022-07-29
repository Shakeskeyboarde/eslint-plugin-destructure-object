module.exports = {
  rules: {
    'no-params': require('./rules/no-params'),
    'no-rename': require('./rules/no-rename'),
  },
  configs: {
    recommended: {
      plugins: ['destructure-object'],
      rules: {
        'destructure-object/no-params': ['warn', { allowOnlyParam: true }],
        'destructure-object/no-rename': 'warn',
      },
    },
  },
};
