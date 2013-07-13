test('Math basic extensions', function(){
	// strictEqual(Math.mod(0, 0), 0 % 0, '0 mod 0 == NaN');
	strictEqual(Math.mod(17, 4), 17 % 4, '17 mod 4 == 1');
	strictEqual(Math.mod(-25, 4), 3, '-25 mod 4 == 3 (-25 == -7 * 4 + 3)');
});