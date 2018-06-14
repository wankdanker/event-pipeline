var EventPipeline = require('./');
var test = require('tape');

test('exits early on error', function (t) {
	t.plan(2);
	var e = new EventPipeline();
	var error = new Error('failure');

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	e.on('test', function (arg, next) {
		return next(error);
	});

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	e.emit('test', { a : 1 }, function (err, arg) {
		t.equals(err, error, 'error is returned');
		t.equals(arg.a, 2, 'arg calculated correctly');
		t.end();
	});
});

test('returns value when sync', function (t) {
	t.plan(3);
	var e = new EventPipeline();
	var error = new Error('failure');

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	var result = e.emit('test', { a : 1 }, function (err, arg) {
		t.equals(err, null, 'no error');
		t.equals(arg.a, 3, 'arg calculated correctly');

		return 'asdf';
	});

	t.equal(result, 'asdf');
	t.end();
});

test('works without a callback passed to emit', function (t) {
	t.plan(1);
	var e = new EventPipeline();
	var error = new Error('failure');
	var a = { a : 1 };

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	e.on('test', function (arg, next) {
		arg.a += 1;

		return next();
	});

	e.emit('test', a);

	t.equal(a.a, 3);

	t.end();
});

test('test multiple arguments to emit()', function (t) {
	t.plan(2);
	var e = new EventPipeline();
	
	var a = { a : 1 };
	var b = { b : 1 };

	e.on('test', function (arg1, arg2, next) {
		arg1.a += 1;
		arg2.b += 1;

		return next();
	});

	e.on('test', function (arg1, arg2, next) {
		arg1.a += 1;
		arg2.b += 1;

		return next();
	});

	e.emit('test', a, b, function (err, a, b) {
		t.equal(a.a, 3);
		t.equal(b.b, 3);
	
		t.end();
	});
});
