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
		var gh = new Graph(this.__directed__);
		this.__adjacencyList__.forEach(function(x){
			// clone each x in format [v, []]
			// TODO: warning the case in which we push v2 into an empty vertex
			gh.__adjacencyList__.push([x[0], x[1].clone()]);
		});

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

	Graph.__edgesFrom__ = function(v){
		/// <summary>gets the edge sourceing from v.</summary>
		if (isNaN(v = +v)) {
			throw this.__invalidVertexIndexError__;
		}

		return this.__adjacencyList__[v][1];	
	};

	Graph.__edgeAt__ = function(k){
		/// <summary>gets a the k-th edge of graph, return the two endpoint.</summary>

		var graph = Graph.__adjacencyList__;
		var validVertex = 0;
		for (var i=0;i<graph.length;i++){
			if (graph[i][0]>=0){
				for (var j=0;j<graph[i][1].length;j++){
					if (graph[i][1][j]>=0){
						validVertex++;
						if (validVertex==k){
							return [graph[i][0], graph[i][1][j]];
						}
					}
				}
			}
		}

		return [-1, -1];
	};

	Graph.__countGraph__ = function(graph){
		/// <summary>gets the number of vertex and edge.<summary>
		/// <returns type="Array[2]">returns the number of vertex and edge in arr[0] and arr[1].</returns>

		graph = graph || Graph.__adjacencyList__;
		var x = 0;
		var v = 0;
		for (var i=0;i<graph.length;i++){
			if (graph[i][0]>=0){
				for (var j=0;j<graph[i][1].length;j++){
					if (graph[i][1][j]>=0){
						x++;
					}
				}
				v++;
			}
		}

		return [v, x>>1];
	};

	Graph.count = function(){
		return Graph.__countGraph__(Graph.__adjacencyList__);
	}

	Graph.__visiable__ = function(v){
		/// <summary>determins whether the v of graph is visiable for visiting or not.</summary>

		var graph = Graph.__adjacencyList__;
		return graph && graph[v] && graph[v][0];
	};

	Graph.__labelVertex__ = function(v, label){
		/// <summary>marks the label to graph, v for its visited or not, 
		/// the default label is false, means we visits the vertex default.
		/// </summary>
		var graph = Graph.__adjacencyList__;
		if (!graph[v]) {graph[v]=[v, []];}
		
		graph[v][0]=label;
	};

	Graph.__visitVertex__ = function(v){
		var graph = Graph.__adjacencyList__;
		labelVertex(graph, v, false);
	};


	Graph.__random__ = function(x1, x2){
		/// <summary>gets a random integet between x1 and x2, inclusive.</summary>

		return Math.floor(Math.random() * (x2 - x1 + 1)) + x1;  
	};

	Graph.__toString__ = function(graph){

		graph = graph || Graph.__adjacencyList__;
		var str = [];
		for (var i=0;i<graph.length;i++){
			str.push(graph[i][0] + ': ' + graph[i][1].join(' '));
		}

		return str.join('\n\r');
	};

	var minimumCut = function(graph){
		/// <summary>gets the number of potential minimum cut in single try.<summary>

		var gCount = countGraph(graph);
		while (graph.v() > 2){
			var p = random(1, gCount[1]<<1);
			// find the p-th edge
			var e = edge(graph, p);
			// console.log(p, e);
			var x1 = e[0];
			var x2 = e[1];

			mergeVertex(graph, x1, x2);

			// display(graph);
			gCount = countGraph(graph);
		}

		return gCount[1];
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
			if (e2.indexOf(v) === -1) {e2.push(v);}
		});

		// 2
		_g.forEach(function(x){
			if (x && x[1]) {
				// edges from x[0]
				for (var i=0;i<x[1].length;i++){
					if (x[1][i] == v1) { x[1][i] = v2; }
					// self loop
					if (x[1][i] == x[0]) { x[1][i] = -1; }
				}
			}
		});

		// 3
		_g[v1][0] = -1;
		this.__validVertexNumber__--;
	};

}(window.T = window.T || {}));


/*


function multiMinimumCut(graph, times){
	/// <summary>gets the minimum number of potential minimum cut in multiple try.<summary>

	var min = Number.MAX_VALUE;
	for (var i=0;i<times;i++){
		var target = deepCloneGraph(graph);
		var cut = minimumCut(target);
		if (cut<min){min=cut;}
	}

	return min;
}

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