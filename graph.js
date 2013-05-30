(function(Graph, undefined){

	Graph.__adjacencyList__ = [];
	
	Graph.__deepClone__ = function(graph){
		/// <summary>gets a deep cloned copy of the graph.<summary>

		graph = graph || Graph.__adjacencyList__;

		var arr = [];
		for (var i=0;i<graph.length;i++){
			var edge = graph[i][1];
			var endpoints = [];
			for (var j=0;j<edge.length;j++){endpoints.push(edge[j]);}
			arr.push([graph[i][0], endpoints]);
		}

		return arr;
	};

	Graph.__pushEdge__ = function(v1, v2, directed){
		/// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

		if (directed!==true){directed=false;}
		var graph = Graph.__adjacencyList__;
		// if we push v2 into an empty vertex 
		// [v, []] = [label, edgeVertexArray]
		if (!graph[v1]){graph[v1] = [v1, []]}
		graph[v1][1].push(v2);

		if (!directed){
			if (!graph[v2]){graph[v2] = [v2, []]}
			graph[v2][1].push(v1);			
		}
	};

	Graph.__getEdge__ = function(v){
		/// <summary>gets the edge sourceing from v.</summary>

		return Graph.__adjacencyList__[v][1];	
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

}(window.Graph = window.Graph || {}));

/*
function minimumCut(graph){
    /// <summary>gets the number of potential minimum cut in one try.<summary>

	// debugger;

	var gCount = countGraph(graph);
	while (gCount[0] > 2){
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
}

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

function mergeVertex(graph, v1, v2){
    /// <summary>merges the vertex and contracts the edge.<summary>

	// merge the edge from v1 to v2, e1 is the edges of v1
	// 1. copy the endpoints from v1's to v2's
	// 2. loop all vertex of graph, change endpoint v1 to v2
	// 3.      if self loop, delete endpoint
	// 4. mark v1 visited

	var e1 = graph[parseInt(v1)-1][1];
	var e2 = graph[parseInt(v2)-1][1];

	// 1
	for (var i=0;i<e1.length;i++){e2.push(e1[i]);}
	// 2
	for (var i=0;i<graph.length;i++){
		var thisVertex = graph[i][0];
		var thisEdge = graph[i][1];
		for (var j=0;j<thisEdge.length;j++){
			if (thisEdge[j]==v1){thisEdge[j]=v2;}
			// self loop
			if (thisEdge[j]==thisVertex){thisEdge[j]=-1;}
		}
	}
	// 3
	graph[parseInt(v1)-1][0] = -1;
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