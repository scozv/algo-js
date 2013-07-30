(function(Graph, undefined){
	// using t.graph.js
	// using t.queue.js

	Graph.bfs = function(graph){
		return search(graph, new T.Queue());
	};

	Graph.dfs = function(graph){
		return search(graph, new T.Stack());
	};

	var search = function(graph, frontier){
		graph = graph.clone();

		var order		= [],
			frontierIn	= function(item) {
				return (frontier.push && frontier.push(item)) ||
					(frontier.enqueue && frontier.enqueue(item));
			},
			frontierOut	= function() {
				return (frontier.pop && frontier.pop()) || 
					(frontier.dequeue && frontier.dequeue());
			},
			current;

		frontierIn(1);
		while (!frontier.isEmpty()){
			current = frontierOut();
			
			// push all valid v sourcing from current into queue
			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					if (graph.__visiableAt__(v)) {
						frontierIn(v);
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