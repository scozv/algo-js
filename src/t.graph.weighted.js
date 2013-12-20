(function(type, undefined){

	// shortcut
	// _g, the adjacency list of graph, not this
	// $pt, see wiki

	type.GraphW = (function(_super){
		T.__x__(me, _super);
		// adgList format (each x in adgList): [v, [[v1, w1], [v2, w2], [v3, w3]...]] = [label, [edgeVertexArray]]

		function me(n, directed){
			_super.call(this, n, directed);
		}

		return me;

	})(type.Graph);

	var $pt = type.GraphW.prototype;

	$pt.clone = function(){
		var gh = new type.GraphW(this.n, this.__directed__);
		this.__adjacencyList__.forEach(function(x){
			// clone each x in format [v, []]
			// TODO: warning the case in which we push v2 into an empty vertex
			gh.__adjacencyList__[x[0]] = [x[0], x[1].map(function(v){return v.clone();})];
		});

		gh.__v__ = this.__v__;
		gh.__e__ = this.__e__;

		return gh;
	};

	$pt.toString = function(verbose){
		if (verbose !== true) {verbose = false;}

		var count = this.__count__(),
			_g = this.__adjacencyList__,
			str = ['Graph: #n = ' + String(this.n) + ', #v = ' + String(count[0]) + ', #e = ' + String(count[1])];

		if (verbose){
			_g.filter(function(x){return x && x[0] && x[0] > 0}).forEach(function(x){
				str.push(x[0] + ': ' + x[1]
					.filter(function(v){return v.length === 2;})
					.map(function(v){return String(v[0]) + '(' + String(v[1]) + ')';})
					.join(','));
			});
		}

		return str.join('\n\r');
	};

	$pt.__pushEdge__ = function(v1, v2, w, bidirectional){
		/// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

		if (isNaN(v1 = +v1) || isNaN(v2 = +v2)) {
			throw new Error(T.ERROR.INVALID_NUMERIC_VALUE);
		}

		var _g = this.__adjacencyList__;

		if (!_g[v1]){ 
			_g[v1] = [v1, []];
			this.__v__++;
		}

		_g[v1][1].push([v2, w]);
		this.__e__++;

		if (!this.__directed__ && bidirectional){
			// if not directed, AND we force bidirectional pusing, 
			// then we push [v2, v1]
			if (!_g[v2]){ 
				_g[v2] = [v2, []];
				this.__v__++;
			}

			_g[v2][1].push([v1, w]);	
			this.__e__++;		
		}
	};

	type.GraphW.__build__ = function(lines){
		var gh,
			info,
			i,
			current,
			vm;

		lines
			.forEach(function(line, i){
				if (i===0){
					gh = new type.GraphW(+(line.split(' ')[0]))
				} else {
					info = line.split(' ');
					gh.__pushEdge__(+info[0], +info[1], +info[2], true);			
				}			
			});

		result = Graph.mstPrim(gh);
		console.log(result);

		result = Graph.mstKruskal(gh);
		console.log(result);
	};

})(window.T = window.T || {});
