(function(Graph, undefined){
	// using t.graph.js
	// using t.queue.js

	// TODO: labelAt (v, 'v' | 'm') for diff meaning, v: visited, m: marked
	// or we can use -1 for initial label of vertex, then after, label 0 as marked, label t>0 as visited by some order

	Graph.bfs = function(graph){
		return search(graph.clone(), new T.Queue(), 1);
	};

	Graph.dfs = function(graph){
		return search(graph.clone(), new T.Stack(), 1);
	};

	Graph.undirectedConnected = function(graph){
		if (graph.__directed__){
			throw new Error('cannot apply undirected connectivity validation on a directed graph');
		}

		graph = graph.clone();

		var connect = [],	// [x] where x = [head, [following vertex]]
			label;

		Math.range(1, graph.v()+1).forEach(function(v){
			label = graph.__labelAt__(v);
			if (label !== 'v'){
				connect.push([v, search(graph, new T.Stack(), v)]);
			}
		});

		// undirected graph is connected iff connect.length == 1 && connnect[0][1] == Graph.dfs(graph)
		return connect;
	};

	var search = function(graph, frontier, i){
		// seach graph from initial vertex v, using that frontier

		i = i || (i = +i) || 1; 

		var order		= [],
			frontierIn	= function(item) {
				return (frontier.push && frontier.push(item)) ||
					(frontier.enqueue && frontier.enqueue(item));
			},
			frontierOut	= function() {
				return (frontier.pop && frontier.pop()) || 
					(frontier.dequeue && frontier.dequeue());
			},
			current,
			label;

		frontierIn(i);
		while (!frontier.isEmpty()){
			current = frontierOut();
			
			// push all valid v sourcing from current into frontier
			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					label = graph.__labelAt__(v);
					if (label !== 'm' && label !== 'v') {
						frontierIn(v);
						// v has been add into frontier						
						graph.__labelAt__(v, 'm');
					}
				});
			}
			// visit current
			graph.__labelAt__(current, 'v');
			order.push(current);
		}

		return order;
	};

	Graph.topologicalOrder = function(graph){
		graph = graph.clone();
		
		var i = 1,							// initial vertex for dfs
			frontier = new T.Stack(),		// frontier for keep order
			head = new T.Stack,				// head stack for push vertex before pusing (walking) its edges
			current,
			label,
			n = graph.v();					// as topological order

		frontier.push(i);
		while (!frontier.isEmpty()){
			current = frontier.peek();
			head.push(current);

			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					label = graph.__labelAt__(v);
					if (typeof label !== 'string') {
						frontier.push(v);
						// v has been add into frontier						
						graph.__labelAt__(v, 'm');
					}
				});
			} // end if

			if (current !== head.peek()){
				// that means we are not on the top of dfs(v), we visit current from its parent
			} else {
				// lable as topological order
				graph.__labelAt__(current, String(n--));
				frontier.pop();
				head.pop();
			}
		} // end while

		var result = graph.__adjacencyList__.map(function(x, i){
			return [i, x[0]];
		});

		return Sorting
			.quickSort(result, function(x, y){return x[1]-y[1];})
			.map(function(x){return x[0];});
	};
})(window.Graph = window.Graph || {});