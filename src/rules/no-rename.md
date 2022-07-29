# destructure-object/no-rename

Ensure destructured parameters are not renamed. This can improve code and tooltip readability.

## Pass

```ts
const { key } = { key: 'value' };

// Allows renaming for assignment to pre-declared variables.
let a: string;
({ key: a } = { key: 'value' });

// Allows renaming keys that are not valid identifiers.
const { 'invalid-identifier': key } = { 'invalid-identifier': 'value' };


```

## Fail

```ts
const { key: a } = { key: 'value' };
```
