(function(type, undefined){
	type.Stack = function(){
		this.__length__ = 0;
		this.__innerList__ = [];
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
				throw new Error(T.ERROR.INVALID_EMPTY_COL_ACTION);
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
}(window.T = window.T || {}));