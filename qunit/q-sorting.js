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
	ok(uniqueArraySort(500000), 'random array with unique element of length 500000');
});