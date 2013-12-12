(function(Sorting, undefined){
	/*
	* inspired by http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
	*/
	Sorting.isSorted = function(arr, compare){
		// default order by asc
		compare = Sorting.__compareOrDefault__(compare);

		var sorted = true, i;
		for (i=0;i<arr.length-2;i++){
			if (compare(arr[i], arr[i+1]) > 0){
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
				heap = new T.MinHeap();
				break;
			case 'DESC':
			case 'desc':
				heap = new T.MaxHeap();
				break;
			default:
				throw new Error('invalid order option, use one of ASC | DESC');
		}

		// push x into heap
		arr.forEach(function(x){heap.push(x);});

		return heap.__toArray__();
	};

	Sorting.binarySearch = function(arr, x, low, high){
		low = low || 0;
		high = high || arr.length-1;

		var mid = -1;

		while (low <= high){
			mid = low + ((high - low) >> 1);
			if (arr[mid] === x) {return mid;}
			else if (arr[mid] < x) {low = mid + 1;}
			else {high = mid - 1;}
		}

		return -1;
	};

	Sorting.__build__ = function(lines){
		// sort the arr from the file
		var arr = lines.map(function(x){return +x;});

		var result = Sorting.medianMaintenence(arr);
		console.log(Math.Stats.sum(result) % 10000);
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

	Sorting.__compareOrDefault__ = function(compare){
		return compare && (typeof compare === 'function') ? 
			compare : 
			function(x, y){return x - y;}
	};

}(window.Sorting = window.Sorting || {}));