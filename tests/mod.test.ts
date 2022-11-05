import { assert, describe, it } from "@deps/std_testing.ts";
import { simpleTimerStream } from "@mod";

describe(`mod.ts`, () => {
  it(`should export correct objects and types`, () => {
    assert(simpleTimerStream);
  });
});
