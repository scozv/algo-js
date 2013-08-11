(function(Graph, undefined){
	Graph.dijkstra = function(graph, s){
		s = s || 1;

		// assert is weighted, s in [1. n]
		var frontier = new T.MinHeap(function(x, y){return x[1] - y[1];}),	// each x, y is formated like [v, w]
			g = graph.clone(),
			i = 0,
			current;

		Math.range(1, g.n+1).forEach(function(v){
			g.__labelAt__(v, -1);
			// -1 for init
			// [0, ...] for FINAL shortest length from init s
		});

		// init for s
		frontier.push([s, 0]);

		while (!frontier.isEmpty() && i < g.n){
			current = frontier.pop();
			g.__labelAt__(current[0], current[1]);
			i++;

			g.__edgesFrom__(current[0]).forEach(function(v){
				if (g.__labelAt__(v[0]) === -1){
					// not visited, update each in frontier
					var updated = frontier.__id__.some(function(x, k){
						// return x && x[0] === v[0] && (doUpdate, true)
						return x && (x[0] === v[0]) && 
							((function(){
								if (current[1] + v[1] < x[1]) {
									x[1] = current[1] + v[1];
									frontier.__swim__(k);
								}
							})(), true);
					});

					if (!updated){
						frontier.push([v[0], current[1] + v[1]]);
					}
				} // end if, unvisited
			});
		}

		
		return g.__adjacencyList__	
			.map(function(v, i){return [i, v[0]];})
			.filter(function(v){return v && v.length;})	;	

		// return g.__adjacencyList__			
		// 	.map(function(v, i){return String(i) + '(' + String(v[0]) + ')';})
		// 	.filter(function(v){return v && v[0] && v[0].length;})
		// 	.join(',');
	};
})(window.Graph = window.Graph || {});