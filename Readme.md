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