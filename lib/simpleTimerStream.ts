export type SimpleTimerStreamOptions = {
  /**
   * The interval in milliseconds which is used for setInterval()
   */
  intervalInMilliseconds: number;

  /**
   * Stops the stream automatically after x events
   */
  maxEventCount?: number;

  /**
   * A signal of an abortController which can be used to abort this timer stream from the outside
   */
  abortSignal?: AbortSignal;
};

const defaultOptions: SimpleTimerStreamOptions = {
  intervalInMilliseconds: 1000,
  maxEventCount: 5,
};

export function simpleTimerStream(options?: SimpleTimerStreamOptions) {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }

  const { maxEventCount, intervalInMilliseconds, abortSignal } = options;

  let timerId: number | undefined;

  const readableStream = new ReadableStream<number>({
    start(controller) {
      let eventCount = 1;

      controller.enqueue(eventCount);
      timerId = setInterval(() => {
        eventCount++;

        if (abortSignal?.aborted) {
          // cancel all activities, bc. abortSignal was aborted
          clearInterval(timerId);
          controller.close();
        }

        controller.enqueue(eventCount);

        if (eventCount === maxEventCount) {
          // cancel all activities, bc. maxEventCount was reached
          clearInterval(timerId);
          controller.close();
        }
      }, intervalInMilliseconds);
    },
    pull(_controller) {
    },
    cancel(reason) {
      console.error(`DemoReadableStream cancelled bc. of: `, reason);
      clearInterval(timerId);
    },
  });

  return readableStream;
}
