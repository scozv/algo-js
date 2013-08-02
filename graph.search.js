(function(Graph, undefined){
	// using t.graph.js
	// using t.queue.js

	// TODO: labelAt (v, 'v' | 'm') for diff meaning, v: visited, m: marked
	// or we can use -1 for initial label of vertex, then after, label 0 as marked, label t>0 as visited by some order

	Graph.bfs = function(graph){
		var g = graph.clone();
		return search(g, new T.Queue(), 1);
		g = null;
	};

	Graph.dfs = function(graph){
		var g = graph.clone();
		return search(g, new T.Stack(), 1);
		g = null;
	};

	Graph.undirectedConnected = function(graph){
		if (graph.__directed__){
			throw new Error('cannot apply undirected connectivity validation on a directed graph');
		}

		var g = graph.clone();

		var connect = [],	// [x] where x = [head, [following vertex]]
			label;

		Math.range(1, g.n+1).forEach(function(v){
			label = g.__labelAt__(v);
			if (label !== 'v'){
				connect.push([v, search(g, new T.Stack(), v)]);
			}
		});

		g = null;

		// undirected graph is connected iff connect.length == 1 && connnect[0][1] == Graph.dfs(graph)
		return connect;
	};

	Graph.topologicalSort = function(graph){
		if (!graph.__directed__){
			throw new Error('cannot apply topological sorting on a undirected graph');
		}		

		var g = graph.clone(),
			result, 
			i = 0,
			n = [g.n]; 

		Math.range(1, g.n+1).forEach(function(v){
			if (typeof g.__labelAt__(v) !== 'string'){
				// unvisited or unmarked
				i++;
				tsearch(g, v, n);
			}
		});

		// TODO: inspect i to find graph info after topo sort, is there non connection, is there cycle?
		console.log(i);

		result = g.__adjacencyList__
			.map(function(x, i){ return [i, (+x[0])]; })
			.filter(function(x, i){return i > 0 && x;});

		g = null;

		result = Sorting
			.quickSort(result, function(x, y){return x[1]-y[1];})
			.map(function(x){return x[0];});

		return result;
	};

	Graph.sccKosaraju = function(graph){
		var label,					// label of vertex
			rg = reverse(graph),	// reversed graph
			g = graph.clone(),		// clone one
			connect = [];			// connectivity array

		Graph.topologicalSort(rg).forEach(function(v){
			label = g.__labelAt__(v);
			if (typeof label !== 'string'){
				connect.push([v, search(g, new T.Stack(), v)]);
			}			
		});

		rg = null;
		g = null;

		// [component number, max component size]
		// return [connect.length, Math.Stats.max(connect.map(function(x){return x[1].length}))];
		connect = connect.map(function(x){return x[1].length;});
		console.log(Math.Stats.sum(connect));
		return Sorting
			.quickSort(connect, function(x, y){return y-x;})
			.slice(0, 10);
	};

	var tsearch = function(graph, i, n){
		
		var frontier = new T.Stack(),		// frontier for keep order
			head = new T.Stack(),			// head stack for push vertex before pusing (walking) its edges
			current,
			label;
			// n = graph.n;					// as topological order

		frontier.push(i);
		graph.__labelAt__(i, 'm');
		head.push(-1);

		while (!frontier.isEmpty()){

			current = frontier.peek();
			if (current === head.peek()){
				// that means we are on the top of dfs(v), we visit current from its parent

				// lable as topological order
				graph.__labelAt__(current, String(n[0]--));
				frontier.pop();
				head.pop();

				continue;
			}

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

		} // end while
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
		graph.__labelAt__(i, 'm');
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

	var reverse = function(graph){
		// get a new graph from graph, with each u->v into v->u

		if (graph.__directed__){
			var rg = new T.Graph(graph.n, true);
			Math.range(1, graph.n+1).forEach(function(u){
				if (graph.__hasEdgesAt__(u)){
					graph.__edgesFrom__(u).forEach(function(v){
						rg.__pushEdge__(v, u);
					});
				}
			});

			return rg;
		} else {
			// reverse undirected graph is itself
			return graph.clone();
		}
	};
})(window.Graph = window.Graph || {});