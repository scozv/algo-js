(function(type, undefined){
	// using sorting.js

	var _heap = function(compare){
		// inspired by alg4p1's implementation
		this.__id__ = [-1];
		this.__count__ = 0;
		// default compare(x, y) is x - y;
		this.__compare__ = compare || function(x, y){return x - y;};
	};

	_heap.prototype = {
		isEmpty: function(){
			return this.__count__ <= 0;
		},

		// exchange child with parent, until _heap is ordered
		__swim__:function (k){
			var id = this.__id__,
				cp = this.__compare__;

			while (k>1 && cp(id[k], id[k>>1]) < 0){
				Array.swap(id, k, k>>1);
				k >>= 1;
			}
		},

		push: function(x){
			this.__id__[++this.__count__] = x;
			this.__swim__(this.__count__);
			return this.__count__;
		},

		// exchange parent with larger child for max_heap or smaller child for min_heap, until _heap is ordered
		__sink__: function(k){
			var id = this.__id__,
				cp = this.__compare__,
				ct = this.__count__,
				j;
			while ((k<<1) <= ct){
				j = (k<<1);
				if (j < ct && cp(id[j+1], id[j]) < 0) {j++;}
				if (cp(id[j], id[k]) < 0) {
					Array.swap(id, k, j);
					k = j;
				} else {break;}
			}
		},

		pop: function(){
			if (this.__count__ <= 0){
				throw new Error('empty _heap now.');
			}

			var res = this.__id__[1];
			Array.swap(this.__id__, 1, this.__count__--);
			this.__sink__(1);
			this.__id__[this.__count__ + 1] = undefined;
			return res;
		},

		__toArray__: function(){
			console.warn('this heap has been destroyed by pop to empty');
			var arr = [];
			while (!this.isEmpty()) {
				arr.push(this.pop());
			}

			return arr;
		}
	};

	type.MaxHeap = function(){
		return new _heap(function(x, y){return y - x;});
	};

	type.MinHeap = function(compare){
		return new _heap(compare || function(x, y){return x - y;});
	};
}(window.T = window.T || {}));