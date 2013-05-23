(function(Stats, undefined){
	// using x.array.js
	// using stat.js
	(function(Regression){

		Regression.linearLeastSquare = function(arr1, arr2){
			// require(arr1.length == arr2.length)
			var avg1 = Stats.mean(arr1);
			var avg2 = Stats.mean(arr2);

			var m = 0, n = 0;
			for (var i=0;i<arr1.length;i++){
				m += (arr1[i]-avg1)*(arr2[i]-avg2);
				n += (arr1[i]-avg1)*(arr1[i]-avg1);
			}

			return m / n;
		};

		Regression.logarithmLeastSquare = function(arr1, arr2){
			return Regression.linearLeastSquare(
				arr1.map(Math.log), 
				arr2.map(Math.log));
		};

	}(Stats.Regression = Stats.Regression || {}));
}(window.Stats = window.Stats || {}));