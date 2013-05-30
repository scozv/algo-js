(function(Sorting, undefined){
	// using sorting.js

	function _partition(arr, l, r, fn, compare){
		var i = l,
			j = r + 1;

		while (true){
			while (compare(fn(arr[++i]), fn(arr[l])) < 0) {
				if (i == r) {break;}
			}

			while (compare(fn(arr[l]), fn(arr[--j])) < 0) {
				if ( j== l) {break;}
			}

			if (i >= j) {break;}
			Sorting.__arraySwap__(arr, i, j);
		}

		Sorting.__arraySwap__(arr, l, j);
		return j;
	};

	function _quickSort(arr, l, r, fn, compare){
		/// <summary>quick sort the arr, during the range from index l to r, inclusive.</summary>

		// base case
		if (r>=arr.length){r=arr.length-1;}

		if (l>=r) {return;}	

		var j = _partition(arr, l, r, fn, compare)

		// recursive calls
		_quickSort(arr, l, j-1, fn, compare);
		_quickSort(arr, j+1, r, fn, compare);
	};

	Sorting.quickSort = function(arr, fn, compare){
		// default sort with function
		fn = fn || function (x){return x;}
		// default order by asc
		compare = compare || function (x, y){return x - y;}
		
		var arrCopy = arr.clone();

		_quickSort(arrCopy, 0, arrCopy.length-1, fn, compare);

		return arrCopy;
	};
}(window.Sorting = window.Sorting || {}));