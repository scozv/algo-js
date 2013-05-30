(function(Graph, undefined){

	/*
	g = [
		[ 1, [[2, 100], [3, 299]] ]
	];
	e = [
		[u, v, cost]
	]
	*/
	Graph.__adjacencyList__ = [[0, []]];
	// adjInst is a structure [[v, [i, c]]], where the edge is i into v with cost c.
	Graph.__adjacencyInst__ = [[0, []]];
	Graph.__edgeList__ = [];

	Graph.__build__ = function(input){
		// debugger;

		var txt = input;
		var lines = txt.split('\n');
		// console.log(lines);
		// graph and rev-G
		var count = lines[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(' '); // [vertexSize, edgeSize]
		var graph = Graph.__adjacencyList__;

		// get the number of vertex, edges
		var vertexCount = parseInt(count[0]);
		var edgeCount = parseInt(count[1]);
		Graph.__repair__(vertexCount, edgeCount);

		// i have known the number of the edges
		for (var i=1;i<=edgeCount;i++){
			// process each line
			var v = lines[i]
				.replace(/^\s\s*/, '')
				.replace(/\s\s*$/, '')
				.split(' ');
			
			Graph.__pushEdge__(v[0], v[1], parseInt(v[2]), true);
		}
	};

	Graph.__repair__ = function(v, e, graph, inner){
		graph = graph || Graph.__adjacencyList__;
		inner = inner || Graph.__adjacencyInst__;

		var i;
		for (i=1;i<=v;i++){
			graph[i] = graph[i] || [i, []];
			inner[i] = inner[i] || [i, []]; 
		}
	};

	Graph.__rebuild__ = function(graph){
		graph = graph || Graph.__adjacencyList__;

		for (var i=0;i<graph.length;i++){
			graph[i][0]=i;
		}		
	};

	// IO.defaultFn = Graph.__build__;
	
	Graph.__deepClone__ = function(graph){
		/// <summary>gets a deep cloned copy of the graph.<summary>

		graph = graph || Graph.__adjacencyList__;

		var arr = [];
		for (var i=0;i<graph.length;i++){
			var edge = graph[i][1];
			var endpoints = [];
			for (var j=0;j<edge.length;j++){endpoints.push([edge[j][0], edge[j][1]]);}
			arr.push([graph[i][0], endpoints]);
		}

		return arr;
	};

	Graph.__pushEdge__ = function(v1, v2, cost, directed, graph, inner){
		/// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

		directed = (directed === true) || false;
		graph = graph || Graph.__adjacencyList__;
		inner = inner || Graph.__adjacencyInst__;
		cost = parseInt(cost);

		// if we push v2 into an empty vertex 
		// [v, []] = [label, edgeVertexArray]
		if (!graph[v1]){graph[v1] = [v1, []];}
		graph[v1][1].push([v2, cost]);

		if (!inner[v2]){inner[v2] = [v2, []];}
		inner[v2][1].push([v1, cost]);

		Graph.__edgeList__.push([v1, v2, cost]);

		if (!directed){
			if (!graph[v2]){graph[v2] = [v2, []];}
			graph[v2][1].push([v1, cost]);

			if (!inner[v1]){inner[v1] = [v1, []];}
			inner[v1][1].push([v2, cost]);			
		}
	};

	Graph.__getEdge__ = function(v, inner){
		/// <summary>gets the edge sourceing from v, or inner to v</summary>

		// if and only if inner is true, we return edges go into v.
		inner = (inner === true) || false;

		return inner ? 
			Graph.__adjacencyInst__[v][1]:
			Graph.__adjacencyList__[v][1];	
	};

	Graph.__getKthEdge__ = function(k){
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
		for (var i=1;i<graph.length;i++){
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
		Graph.__labelVertex__(v, false);
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

}(window.Graph = window.Graph || {}));

/*
var g = [
  [1, [[2, 100], [3, 300]]], 
  [2, [1, 3, 4]],
  [3, [1, 2, 4]], 
  [4, [2, 3]]
];
*/