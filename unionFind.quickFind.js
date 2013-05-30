(function(UnionFind, undefined){

	UnionFind.QuickFind = function(n){
		this._count = n;
		this._id = [];
		for (var k=0;k<n;k++){
			this._id[k] = k;
		}
	};

	var $pt = UnionFind.QuickFind.prototype;

	// safe mod function, always return a positive, i.e. $mod(-1, 4) = 3
	// soudld move this to X.mod() -- a new file
	var $mod = function(i, n){
		return (i & 0x7FFFFFFF) % n;
	};

	$pt.count = function(){return this._count;};

	// find parent of i
	$pt.find = function(p){
		p = $mod(p, this._id.length);
		return this._id[p];
	};

	$pt.connected = function(p, q){
		return this.find(p) == this.find(q);
	};

	$pt.union = function(p, q){
		var _ = this;
		var i = _.find(p);
		var j = _.find(q);

		if (i != j){
			for (var k=0;k<_._id.length;k++){
				if (_._id[k] == i) {_._id[k] = j;}
			}

			_._count--;
		}

		return _._count;
	};

}(window.UnionFind = window.UnionFind || {}));