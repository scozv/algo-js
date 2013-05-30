(function(Sorting, undefined){
	/*
	* inspired by http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
	*/
	Sorting.isSorted = function(arr, fn, order){
		// default sort with function
		fn = fn || function (x){return x;}
		// default order by asc
		order = order || function (x, y){return x < y;}

		var sorted = true, i;
		for (i=0;i<arr.length-2;i++){
			if (!order(fn(arr[i]), fn(arr[i+1]))){
				console.log(arr[i], arr[i+1]);
				sorted = false;
				break;
			}
		}

		return sorted;
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



function remoteReader(url){
	var ctx = new XMLHttpRequest();
	ctx.open('GET', url, true);
	ctx.onreadystatechange = function (){
		if (ctx.readyState===4 && ctx.status ===200){
			var txt = ctx.responseText;
			var lines = txt.split('\r\n');
			var arr = new Array();
			// i have known the number of the numbers
			for (var i=0;i<10000;i++){arr.push(parseInt(lines[i]));}
	  		cp = 0;
	  	    quickSort(arr, 0, arr.length-1);
	  	    console.log(cp);
	    }
	};

    ctx.send(null)
}