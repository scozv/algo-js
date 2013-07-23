(function(Math, undefined){
	// ----- API
	// static member
	// Math.mod: (i, n) => num, gets the positive mode from i % n


	// i.e. $mod(-1, 4) = 3
	Math.mod = function(i, n){
		return (i & 0x7FFFFFFF) % n;
	};

	Math.range = function(start, end, step){
		// gets a range [start, end) with step
		var arr = [],
			i;

		if (arguments.length == 0){
			throw new Error('at least one argument.');
		}

		for (i=0;i<arguments.length;i++){
			if ((+arguments[i]) !== arguments[i]){
				throw new Error('all of arguments should be number.');
			}
		}

		if (arguments.length == 1){
			end = arguments[0];
			start = 0;
			step = 1;
		} else if (arguments.length == 2){
			start = arguments[0];
			end = arguments[1];
			step = 1;
		} else {
			start = arguments[0];
			end = arguments[1];
			step = arguments[2];
		}

		for (i=start;i<end;i+=step){
			arr.push(i);
		}

		return arr;
	};

	Math.__timer__ = function(fn){
		// stopwatch
		var start = (new Date()).getTime();
		fn();
		var end = (new Date()).getTime();
		return end - start;
	};

}(window.Math = window.Math || {}));