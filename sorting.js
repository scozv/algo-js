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
			if (compare(fn(arr[i]), fn(arr[i+1])) > 0){
				// console.log(arr[i], arr[i+1]);
				sorted = false;
				break;
			}
		}

		return sorted;
	};

	Sorting.heapSort = function(arr, option){
		option = option || {
			'order': 'ASC'
		};

		var heap;

		switch (option.order){
			case 'ASC':
			case 'asc':
				heap = T.MinHeap();
				break;
			case 'DESC':
			case 'desc':
				heap = T.MaxHeap();
				break;
			default:
				throw new Error('invalid order option, use one of ASC | DESC');
		}

		// push x into heap
		arr.forEach(function(x){heap.push(x);});

		return heap.__toArray__();
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

		throw new Error('use Array.swap() instead');
	};

	Sorting.__randomUniqueArray__ = function(length){
		/// <summary>gets an array of such length, each unique integer element in [0, length].</summary>

		var arr = [],
			i;
		for (i=0;i<length;i++){
			arr[i]=i;
		}

		// Knuth shuffle
		var j=-1;
		for (i=length-1;i>0;i--){
			// math.r in [0, 1), we need j in [0, i]
			j = Math.floor(Math.random() * (i + 1));
			Array.swap(arr, i, j);
		}

		return arr;
	};

}(window.Sorting = window.Sorting || {}));