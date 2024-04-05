import yaml from "js-yaml";
import type from "./index.js";

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