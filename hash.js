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
		arr.forEach(function(x){h[x] = 1;})

		// m * n
		return Math.range(l, r+1).filter(function(x){
			// n * 1
			console.log(x);
			return arr.some(function(u){
				return u !== (x-u) && h[x-u];
			})
		});
	};

	hash.tsum2 = function(arr, l, r){
		var hlen = Math.sqrt(arr.length),
			h = [],
			k;

		// O(n)
		arr.forEach(function(x){
			k = Math.mod(x, hlen);
			h[k] = h[k] || [];
			h[k].push(x);
		});

		// O(sqrt(n) * O(sqrt(n) log sqrt(n)))
		// = O(n log sqrt(n))
		h.forEach(function(x){
			if (x && x.sort){
				x.sort(function(u, v){return u - v;});
			}
		});

		// O(log sqrt(n))
		function exsits(x){
			k = Math.mod(x, hlen);
			return h[k] && h[k].length && x >= h[k][0] && x <= h[k][h[k].length-1] && Sorting.binarySearch(h[k], x) > -1;
		}

		// z = x+y?
		// O(m n log sqrt(n))
		return Math.range(l, r+1).filter(function(z){
			// O(n log sqrt(n))
			return arr.some(function(x){
				return (z-x !== x) && exsits(z-x);
			});
		});
	}

	hash.__build__ = function(lines){
		var arr = lines.map(function(x){return +x;});

		var result = hash.tsum2(arr, -10000, 10000);
		console.log(result);
	};

})(window.Hash = window.Hash || {})