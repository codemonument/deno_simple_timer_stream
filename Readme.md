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

## Usage with abort controller