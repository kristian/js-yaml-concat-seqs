import { Type } from "js-yaml";

export default new Type("tag:yaml.org,2002:concat-seqs", {
    kind: "sequence",
    construct: data => data !== null ? data.flat() : []
});
