const { RuleTester } = require('eslint');
const rule = require('./no-params');

const js = new RuleTester({
  parserOptions: { ecmaVersion: 2022 },
});
const ts = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { ecmaVersion: 2022 },
});

[
  [js, 'JS'],
  [ts, 'TS'],
].forEach(([tester, name]) => {
  tester.run(`no-params (${name})`, rule, {
    valid: [
      { code: 'const { key } = {};' },
      { code: 'let { key } = {};' },
      { code: 'var { key } = {};' },
      { code: 'const { key = "value" } = {};' },
      { code: 'const { key } = { key: "value" };' },
      { code: 'let key; ({ key } = {});' },
      { code: 'var key; ({ key } = {});' },
      // Allow if the destructured parameter is the only parameter.
      { code: '({ key }) => {};', options: [{ allowOnlyParam: true }], name: 'allowOnlyParam' },
    ],
    invalid: [
      { code: '({ key }) => {};', errors: [{ message: /do not destructure/i }] },
      { code: '({ key } = {}) => {};', errors: [{ message: /do not destructure/i }] },
      { code: 'const key = function ({ key }) {};', errors: [{ message: /do not destructure/i }] },
      { code: 'const key = function ({ key } = {}) {};', errors: [{ message: /do not destructure/i }] },
      { code: 'function key({ key }) {}', errors: [{ message: /do not destructure/i }] },
      { code: 'function key({ key } = {}) {}', errors: [{ message: /do not destructure/i }] },
      { code: 'class Foo { key = ({ key }) => {}; }', errors: [{ message: /do not destructure/i }] },
      { code: 'class Foo { key = ({ key } = {}) => {}; }', errors: [{ message: /do not destructure/i }] },
      { code: 'class Foo { key({ key }) {}; }', errors: [{ message: /do not destructure/i }] },
      { code: 'class Foo { key({ key } = {}) {}; }', errors: [{ message: /do not destructure/i }] },
      { code: '({ key = "value" }) => {};', errors: [{ message: /do not destructure/i }] },
      // Allow if the destructured parameter is the only parameter.
      {
        code: '({ key }, a) => {};',
        errors: [{ message: /do not destructure.*more than one parameter/i }],
        options: [{ allowOnlyParam: true }],
        name: 'allowOnlyParam',
      },
      {
        code: '(a, { key }) => {};',
        errors: [{ message: /do not destructure.*more than one parameter/i }],
        options: [{ allowOnlyParam: true }],
        name: 'allowOnlyParam',
      },
    ],
  });
});
