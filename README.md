event-pipeline
--------------

This module provides an event-emitter like class that processes registered
event handlers in order and returns a callback to the emit call when all events
have been called. If an event handler passes an error to the callback function
then no further event handlers will be called.

example
-------

```js
var EventPipeline = require('event-pipeline');

var e = new EventPipeline();

e.on('get:before', function (arg1, arg2, cb) {
  /* stuff */

  return cb();
})

e.on('get:before', function (arg1, arg2, cb) {
  /* stuff */

  return cb();
})

var a = {};
var b = {};

e.emit('get:before', a, b, function (err, a, b) {
  //done
});
```

api
---

* EventPipeline() - constructor function
* on(eventName, listener) - register a listener
  * eventName - the event name to register
  * listener - the function to call when eventName is emitted
* on.unshift(eventName, listener) - insert a listener to the beginning of the list of listeners
  * eventName - the event name to register
  * listener - the function to call when eventName is emitted
* off(eventName, listener) - unregister a listener
  * eventName - the event name that was previously registered
  * listener - the function that was previously registered
* emit(eventName[, arg1][, arg2][, ...][, callback]) - emit an event
  * arg1, ... - all arguments are passed to the event listener
  * callback - this function is called when all events have been processed or
  one of them called back with an error

license
-------

MIT
