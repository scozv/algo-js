(function (type, undefined) {
    'use strict';

	type.QuickFind = function (n) {
		this._count = n;
		this._id = Math.range(n);
	};

	var $pt = type.QuickFind.prototype;

	$pt.count = function () {
        return this._count;
    };

	// find parent of i
	$pt.find = function (p) {
		p = Math.mod(p, this._id.length);
		return this._id[p];
	};

	$pt.connected = function (p, q) {
		return this.find(p) === this.find(q);
	};

	$pt.union = function (p, q) {
		var _ = this,
            i = _.find(p),
            j = _.find(q);

		if (i !== j) {
            _._id.forEach(function (x, k) {
                _._id[k] = (x === i ? j : x); 
            });
            
			_._count--;
		}

		return _._count;
	};    
    
    // weigthed quick union
	type.WeightedQuickUnion = (function (_super) {
		function me(n) {            
			_super.call(this, n);
            this._size = Math.range(n).map(function () {
                return 1;
            });
		}
        
        T.__x__(me, _super);
		return me;
	}(type.QuickFind));

	var $wpt = type.WeightedQuickUnion.prototype;
    
	$wpt.find = function (p) {
        p = Math.mod(p, this._id.length);
		while (p !== this._id[p]) {
			p = this._id[p];
		}

		return p;
	};

	$wpt.union = function (p, q) {
		var _ = this,
            i = this.find(p),
            j = this.find(q);

		if (i !== j) {
            if (_._size[i] < _._size[j]) {
                _._id[i] = j;
                _._size[j] += _._size[i];
            } else {
                _._id[j] = i;
                _._size[i] += _._size[j];
            }

			_._count--;
		}

		return _._count;
	};    
    
}(window.T = window.T || {}));