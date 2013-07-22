(function(Math, undefined){
	// ----- API
	// static member
	// Math.mod: (i, n) => num, gets the positive mode from i % n


	// i.e. $mod(-1, 4) = 3
	Math.mod = function(i, n){
		return (i & 0x7FFFFFFF) % n;
	};

	Math.__timer__ = function(fn){
		// stopwatch
		var start = (new Date()).getTime();
		fn();
		var end = (new Date()).getTime();
		return end - start;
	};

}(window.Math = window.Math || {}));