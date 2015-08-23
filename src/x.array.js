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

	$pt.clone = function(){
		return this.map(function(x){return x;});
	};

	$pt.zip = function(that){
		return Array.zip(this, that);
	};

  $pt.take = function(n){
    var result = [];
    for (var i=0;i<this.length&&i<n;i++){
      result.push(this[i]);
    }

    return result;
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

	Array.swap = function(arr, i, j){
		i %= arr.length;
		j %= arr.length;

		var swap=arr[i];
		arr[i]=arr[j];
		arr[j]=swap;
	};
}(window.Array = window.Array || {}));