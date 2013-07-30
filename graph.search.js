(function(Graph, undefined){
	// using t.graph.js
	// using t.queue.js

	Graph.bfs = function(graph){
		var order		= [],
			frontier	= new T.Queue(),
			current,
			_g			= graph.__adjacencyList__;

		frontier.enqueue(1);
		while (!frontier.isEmpty()){
			current = frontier.dequeue();
			
			// push all valid v sourcing from current into queue
			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					if (graph.__visiableAt__(v)) {
						frontier.enqueue(v);
						// v has been add into queue
						// TODO: labelAt (v, 'visited' | 'marked') for diff meaning
						graph.__labelAt__(v, -1);
					}
				});
			}
			// visit current
			graph.__visitAt__(current);
			order.push(current);
		}

		return order;
	};

	Graph.dfs = function(graph){
		var order		= [],
			frontier	= new T.Stack(),
			current,
			_g			= graph.__adjacencyList__;

		frontier.push(1);
		while (!frontier.isEmpty()){
			current = frontier.pop();
			
			// push all valid v sourcing from current into queue
			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					if (graph.__visiableAt__(v)) {
						frontier.push(v);
						// v has been add into queue
						// TODO: labelAt (v, 'visited' | 'marked') for diff meaning
						graph.__labelAt__(v, -1);
					}
				});
			}
			// visit current
			graph.__visitAt__(current);
			order.push(current);
		}

		return order;
	};
})(window.Graph = window.Graph || {});