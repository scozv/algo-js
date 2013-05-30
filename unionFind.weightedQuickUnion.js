(function(UnionFind, undefined){

	UnionFind.WeightedQuickUnion = function(n){
		this._count = n;
		this._id = [];
		this._size = [];
		
		for (var k=0;k<n;k++){
			this._id[k] = k;
			this._size[k] = 1;
		}
	};

	var $pt = UnionFind.WeightedQuickUnion.prototype;

	$pt.count = function(){return this._count;};

	// find parent of i
	$pt.find = function(p){
		while (p != this._id[p]){
			p = this._id[p];
		}

		return p;
	};

	$pt.connected = function(p, q){
		return this._find(p) == this._find(q);
	};

	$pt.union = function(p, q){
		var _ = this;
		var i = this.find(p);
		var j = this.find(q);

		if (i != j){			
			if (_._size[i] < _._size[j]) {_._id[i]=j;_._size[j] += _._size[i];}
			else {_._id[j]=i;_._size[i] += _._size[j];}

			_._count--;
		}

		return _._count;
	};

}(window.UnionFind = window.UnionFind || {}));