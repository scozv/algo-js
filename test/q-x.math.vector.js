test('Math.Vector constucting', function(){
  var isNumber = function(x){
		return !isNaN( parseFloat(x) ) && isFinite( x );
	};

	var isNumberArray = function(arr){
		return Array.isArray(arr) && arr.every(function(x){return isNumber(x);});
	};

	// points
	var p1 = new Math.Point([2, 3, 4]);
	var p2 = new Math.Point([1, 2, 5]);
	ok((p1 instanceof Math.Point) && 
		(p2 instanceof Math.Point), 'Math.Point instance created');
	ok(p1.dimension == 3 &&
		Array.isArray(p1.coordinates) &&
		p1.dimension == p1.coordinates.length, 'Math.Point dimension matches');
	ok(isNumberArray(p1.coordinates), 'Math.Point coordinates is a number set');

	throws(function(){
		new Math.Point();
	}, 'Math.Point can not be built without args');

	throws(function(){
		new Math.Point(1);
	}, 'Math.Point can not be built with an invalid args');

	var v1 = new Math.Vector([7, -1, 1]);
	var v2 = new Math.Vector(p1, p2);
	var v3 = new Math.Vector([0, 0, 0], [2, 4, 2]);
	ok((v1 instanceof Math.Vector) &&
		(v2 instanceof Math.Vector) &&
		(v3 instanceof Math.Vector), 'Math.Vector instance created');

	deepEqual(v2.coordinates, [-1, -1, 1], 'Math.Vector created by two points');
	deepEqual(v3.coordinates, [2, 4, 2], 'Math.Vector created by two arrays');
	deepEqual(p1.vector(p2), v2, 'Math.Vector created by point\'s prototype');

	throws(function(){
		new Math.Vector();
	}, 'Math.Vector can not be built without args');

	throws(function(){
		new Math.Vector(v1, [1, 3]);
	}, 'Math.Vector can not be built with an invalid args');
});

test('Math.Vector static members', function(){
  var p1 = new Math.Point([2, 3, 4]);
  var p2 = new Math.Point([7, -1, 2]);

  var v1 = new Math.Vector([7, -1, 1]);
  var v2 = new Math.Vector(p1, p2); // [5, -4, -2]
  var v3 = new Math.Vector([0, 0, 0], [2, 4, 2]);

  strictEqual(Math.Vector.norm(v1), Math.sqrt(7*7+1.0+1.0), 'Math.Vector.norm(v1)');
  strictEqual(Math.Vector.norm(v2), Math.sqrt(5*5+4*4+2*2), 'Math.Vector.norm(v2)');
  strictEqual(Math.Vector.norm(v3), Math.sqrt(2*2+4*4+2*2), 'Math.Vector.norm(v3)');

  strictEqual(Math.Vector.dot(v1, v2), 35+(4)+(-2), 'Math.Vector.dot(v1, v2)');
  strictEqual(Math.Vector.dot(v1, v3), Math.Vector.dot(v3, v1), 'dot(v1, v2) == dot(v2, v1)');
});