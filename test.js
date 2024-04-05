import test from "ava";
import yaml from "js-yaml";
import type from "./index.js";

const schema = yaml.DEFAULT_SCHEMA.extend([ type ]);

test("test concatenating sequences", t => {
    t.deepEqual(yaml.load(`
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
`, { schema }), [["qux", "qox"], ["qix", "qax"], ["qux", "qox", "foo", "bar", "qix", "qax"]]);
});

test("test deep sequences", t => {
    t.deepEqual(yaml.load("- &seq1 [[qux, qox]]\n- &seq2 [[qix, qax]]\n- !!concat-seqs [*seq1, [foo, bar], *seq2]", { schema }),
        [[["qux", "qox"]], [["qix", "qax"]], [["qux", "qox"], "foo", "bar", ["qix", "qax"]]]);
});

test("test null sequence", t => {
    t.deepEqual(yaml.load("- !!concat-seqs", { schema }), [[]]);
});
