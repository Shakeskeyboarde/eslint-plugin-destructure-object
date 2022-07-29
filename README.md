# eslint-plugin-destructure-object

ESLint object destructuring rules.

## Rules

- Ensure function parameters are not destructured ([`no-params`](src/rules/no-params.md))
- Ensure destructured parameters are not renamed ([`no-rename`](src/rules/no-rename.md))

## Installation

```bash
npm install --save-dev eslint eslint-plugin-destructure-object
```

## Usage

Use the recommended preset.

```json
{
  "extends": ["plugin:destructure-object/recommended"]
}
```

Alternatively, configure rules individually. The following configuration is equivalent to the recommended preset.

```json
{
  "plugins": ["destructure-object"],
  "rules": {
    "destructure-object/no-params": ["warn", { "allowOnlyParam": true }],
    "destructure-object/no-rename": "warn"
  }
}
```
