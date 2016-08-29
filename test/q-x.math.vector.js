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

test(
  'Math.Vector constucting', function () {
  var isNumber = function (x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
  };

  var isNumberArray = function (arr) {
    return Array.isArray(arr) && arr.every(function (x) {
        return isNumber(x);
      });
  };

  // points
  var p1 = new math.Point([2, 3, 4]);
  var p2 = new math.Point([1, 2, 5]);
  ok((p1 instanceof math.Point) &&
    (p2 instanceof math.Point), 'Math.Point instance created');
  ok(p1.dimension == 3 &&
    Array.isArray(p1.coordinates) &&
    p1.dimension == p1.coordinates.length, 'Math.Point dimension matches');
  ok(isNumberArray(p1.coordinates), 'Math.Point coordinates is a number set');

  throws(function () {
    new math.Point();
  }, 'Math.Point can not be built without args');

  throws(function () {
    new math.Point(1);
  }, 'Math.Point can not be built with an invalid args');

  var v1 = new math.Vector([7, -1, 1]);
  var v2 = new math.Vector(p1, p2);
  var v3 = new math.Vector([0, 0, 0], [2, 4, 2]);
  ok((v1 instanceof math.Vector) &&
    (v2 instanceof math.Vector) &&
    (v3 instanceof math.Vector), 'Math.Vector instance created');

  deepEqual(v2.coordinates, [-1, -1, 1], 'Math.Vector created by two points');
  deepEqual(v3.coordinates, [2, 4, 2], 'Math.Vector created by two arrays');
  deepEqual(p1.vector(p2), v2, 'Math.Vector created by points prototype');

  throws(function () {
    new math.Vector();
  }, 'Math.Vector can not be built without args');

  throws(function () {
    new math.Vector(v1, [1, 3]);
  }, 'Math.Vector can not be built with an invalid args');
});

test('Math.Vector static members', function () {
  var p1 = new math.Point([2, 3, 4]);
  var p2 = new math.Point([7, -1, 2]);

  var v1 = new math.Vector([7, -1, 1]);
  var v2 = new math.Vector(p1, p2); // [5, -4, -2]
  var v3 = new math.Vector([0, 0, 0], [2, 4, 2]);

  strictEqual(math.Vector.norm(v1), Math.sqrt(7 * 7 + 1.0 + 1.0), 'Math.Vector.norm(v1)');
  strictEqual(math.Vector.norm(v2), Math.sqrt(5 * 5 + 4 * 4 + 2 * 2), 'Math.Vector.norm(v2)');
  strictEqual(math.Vector.norm(v3), Math.sqrt(2 * 2 + 4 * 4 + 2 * 2), 'Math.Vector.norm(v3)');

  strictEqual(math.Vector.dot(v1, v2), 35 + (4) + (-2), 'Math.Vector.dot(v1, v2)');
  strictEqual(math.Vector.dot(v1, v3), math.Vector.dot(v3, v1), 'dot(v1, v2) == dot(v2, v1)');
});