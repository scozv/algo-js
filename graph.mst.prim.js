(function(Graph, undefined){
	// using graph.weighted.js

	Graph.mstPrim = function(){

		var X = ['1']; // staring from vertex 1st
		Graph.__visitVertex__('1');
		var T = [];
		var totalCost = 0;

		var count = Graph.count(), i, j; // return [vertexCount, edgeCount]
		
		while (X.length < count[0]){
			// let e = (u, v) be the cheapest edge of G, with u in X, v not in X
			var min = [0, 0, Number.MAX_VALUE] // u, v, cost
			for(i=0;i<X.length;i++){
				var edges = Graph.__getEdge__(X[i]);
				for(j=0;j<edges.length;j++){
					if(Graph.__visiable__(edges[j][0]) && edges[j][1] < min[2]) {// v not in x
						min = [X[i], edges[j][0], edges[j][1]];
					}
				}
			}

			T.push([min[0], min[1]]);
			X.push(min[1]);Graph.__visitVertex__(min[1]);
			totalCost += min[2];
		}

		Graph.__rebuild__();

		return totalCost;
	};
}(window.Graph = window.Graph || {}));