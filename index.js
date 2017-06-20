var usey = require('usey');

module.exports = EventPipeline;

function EventPipeline () {
  var self = this;

  self._events = {};
}

EventPipeline.prototype.on = function (event, fn) {
  var self = this;

  var ev = self._events[event] = self._events[event] || usey();

  ev.use(fn);

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

EventPipeline.prototype.emit = function (event, obj, cb) {
  var self = this;

  cb = cb || noop;

  if (!self._events[event]) {
    return cb(null, obj);
  }

  return self._events[event](obj, cb);
};

function noop () {}
