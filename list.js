(function(list, undefined){
	// algorithm application
	list.validPopStackSeries = function(pushArray, popArray){
		// if we push [1, 2, 3, 4] one by one, 
		// can we get the series [2, 3, 4, 1] by poping after certain push?
		var st = new T.Stack(),
			j = 0 ;
		pushArray.forEach(function(x){
			st.push(x);
			while(!st.isEmpty() && st.peek() == popArray[j]){
				st.pop(); j++;
			}
		});

		return st.isEmpty();
	};

	list.medianMaintenence = function(arr){
		// [MaxHeap, max], media ,[min, MinHeap]

		var min = new T.MinHeap(),
			max = new T.MaxHeap(),
			media = [];

		arr.forEach(function(x){
			if (min.size() === max.size()){
				if (!max.isEmpty() && x > max.peek()) {min.push(x); max.push(min.pop());}
				else {max.push(x);}
			} else {
				// we always keep max.size - min.size \in [0, 1]
				if (x > max.peek()) { min.push(x); }
				else { max.push(x); min.push(max.pop()); }
			}

			media.push(max.peek());
		});

		return media;
	};
})(window.List = window.List || {});