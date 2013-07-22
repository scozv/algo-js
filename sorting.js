(function(Sorting, undefined){
	/*
	* inspired by http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
	*/
	Sorting.isSorted = function(arr, fn, compare){
		// default sort with function
		fn = fn || function (x){return x;}
		// default order by asc
		compare = compare || function (x, y){return x - y;}

		var sorted = true, i;
		for (i=0;i<arr.length-2;i++){
			if (compare(fn(arr[i]), fn(arr[i+1])) < 0){
				console.log(arr[i], arr[i+1]);
				sorted = false;
				break;
			}
		}

		return sorted;
	};

	Sorting.__build__ = function(file){
		// sort the arr from the file
		var arr = file
			.split('\n')
			.map(function(x){
				return parseInt(x.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
			});

		Sorting.mergeSort(arr);			
	};

	Sorting.__arraySwap__ = function(arr, i1, i2){
		/// <summary>swap the element of index i1 and i2 in array named arr.</summary>

		i1 %= arr.length;
		i2 %= arr.length;

		var swap=arr[i1];
		arr[i1]=arr[i2];
		arr[i2]=swap;
	};

}(window.Sorting = window.Sorting || {}));