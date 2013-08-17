(function(hash, undefined){

	hash.tsum = function(arr, l, r){
		var a = arr.clone(),
			zeroIndex = -1,
			u, v;

		a.push(0);
		a = Sorting.quickSort(a);
		zeroIndex = Sorting.binarySearch(a, 0);

		function index(target){
			// O(nlgn)
			return a.some(function(x){
				u = x;
				v = target - u;
				return (v < 0 ? 
					Sorting.binarySearch(a, v, 0, zeroIndex - 1) : 
					Sorting.binarySearch(a, v, zeroIndex, a.length-1)) > -1;
			}) && (u !== v);
		}

		// O(m * nlgn)
		return Math.range(l, r+1).filter(function(x){
			return index(x);
		});
	};

	hash.tsum1 = function(arr, l, r){
		var h = [];

		// n
		arr.forEach(function(x){h[x] = true;})

		// m * n
		return Math.range(l, r+1).filter(function(x){
			// n * 1
			return arr.some(function(u){
				return u !== (x-u) && h[u] && h[x-u];
			})
		});
	};

	hash.__build__ = function(lines){
		var arr = lines.map(function(x){return +x;});

		var result = hash.tsum1(arr, -10000, 10000);
		console.log(result);
	};

})(window.Hash = window.Hash || {})