test('Sorting basic function', function(){
	// test random unique array generator
	var uniqueArraySort = function(length){
		// get an unique random array, sort it, and it is supported to eaqul the array [0, 1..., n-1]
		length = length || 10;

		var sortedArray = [], 
			randomArray = [],
			success = true,
			i;

		for (i=0;i<length;i++){
			sortedArray[i] = i;
		}

		randomArray = Sorting.__randomUniqueArray__(length);
		// according to MDN
		// If compareFunction is not supplied, elements are sorted by converting them to strings 
		// and comparing strings in lexicographic ("dictionary" or "telephone book," not numerical) order.
		randomArray.sort(function(x, y){return x-y;});

		for (i=0;i<length;i++){
			if (sortedArray[i] !== randomArray[i]) {
				success = false;
				break;
			}
		}

		return success;
	};

	ok(uniqueArraySort(5), 'random array with unique element of length 5');
	ok(uniqueArraySort(50), 'random array with unique element of length 50');
	ok(uniqueArraySort(500), 'random array with unique element of length 500');
	// ok(uniqueArraySort(500000), 'random array with unique element of length 500000');

	var testIsSorted = function(length, fn, compare){
		var arr = Sorting.__randomUniqueArray__(length);
		arr.sort(function(x, y){return compare(fn(x), fn(y));});
		return Sorting.isSorted(arr, fn, compare);
	};

	ok(testIsSorted(50, function(x){return x;}, function(x, y){return x-y;}), 'isSorte test for array of length 50, x=>x, x<y');
	ok(testIsSorted(50, function(x){return x*x;}, function(x, y){return x-y;}), 'isSorte test for array of length 50, x=>x*x, x<y');
	ok(testIsSorted(50, function(x){return x;}, function(x, y){return y-x;}), 'isSorte test for array of length 50, x=>x, x>y');
});

test('Correctness of sorting', function(){
	var arr = Sorting.__randomUniqueArray__(10000);
	ok(Sorting.isSorted(Sorting.mergeSort(arr)), 'merge sort for array of length 10000');
	ok(Sorting.isSorted(Sorting.mergeSortBU(arr)), 'merge sort (bottom up version) for array of length 10000');
	ok(Sorting.isSorted(Sorting.quickSort(arr)), 'quick sort for array of length 10000');
});