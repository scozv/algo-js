(function(type, undefined){

	// shortcut
	// _g, the adjacency list of graph, not this
	// $pt, see wiki

	type.Graph = function(directed){
		// gets a unweighted graph, dafualt is undirected graph
		if (directed !== true){directed = false;}

		// adgList format (each x in adgList): [v, [v1, v2, v3...]] = [label, [edgeVertexArray]]
		// label can be used for marking visit info
		this.__adjacencyList__ = [];
		this.__directed__ = directed;
		this.__validVertexNumber__ = 0;

		this.__invalidVertexIndexError__ = new Error('vertex must be a numeric index');
	};

	$pt = type.Graph.prototype;
	$pt.v = function(){
		return this.__validVertexNumber__;
	};

	$pt.clone = function(){
		var gh = new type.Graph(this.__directed__);
		this.__adjacencyList__.forEach(function(x){
			// clone each x in format [v, []]
			// TODO: warning the case in which we push v2 into an empty vertex
			gh.__adjacencyList__[x[0]] = [x[0], x[1].clone()];
		});

		gh.__validVertexNumber__ = this.__validVertexNumber__;
		gh.__invalidVertexIndexError__ = this.__invalidVertexIndexError__;

		return gh;
	};

	$pt.__pushEdge__ = function(v1, v2){
		/// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

		if (isNaN(v1 = +v1) || isNaN(v2 = +v2)) {
			throw this.__invalidVertexIndexError__;
		}

		var _g = this.__adjacencyList__;

		// warning the case in which we push v2 into an empty vertex
		if (!_g[v1]){ 
			_g[v1] = [v1, []];
			this.__validVertexNumber__++;
		}

		_g[v1][1].push(v2);

		if (!this.__directed__){
			// if not directed, we push [v2, v1]
			if (!_g[v2]){ 
				_g[v2] = [v2, []];
				this.__validVertexNumber__++;
			}

			_g[v2][1].push(v1);			
		}
	};

	$pt.__edgesFrom__ = function(v){
		/// <summary>gets the edge sourceing from v.</summary>
		if (isNaN(v = +v)) {
			throw this.__invalidVertexIndexError__;
		}

		var _g = this.__adjacencyList__;

		if (!_g[v]){ 
			_g[v] = [v, []];
		}

		return _g[v][1];
	};

	$pt.__edgeAt__ = function(k){
		/// <summary>gets a the k-th edge of graph, return the two endpoint.</summary>

		var _g = this.__adjacencyList__,
			p = 0,
			edge = [-1, -1];

		_g.some(function(x){
			return (x && x[0] && x[0]>=0) &&
				x[1].some(function(v){
					if (v>=0 && (p++ == k)){
						edge = [x[0], v];
						return true;
					} else {return false;}
				});
		});

		return edge;
	};

	$pt.__count__ = function(){
		/// <summary>gets the number of vertex and edge.<summary>
		/// <returns type="Array[2]">returns the number of vertex and edge in arr[0] and arr[1].</returns>

		var _g = this.__adjacencyList__,
			v = 0,
			e = 0;

		_g.forEach(function(x){
			if (x && x[0] && x[0]>=0){
				v++;
				x[1].forEach(function(u){
					e += ( u>=0 ? 1 : 0 );
				})
			}
		});

		return [v, this.__directed__ ? e : e>>1];
	};

	$pt.__visiableAt__ = function(v){
		/// <summary>determins whether the v of graph is visiable for visiting or not.</summary>
		if (isNaN(v = +v)) {
			throw this.__invalidVertexIndexError__;
		}		

		var _g = this.__adjacencyList__;
		return _g[v] && _g[v][0] && _g[v][0] >= 0;
	};

	$pt.__labelAt__ = function(v, label){
		/// <summary>marks the label to graph, v for its visited or not, 
		/// the default label is false, means we visits the vertex default.
		/// </summary>
		if (isNaN(v = +v)) {
			throw this.__invalidVertexIndexError__;
		}	

		var _g = this.__adjacencyList__;
		if (!_g[v]) {_g[v]=[v, []];}
		
		if (arguments.length > 1 || label !== undefined){
			_g[v][0] = label;
		}

		return _g[v][0];
	};

	$pt.__visitAt__ = function(v){
		this.__labelAt__(v, -1);
	};


	var random = function(x1, x2){
		/// <summary>gets a random integet between x1 and x2, inclusive.</summary>

		return Math.floor(Math.random() * (x2 - x1 + 1)) + x1;  
	};

	var toString = function(graph){

		graph = graph || Graph.__adjacencyList__;
		var str = [];
		for (var i=0;i<graph.length;i++){
			str.push(graph[i][0] + ': ' + graph[i][1].join(' '));
		}

		return str.join('\n\r');
	};

	type.Graph.__build__ = function(file){
		var gh = new type.Graph(),
			info,
			i,
			minCut,
			e = 0;

		file
			.split('\n')
			.forEach(function(line){
				info = line.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split('\t')
				.map(function(x){
					return +x;
				});

				for (i=1;i<info.length;i++){
					gh.__pushEdge__(info[0], info[i]);
					e++;
				}
			});

		console.log('build', e, gh.__count__());

		minCut = type.Graph.multiMinimumCut(gh, gh.v());
		console.log(minCut);
	};

	type.Graph.multiMinimumCut = function(graph, times){
		/// <summary>gets the minimum number of potential minimum cut in multiple try.<summary>

		var min = Number.MAX_VALUE,
			gh,
			cut;

		Math.range(times).forEach(function(){
			gh = graph.clone();
			cut = minimumCut(gh);
			console.log(gh.__directed__, cut);
			if (cut<min){min=cut;}
		});

		return min;
	};

	var minimumCut = function(graph){
		/// <summary>gets the number of potential minimum cut in single try.<summary>

		var count = graph.__count__(),
			v = count[0],
			e = count[1],
			k = 0,
			edge;
		while (v > 2){
			// console.log(v, e);
			k = random(1, e);
			// find the k-th edge
			edge = graph.__edgeAt__(k);
			// console.log(edge);
			// console.log(k, edge);
			// merge
			mergeVertex(graph, edge[0], edge[1]);
			// recount
			count = graph.__count__();
			v = count[0];
			e = count[1];
		}

		// return number of edges of min cut
		return graph.__count__()[1];
	};

	var mergeVertex = function(graph, v1, v2){
		/// <summary>merges the vertex and contracts the edge.<summary>

		// merge the edge from v1 to v2, e1 is the edges from v1 to v2 (no matter in undirected graph)
		// 1. copy the endpoints from v1's to v2's
		// 2. loop all vertex of graph, change endpoint v1 to v2
		// 3.      if self loop, delete endpoint
		// 4. mark v1 visited
		var _g = graph.__adjacencyList__,
			e1 = graph.__edgesFrom__(v1),
			e2 = graph.__edgesFrom__(v2),
			i;

		// 1
		e1.forEach(function(v){
			if (v>=0 /*&& e2.indexOf(v) === -1*/) {e2.push(v);}
		});

		// 2
		_g.forEach(function(x){
			if (x && x[0]) {
				// edges from x[0]
				for (i=0;i<x[1].length;i++){
					if (x[1][i] === v1) { x[1][i] = v2; }
					// self loop
					if (x[1][i] === x[0]) { x[1][i] = -1; }
				}
			}
		});

		// 3
		_g[v1][0] = -1;
		this.__validVertexNumber__--;
	};

}(window.T = window.T || {}));


/*

var g = [
  [1, [2, 3, 4]], 
  [2, [1, 3, 4]],
  [3, [1, 2, 4, 5]], 
  [4, [1, 2, 3, 6]], 
  [5, [3, 6, 7, 8]], 
  [6, [4, 5, 7, 8]], 
  [7, [5, 6, 8]], 
  [8, [5, 6, 7]]
];


var g = [
  [1, [2, 3]], 
  [2, [1, 3, 4]],
  [3, [1, 2, 4]], 
  [4, [2, 3]]
];
*/