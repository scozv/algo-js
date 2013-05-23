(function(Array, undefined){
	var $pt = Array.prototype;

	// -----API
	// extended object members of Array:
	// foldl, foldr: (fn, acc) => acc
	// map: (fn) => arr
	// clone: () => arr

	// static members:
	// Array.zip: (arr1, arr2) => arr3 

	$pt.foldl = function(fn, acc){
		// fn = (x, acc) -> acc
		// fn must return sth.
		acc = acc || 0.0;
		var i;
		for (i = 0;i < this.length;i++){
			acc = fn(this[i], acc);
		}

		return acc;
	};

	$pt.foldr = function(fn, acc){
		// fn = (x, acc) -> acc
		// for static the arr, we clone a copy
		var arr = this.clone();
		acc = acc || 0.0;

		var i;
		for (i = arr.length - 1;i >= 0;i--){
			acc = fn(arr[i], acc);
		}

		return acc;
	};

	$pt.map = function(fn){
		var arr = [],
			i;
		for (i=0;i<this.length;i++){
			arr.push(fn(this[i]));
		}
		return arr;
	};

	$pt.clone = function(){
		return this.map(function(x){return x;});
	};

	// static member
	Array.zip = function(arr1, arr2){
		var arr = [],
			n = Math.min(arr1.length, arr2.length),
			i;
		for (i=0;i<n;i++){
			arr.push([arr1[i], arr2[i]]);
		}
		return arr;
	};
}(window.Array = window.Array || {}));