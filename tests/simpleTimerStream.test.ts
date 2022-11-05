import { assert, assertSnapshot, describe, it } from "@deps/std_testing.ts";
import { simpleTimerStream } from "@mod";

describe(`simpleTimerStream`, () => {
  it(`should output 5 events, 1 each second (defaults)`, async () => {
    const eventLog = [];
    for await (const event of simpleTimerStream()) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
  });
});
