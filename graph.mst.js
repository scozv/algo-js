(function(Graph, undefined){
	// using graph.weighted.js

	Graph.mstPrim = function(g){

		var graph = g.clone();
		var X = [1]; // staring from vertex 1st
		graph.__visitAt__(1);
		var T = [];
		var totalCost = 0;

		var i, j; // return [vertexCount, edgeCount]
		
		while (X.length < graph.n){
			// let e = (u, v) be the cheapest edge of G, with u in X, v not in X
			var min = [0, 0, Number.MAX_VALUE] // u, v, cost
			for(i=0;i<X.length;i++){
				var edges = graph.__edgesFrom__(X[i]);
				for(j=0;j<edges.length;j++){
					if(graph.__visiableAt__(edges[j][0]) && edges[j][1] < min[2]) {// v not in x
						min = [X[i], edges[j][0], edges[j][1]];
					}
				}
			}

			T.push([min[0], min[1]]);
			X.push(min[1]);
			graph.__visitAt__(min[1]);
			totalCost += min[2];
		}

		return totalCost;
	};
}(window.Graph = window.Graph || {}));