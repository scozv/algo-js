(function(Math, undefined){
  Math.EPSILON = Math.abs(1e-29);

	// i.e. $mod(-1, 4) = 3
	Math.mod = (i, n) => (i & 0x7FFFFFFF) % n;

  Math.equals = function(x, y){
    var eq = false;

    if (Array.isArray(x) && Array.isArray(y)) {
      eq = x.length === y.length && 
        Array.zip(x, y).every(item => Math.equals(item[0], item[1]));
    } else if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y))) {
      eq = Math.abs(parseFloat(x) - parseFloat(y)) < Math.EPSILON;
    } else {eq = false;}

    return eq;
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

		if (isNaN(start = +start) || isNaN(end = +end) || isNaN(step = +step)) {
			throw new Error('invalid number as parameter');
		}

		for (i=start;i<end;i+=step){
			arr.push(i);
		}

		return arr;
	};

	Math.randomInteger = function(a, b){
		// return a random integer in [a=0, b]
		var swap = 0;
		if (arguments.length === 0) {
			throw new Error('at least one parameter');
		} else if (arguments.length === 1) {
			b = a;
			a = 0;
		}

		if (isNaN(a = +a) || isNaN(b = +b)) {
			throw new Error('invalid number as parameter');
		}

		if (a > b) {
			swap = a;
			a = b;
			b = swap;
		}

		return Math.floor(Math.random() * (b - a + 1)) + a;
	}

	Math.__timer__ = function(fn){
		// stopwatch
		var start = (new Date()).getTime();
		fn();
		var end = (new Date()).getTime();
		return end - start;
	};

}(window.Math = window.Math || {}));