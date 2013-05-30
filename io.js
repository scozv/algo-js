(function(IO, undefined){
	IO.fileHandler = function(files, fn){
		/// <summary>handles the file from the input DOM.</summary>
		
		fn = fn || IO.defaultFn;
		var reader = new FileReader();
		reader.onloadend=function(e) {requestText = e.target.result; fn(e.target.result);}
		reader.readAsText(files[0]);
	};

	IO.defaultFn = function(){
		console.log('IO.defaultFn is not implemented.')
	};
}(window.IO = window.IO || {}));