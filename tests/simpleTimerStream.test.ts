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

  it(`should output 5 events, 1 each 500ms`, async () => {
    const eventLog = [];
    for await (
      const event of simpleTimerStream({
        intervalInMilliseconds: 500,
        maxEventCount: 5,
      })
    ) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
  });

  it(`should be abortable by an abortController`, async () => {
    const eventLog = [];
    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 4500);

    for await (
      const event of simpleTimerStream({
        intervalInMilliseconds: 1000,
        abortSignal: abortController.signal,
      })
    ) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
    clearTimeout(timeoutId);
  });
});
