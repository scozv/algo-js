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
		throw new Error('use Array.reduce instead');
	};

	$pt.foldr = function(fn, acc){
		throw new Error('use Array.reduceRight instead');
	};

	// 
	// $pt.map = function(fn){
	// 	var arr = [],
	// 		i;
	// 	for (i=0;i<this.length;i++){
	// 		arr.push(fn(this[i]));
	// 	}
	// 	return arr;
	// };

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