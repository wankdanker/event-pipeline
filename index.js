var usey = require('usey');

module.exports = EventPipeline;

function EventPipeline () {
  var self = this;

  self._events = {};
}

EventPipeline.prototype.on = function (event, fn) {
  var self = this;

  var ev = self._events[event] = self._events[event] || usey();
  var args = Array.prototype.slice.call(arguments);

  //remove the 0th arg from the array
  args.shift();

  ev.use.apply(ev, args);

  return self;
}

EventPipeline.prototype.off = function (event, fn) {
  var self = this;

  var ev = self._events[event];

  if (!ev) {
    return self;
  }

  ev.unuse(fn);

  return self;
};

EventPipeline.prototype.emit = function () {
  var self = this;

  var args = Array.prototype.slice.call(arguments);
  var event = args.shift();
  var cb;

  if (typeof args[args.length - 1] === 'function') {
    cb = args.pop();
  }

  cb = cb || noop;

  if (!self._events[event]) {
    //add a null argument to the beginning of the args list
    args.unshift(null);

    //apply all the args to the callback with no context
    return cb.apply(null, args);
  }

  //put the callback function back at the end of the args list
  args.push(cb);

  return self._events[event].apply(null, args);
};

function noop () {}
