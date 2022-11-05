# Simple Timer Stream 

A simple function which starts a timer with setInterval and returns a ReadableStream Instance (Web Streams). 

## Useful for 

- Testing custom WriteableStream Instances"!

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