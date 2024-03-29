# Simple Timer Stream

## Heads Up: Moved!

This project was integrated into my [rx_webstreams library](https://github.com/codemonument/deno_rx_webstreams#timersource)!  
Since this project is basically feature complete, you could still use this.  
However, the rx_webstreams library has even more awesome stream utilities, so check it out!

Useful Links:

- timerSource() Tests: https://github.com/codemonument/deno_rx_webstreams/blob/main/lib/sources/timerSource.test.ts

Note: The Explanation below does also work with timerSource() and is currently even better than in the rx_webstreams repository.
So, feel free to use this right now.  
I plan on releasing a full featured documentation site for rx_webstreams.  
When that happens, I'll update this readme with a link!

# Original Readme

## Description

A simple function which starts a timer with setInterval and returns a ReadableStream Instance (Web Streams).

Version 1.0.0 is considered feature complete right now.
It will receive bugfixes, if I get notified of them or find the bugs myself.
If someone has a nice feature which would greatly benefit this package, [raise an issue](https://github.com/codemonument/deno_simple_timer_stream/issues) or even better,
[submit a PR](https://github.com/codemonument/deno_simple_timer_stream/pulls) ! :)

## Features

- Create a finite timerstream with 5 events, 1 per second per default
- Create a finite timerstream with x events, 1 per x ms (via options object)
- Create an infinite timerstream by passing an abortSignal into the options object

## Simple Usage

Simply start a simpleTimerStream by calling its function: `simpleTimerStream()`.  
Per default, it will emit 5 events, 1 per second.

These Events can be read simply via a `for await` loop:

```ts
for await (const eventCount of simpleTimerStream()) {
	console.log(event);
}
```

## Parametrized Usage

To change the `maxEventsCount` and `intervalInMilliseconds` values, simply pass an options object into `simpleTimerStream()`:

```ts
const timer = simpleTimerStream({
	intervalInMilliseconds: 500,
	maxEventCount: 5,
});

for await (const event of timer) {
	console.log(event);
}
```

## Usage with abort controller (infinite mode)

To use this `simpleTimerStream()` with an abort controller, simply pass an abortSignal into the options:

```ts
const abortController = new AbortController();

const timer = simpleTimerStream({
	intervalInMilliseconds: 1000,
	abortSignal: abortController.signal,
});

for await (const event of timer) {
	console.log(event);
}
```

This timer stream will go until you call abortController.abort().
Please note that you can't call `abortController.abort()` in the same function below the `for await` statement,
since this `for await` statement blocks execution of the function indefinitely.

One solution to this problem would be to define the condition, where the abort controller should abort,
above the `for await` structure. I'm using a setTimeout in this examle:

```ts
const abortController = new AbortController();

const timeoutId = setTimeout(() => {
	abortController.abort();
}, 4500);

const timer = simpleTimerStream({
	intervalInMilliseconds: 1000,
	abortSignal: abortController.signal,
});

for await (const event of timer) {
	console.log(event);
}

// this is necessary to not have dangling async listeners in deno tests
clearTimeout(timeoutId);
```

## Useful for

- Testing custom WriteableStream Instances!
