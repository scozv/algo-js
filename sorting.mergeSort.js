(function(Sorting, undefined){
	// using x.array.js
	// using sorting.js

	function _deepCloneTo(arr, to){
		// require arr.length  = to.length;
		for (i=0;i<arr.length;i++){
			to[i] = arr[i];
		}
	};

	function _merge(arr, aux, l, mid, r, fn, compare){
		// required sorted(arr, l, mid);
		// required sorted(arr, mid+1, r);
		// require arr.length = aux.length;
		// if (exceed > 7){console.log('Ex');return;}else{console.log(exceed);}

		_deepCloneTo(arr, aux);
		var i = l, j = mid + 1,
			k = l;
		for (;k<=r;k++){
			if (i>mid) {arr[k]=aux[j++];}
			else if (j>r) {arr[k]=aux[i++];}
			else if (compare(fn(aux[i]), fn(aux[j])) > 0) {arr[k]=aux[j++];}
			else {arr[k]=aux[i++];}
		}

		exceed++;
	};

	function _mergeSort(arr, aux, l, r, fn, compare){
		if (l < r){
			var mid = l + ((r-l) >> 1);
			_mergeSort(arr, aux, l, mid, fn, compare);
			_mergeSort(arr, aux, mid+1, r, fn, compare);
			_merge(arr, aux, l, mid, r, fn, compare);
		}
	};

	Sorting.mergeSort = function(arr, fn, compare){
		// default sort with function
		fn = fn || function (x){return x;}
		// default order by asc
		compare = compare || function (x, y){return x - y;}
		var copy = arr.clone();
		var aux = [];

		_mergeSort(copy, aux, 0, copy.length-1, fn, compare);

		return copy;
	};

	Sorting.mergeSortBU = function(arr, fn, compare){
		// default sort with function
		fn = fn || function (x){return x;}
		// default order by asc
		compare = compare || function (x, y){return x - y;}
		var copy = arr.clone();
		var aux = [];
		var n = arr.length,
			sz = 1,
			lo = 0;
		for (sz=1; sz<n; sz <<= 1){
			for (lo=0; lo<n-sz;lo+=(sz<<1)){
				_merge(copy, aux, lo, lo+sz-1, Math.min(lo+sz+sz-1, n-1), fn, compare);
			}
		}

		return copy;
	};

}(window.Sorting = window.Sorting || {}));