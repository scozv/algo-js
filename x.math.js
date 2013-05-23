(function(Math, undefined){
	// ----- API
	// static member
	// Math.mod: (i, n) => num, gets the positive mode from i % n


	// i.e. $mod(-1, 4) = 3
	Math.mod = function(i, n){
		return (i & 0x7FFFFFFF) % n;
	};
}(window.Math = window.Math || {}));