test('Math basic extensions', function(){
	// strictEqual(Math.mod(0, 0), 0 % 0, '0 mod 0 == NaN');
	strictEqual(Math.mod(17, 4), 17 % 4, '17 mod 4 == 1');
	strictEqual(Math.mod(-25, 4), 3, '-25 mod 4 == 3 (-25 == -7 * 4 + 3)');
});

test('Math.stats', function(){
	var a1 = [1, 2, 3, 4, 5, 6, 7, 8];
	var f = function (a, b){
		return a1.map(function(x){return a*x + b;});
	};

	var f1 = function(a){
		return a1.map(function(x){return Math.pow(x, a);});
	};

	ok(Math.Stats.linearLeastSquare(a1, f(3, 1))[0] - 3 < 1e-29, 'y=3x+1');
	ok(Math.Stats.linearLeastSquare(a1, f(-2.31, 3.12))[0] - (-2.31) < 1e-29, 'y=-2.31x+3.12');
	ok(Math.Stats.linearLeastSquare(a1, f1(2), Math.log)[0] - (2) < 1e-29, 'y=x^2, with log');
	ok(Math.Stats.linearLeastSquare(a1, f1(-3.141501), Math.log)[0] - (-3.141501) < 1e-29, 'y=x^-3.141501, with log');
});