(function(Stats, undefined){
	// using x.array.js
	
	Stats.sum = function(arr){
		return arr.foldl(function(x, acc){return x + acc;}, 0.0);
	};

	Stats.mean = function(arr){
		return Stats.sum(arr) / arr.length;
	};

	// sample variance
	Stats.var = function(arr){
		var avg = Stats.mean(arr);
		return arr.foldl(
			function(x, acc){
				return (x - avg) * (x - avg);
			}, 
			0.0) / (arr.length - 1);
	};

	Stats.stddev = function(arr){
		return Math.sqrt(Stats.var(arr));
	};
}(window.Stats = window.Stats || {}));