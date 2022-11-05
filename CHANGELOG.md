# Changelog 

## 1.0.1 - 2022-11-05 

Add @codemonument identifier to the repo description and created a new tag to transfer the new description to deno.land/x.

## 1.0.0 - 2022-11-05

Initial Release of this package https://deno.land/x/simple_timer_stream. 

Version 1.0.0 is considered feature complete right now. 
It will receive bugfixes, if I get notified of them or find the bugs myself. 
If someone has a nice feature which would greatly benefit this package, [raise an issue](https://github.com/codemonument/deno_simple_timer_stream/issues) or even better, 
[submit a PR](https://github.com/codemonument/deno_simple_timer_stream/pulls) ! :) 


Features: 

- create a finite timerstream with 5 events, 1 per second per default 
- create a finite timerstream with x events, 1 per x ms (via options object)
- create an infinite timerstream by passing an abortSignal into the options object