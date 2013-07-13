(function(Math, undefined){
	(function(Stats, undefined){
		// using x.array.js
		
		Stats.sum = function(arr){
			return arr.reduce(function(acc, x){return x + acc;}, 0.0);
		};

		Stats.mean = function(arr){
			return Stats.sum(arr) / arr.length;
		};

		// sample variance
		Stats.var = function(arr){
			var avg = Stats.mean(arr);
			return arr.reduce(
				function(acc, x){
					return (x - avg) * (x - avg);
				}, 
				0.0) / (arr.length - 1);
		};

		Stats.stddev = function(arr){
			return Math.sqrt(Stats.var(arr));
		};

		Stats.linearLeastSquare = function(arr1, arr2, fn){
			// require(arr1.length == arr2.length)
			if (fn && typeof fn === 'function'){
				arr1 = arr1.map(fn);
				arr2 = arr2.map(fn);
			}

			var avg1 = Stats.mean(arr1);
			var avg2 = Stats.mean(arr2);

			var m = 0, n = 0;
			for (var i=0;i<arr1.length;i++){
				m += (arr1[i]-avg1)*(arr2[i]-avg2);
				n += (arr1[i]-avg1)*(arr1[i]-avg1);
			}

			return m / n;
		};
	}(Math.Stats = Math.Stats || {}));
})(window.Math = window.Math || {});