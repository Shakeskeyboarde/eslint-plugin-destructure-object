const { RuleTester } = require('eslint');
const rule = require('./no-rename');

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
  tester.run(`no-rename (${name})`, rule, {
    valid: [
      { code: 'const { key } = { key: "value" };' },
      { code: '({ key }) => {};' },
      { code: 'function foo({ key }) {};' },
      { code: 'const foo = function ({ key }) {};' },
      { code: 'class Foo { foo({ key }) {} }' },
      { code: 'class Foo { foo = ({ key }) => {} }' },
      { code: 'const { "invalid-identifier": key } = { "invalid-identifier": "value" };' },
      { code: 'let a; ({ key: a } = { key: "value" });'}
    ],
    invalid: [
      { code: 'const { key: a } = { key: "value" };', errors: [{ message: /do not rename/i }] },
      { code: '({ key: a }) => {};', errors: [{ message: /do not rename/i }] },
      { code: 'function foo({ key: a }) {}', errors: [{ message: /do not rename/i }] },
      { code: 'const foo = function ({ key: a }) {};', errors: [{ message: /do not rename/i }] },
      { code: 'class Foo { foo({ key: a }) {}; }', errors: [{ message: /do not rename/i }] },
      { code: 'class Foo { foo = ({ key: a }) => {}; }', errors: [{ message: /do not rename/i }] },
      { code: 'const { foo: foo } = { foo: "value" };', errors: [{ message: /do not rename/i }]}
    ],
  });
});
