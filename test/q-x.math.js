require('./q');

var algo = require('../bundle').default;
var math = algo.math;
var Sorting = algo.sorting;
var array = algo.linear.array;

Array.prototype.zip = function(that){return array.zip(this, that);};
Array.prototype.take = function(n){return array.take(this, n);};
Array.prototype.skip = function(n){return array.skip(this, n);};
Array.prototype.upsert = function(a,b,c){return array.upsert(this, a,b,c);};
Array.prototype.update = function(a,b,c,d){return array.update(this, a,b,c,d);};

test('Array basic extensions', function () {
  deepEqual([1, 2, 3, 4].zip(['A', 'B', 'C', 'D']), [[1, 'A'], [2, 'B'], [3, 'C'], [4, 'D']], 'Array zip same size');
  deepEqual([1, 2, 3, 4].zip(['A', 'B', 'C', 'D', 'E']), [[1, 'A'], [2, 'B'], [3, 'C'], [4, 'D']], 'Array zip different size');
  deepEqual([1, 2, 3].zip(['A', 'B', 'C', 'D']), [[1, 'A'], [2, 'B'], [3, 'C']], 'Array zip different size');
  deepEqual([].zip(['A', 'B', 'C', 'D']), [], 'Array zip different size');
  deepEqual(['A', 'B', 'C', 'D'].zip([]), [], 'Array zip different size');

  var arrEquals = (x, y) =>
    Array.isArray(x) && Array.isArray(y) &&
    x.length === y.length &&  x.zip(y).every(item => math.equals(item[0], item[1]));

  var norm = function (arr) {
    var sum = math.Stats.sum(arr),
      result = [];

    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i] / sum);
    }

    return result;
  };

  (function (n, repeat) {

    var testNormalize = function () {
      var length = math.randomInteger(10, n),
        randomArray = Sorting.__randomUniqueArray__(length),
        norm1 = math.Stats.normalize(randomArray),
        norm2 = norm(randomArray);

      return {
        length: length,
        result: math.equals(norm1, norm2) && arrEquals(norm1, norm2)
      };
    };


    math.range(repeat).forEach(function () {
      var test = testNormalize();
      ok(test.result, 'Array normalized with length: ' + test.length);
    });
  })(100, 5);
});

test('Array query extension', function () {
  deepEqual([].take(0), [], 'Take 0 from empty array');
  deepEqual([1, 3].take(0), [], 'Take 0 from non-empth array');
  deepEqual([1].take(1), [1], 'Take 1 from array');
  deepEqual([1].take(2), [1], 'Take 2 from one-elem array');
  deepEqual([1, 2].take(1), [1], 'Take 1 from multi-elem array');
  deepEqual([1, 3, 5, 8].take(3), [1, 3, 5], 'Take 3 from multi-elem array');

  deepEqual([].skip(0), [], 'Skip 0 from empty array');
  deepEqual([1, 3].skip(0), [1, 3], 'Skip 0 from non-empth array');
  deepEqual([1].skip(1), [], 'Skip 1 from array');
  deepEqual([1].skip(2), [], 'Skip 2 from one-elem array');
  deepEqual([1, 2].skip(1), [2], 'Skip 1 from multi-elem array');
  deepEqual([1, 3, 5, 8].skip(3), [8], 'Skip 3 from multi-elem array');
});

test('Array update or upsert', function () {
  var arr = [],
    how = (a, b) =>({_id: a._id, age: a.age + b.age}),
    find = (array, key) => array.filter(x => x._id === key)[0];

  arr = [{_id: 1, age: 10}, {_id: 4, age: 5}, {_id: -1, age: 3}, {_id: 9, age: 2}];
  arr
    .update({_id: 4, age: 7}, x => x._id, how)
    .upsert({_id: -1, age: 1}, x => x._id, how)
    .update({_id: 7, age: 7}, x => x._id, how)
    .upsert({_id: 7, age: 1}, x => x._id, how);

  deepEqual(arr.length, 5, 'Upsert may insert');
  deepEqual(find(arr, 1).age, 10, 'Upsert nothing if not found');
  deepEqual(find(arr, 4).age, 12, 'Update _id: 4');
  deepEqual(find(arr, -1).age, 4, 'Upsert _id: -1 equivalent to update when found');
  deepEqual(find(arr, 9).age, 2, 'Upsert nothing if not found');
  deepEqual(find(arr, 7).age, 1, 'Upsert may insert while update only update');
});

test('Math basic extensions', function () {
  // for any i = a * n + b
  // * b \in [0, n)
  // Math.abs(i-b) % n === 0
  var checkMod =
    (i, n, b) => math.equals(n, 0) ?
      isNaN(b) :
      b >= 0 && b < n && math.equals(Math.abs(i - b) % n, 0);

  ok(checkMod(0, 0, NaN), '0 mod 0 == NaN');
  ok(checkMod(3, 0, NaN), '3 mod 0 == NaN');
  ok(checkMod(0, 3, 0), '0 mod 3 == 0');
  ok(checkMod(0, 16, 0), '0 mod 16 == 0');
  ok(checkMod(4, 3, 1), '4 mod 3 == 1');
  ok(checkMod(4, 2, 0), '4 mod 2 == 0');
  ok(checkMod(-0, 0, NaN), '-0 mod 0 == NaN');
  ok(checkMod(-3, 0, NaN), '-3 mod 0 == NaN');
  ok(checkMod(-0, 3, 0), '-0 mod 3 == 0');
  ok(checkMod(-0, 16, 0), '-0 mod 16 == 0');
  ok(checkMod(-4, 3, 2), '-4 mod 3 == 2');
  ok(checkMod(-4, 2, 0), '-4 mod 2 == 0');
  math.range(31, 274412817, 17314347).forEach(function (x, k) {
    var i = math.randomInteger(k, x),
      n = math.randomInteger(k, x),
      b1 = math.mod(i, n),
      b2 = math.mod(-i, n);
    ok(checkMod(i, n, b1), 'i = a * n + b, where i, n, b is ' + [i, n, b1].join(', '));
    ok(checkMod(-i, n, b2), 'i = a * n + b, where i, n, b is ' + [-i, n, b2].join(', '));
  });


  throws(function () {
    math.range();
  }, 'range should have at least one args');

  throws(function () {
    math.range('A', 1);
  }, 'range accepts only numerical args');

  deepEqual(math.range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'Math.range(10)');
  deepEqual(math.range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9], 'Math.range(1, 10)');
  deepEqual(math.range(2, 11, 2), [2, 4, 6, 8, 10], 'Math.range(2, 11, 2)');
  deepEqual(math.range(2, 10, 2), [2, 4, 6, 8], 'Math.range(2, 10, 2)');
});

test('Math.stats', function () {
  var a1 = [1, 2, 3, 4, 5, 6, 7, 8];
  var f = function (a, b) {
    return a1.map(function (x) {
      return a * x + b;
    });
  };

  var f1 = function (a) {
    return a1.map(function (x) {
      return Math.pow(x, a);
    });
  };

  var lls = (X, Y, fn) => math.Stats.linearLeastSquare(X, Y, fn);

  ok(math.equals(lls(a1, f(3, 1))[0], 3), 'y=3x+1');
  ok(math.equals(lls(a1, f(-2.31, 3.12))[0], (-2.31)), 'y=-2.31x+3.12');
  ok(math.equals(lls(a1, f1(2), Math.log)[0], (2)), 'y=x^2, with ln()');
  ok(math.equals(lls(a1, f1(-3.141501), Math.log)[0], (-3.141501)), 'y=x^-3.141501, with ln()');
});
