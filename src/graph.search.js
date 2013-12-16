(function(Graph, undefined){
	// using t.graph.js
	// using t.queue.js

	// labelAt (v, 'v' | 'm') for diff meaning, v: visited, m: marked
	// or we can use -1 for initial label of vertex, then after, label 0 as marked, label t>0 as visited by some order

	Graph.bfs = function(graph){
		var g = graph.clone();
		var result = search(g, new T.Queue(), 1);
		g = null;

		return result;
	};

	Graph.dfs = function(graph){
		var g = graph.clone();
		var result = search(g, new T.Stack(), 1);
		g = null;

		return result;
	};

	Graph.undirectedConnected = function(graph){
		if (graph.__directed__){
			throw new Error(T.ERROR.INVALID_GRAPH_ACTION);
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
			throw new Error(T.ERROR.INVALID_GRAPH_ACTION);
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
			.quickSort(connect, function(x, y){return y-x;}, true)
			.slice(0, 10);
	};

	Graph.sccTarjan = function(graph){
		var g = graph.clone(),
			n = [0],
			connect = [],
			low = [],
			component = new T.Stack();

		Math.range(1, g.n+1).forEach(function(v){
			// label
			// 0 as init, -1 as being SCC, else as dfs(v)
			g.__labelAt__(v, 0);
		});

		Math.range(1, g.n+1).forEach(function(i){
			if (g.__labelAt__(i) == -1) {
				return;
			}

			// tarjan(g, i, n);

			// pseudo code for tarjan(g, i, index) below, iteration version
			// inspired by https://www.byvoid.com/blog/scc-tarjan

			var index = n,
				frontier = new T.Stack(),		// frontier for keep order
				head = new T.Stack(),			// head stack for push vertex before pusing (walking) its edges
				current,
				label;

			frontier.push(i);
			// g.__labelAt__(i, 'm');
			head.push(-1);

			while (!frontier.isEmpty()){
				current = frontier.peek();
                // if current has been in a SCC (-1) or in a component (>0) or , we pop it and continue
                if (g.__labelAt__(current) === -1 || low[current] === -1) {
                    frontier.pop();
                    continue;
                }
                
				if (current === head.peek()){
					// that means we are on the top of dfs(v), we visit current from its parent
					frontier.pop();
					head.pop();
					// assert this ?
					if (component.isEmpty()) {
						// console.warn('component.isEmpty while head.isNotEmpty');
					} else if (current !== component.peek()) {
						// console.warn(current, 'head.peek !== component.peek', component.peek());
					}

					// dfn or visited info
					label = g.__labelAt__(current);

					if (low[current] === label) {
						var c = [],		// temporary connect which will be a connect component
							h;			// each value in THIS component
						
						while (
							// we reach the 1st item of head (outmost of recursion) OR
							(head.peek() === -1 && !component.isEmpty()) ||
							// we repeat until leading of connect equals component vettex again
							// i.e. repeat until u = v
							(!component.isEmpty() && (h = component.peek(), h !== current))
						) {
							h = component.pop();
							c.push(h);
							g.__labelAt__(h, -1);
						}
                        
                        if (!component.isEmpty() && (h = component.peek(), h === current)) {
                            // push the leading of component
                            h = component.pop();
                            c.push(h);
                            g.__labelAt__(h, -1);
                        }
						
						connect.push([current, c]);
					}
					else {
						// pay attention on h has poped before
						low[head.peek()] = Math.min(low[head.peek()], low[current]);
						// g.__labelAt__(current, -1);
						// Attention! if current is poped from f and h, that means all of 
						// its children have been poped too.
						low[current] = -1;
					}

					continue;
				}

				head.push(current);
				// components will be poped from stack like head until dfn = low
				component.push(current);
				low[current] = ++index[0];
                if (low[current] > g.n) {
                    debugger;
                }
				g.__labelAt__(current, low[current]);

				if (g.__hasEdgesAt__(current)) {
					g.__edgesFrom__(current).forEach(function(v){
						label = g.__labelAt__(v);
						if (label > -1) {
							// not visited yet
							if (label > 0) {
								// marked
								low[current] = Math.min(low[current], label);
							} else {
								// not marked
								frontier.push(v);
							}
						}
					});
				} // end if
			} // end while
		});

		g = null;

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
			label = graph.__labelAt__(current);
			if (label !== 'h' && label !== 'm' && typeof label === 'string') {
				// current has been marked order OR has been in head (avoid cycle)
				frontier.pop();
				continue;
			}
			
			if (current === head.peek()){
				// that means we are on the top of dfs(v), we visit current from its parent

				// lable as topological order
				graph.__labelAt__(current, String(n[0]--));
				frontier.pop();
				head.pop();

				continue;
			}

			head.push(current);
			graph.__labelAt__(current, 'h');

			if (graph.__hasEdgesAt__(current)) {
				graph.__edgesFrom__(current).forEach(function(v){
					label = graph.__labelAt__(v);
					if (label === 'm' || typeof label !== 'string') {
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