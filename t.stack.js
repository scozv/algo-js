(function(type, undefined){
	type.Stack = function(){
		this.__length__ = 0;
		this.__innerList__ = [];
		this.__emptyAccessError__ = new Error('access an empty stack');
	};

	type.Stack.prototype = {
		isEmpty: function(){
			return this.__length__ == 0;
		},

		size: function(){
			return this.__length__;
		},

		push: function(item){
			this.__innerList__[this.__length__] = item;
			this.__length__++;
		},

		peek: function(){
			if (this.isEmpty()){
				throw this.__emptyAccessError__;
			}

			return this.__innerList__[this.__length__ - 1];
		},

		pop: function(){
			// peek the value, and delete it
			// actually, we do not delete it immediately
			var item = this.peek();
			this.__length__--;
			return item;
		},

		forEach: function(fn){
			fn = fn || function(x){return x;};
			var i = this.__length__ - 1;
			for (;i>=0;i--){
				fn(this.__innerList__[i]);
			}
		},

		map: function(fn){
			fn = fn || function(x){return x;};
			var arr = [],
				i = 0;
			this.forEach(function(x){
				arr[i++] = fn(x);
			});

			return arr;
		}, 

		toArray: function(){
			return this.map();
		}
	};

	// algorithm application
	type.Stack.validPopSeries = function(pushArray, popArray){
		// if we push [1, 2, 3, 4] one by one, 
		// can we get the series [2, 3, 4, 1] by poping after certain push?
		var st = new type.Stack(),
			j = 0 ;
		pushArray.forEach(function(x){
			st.push(x);
			while(!st.isEmpty() && st.peek() == popArray[j]){
				st.pop(); j++;
			}
		});

		return st.isEmpty();
	};
}(window.T = window.T || {}));