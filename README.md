js-yaml-concat-seqs
===================

[![CI](https://github.com/kristian/js-yaml-concat-seqs/actions/workflows/ci.yml/badge.svg)](https://github.com/kristian/js-yaml-concat-seqs/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/js-yaml-concat-seqs.svg)](https://www.npmjs.org/package/js-yaml-concat-seqs)

This `js-yaml` type is inspired by [Ingy döt Net](https://github.com/ingydotnet) comment in the original [`Yaml Issue #48`](https://github.com/yaml/yaml/issues/48#issuecomment-974998500) discussing merging sequences. He suggested that a tag is a valid option to denote merging of sequences, or how he called it `!concat-seqs`. I took the type system from the original `js-yaml` library and extended it with a one-line extension for the `concat-seqs` function as proposed.

This is a lightweight library (literally [5 lines of code](index.js)), without any external dependencies other than `js-yaml`. Requires Node 11 for [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to be available.

> js-yaml extra type:
>
> - !!concat-seqs [*seq1, ..., *seq2]

Installation
------------

```sh
npm install js-yaml-concat-seqs
```

Usage
-----

```js
import yaml from "js-yaml";
import type from "js-yaml-concat-seqs";

const schema = yaml.DEFAULT_SCHEMA.extend([ type ]);

const src = `
- &seq1
  - qux
  - qox
- &seq2
  - qix
  - qax
- !!concat-seqs
  - *seq1
  - - foo
    - bar
  - *seq2
`;

console.log(yaml.load(src, { schema }));
```
