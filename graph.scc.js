// *
/*
*  programming proble solution for algo week 4
*  notice:
*  for the conviniance, we try to use the array from the index 1 instead of 0
*  we use the adj list like this:
*  [
*   undifined,
*   [label, [3, 7, 9, 10]], # the edge from the vertex_1 (index_1) 
*   [label, [4, 6, 10]], 
*   ...
*   # the label of vetex will be initialize as index
*   # if we set the label is false, the vertex can not be visited
*  ]
*/
// *

var Global={
	MIN_VERTEX_INDEX : 1,
	MAX_VERTEX_INDEX : 9 /*875714*/
};

var requestText = '';

function fileHandler(files){
	/// <summary>handles the file from the input.</summary>
	
	// debugger;
	// console.log(files);
	var reader = new FileReader();
	reader.onloadend=function(e) {requestText = e.target.result; evaluator(e.target.result);}	
	reader.readAsText(files[0]);
}

function evaluator(input){
	
	// debugger;

	var txt = input;
	var lines = txt.split(' ');
	// console.log(lines);
	// graph and rev-G
	var graph = new Array();
	var revGraph = new Array();

	// get the number of edges
	var len = lines.length - 1;
	var EDGES_COUNT = len >> 1;
	console.log('EDGES_COUNT', EDGES_COUNT);

	// i have known the number of the edges
	for (var i=0;i<len;i+=2){
		// process each line
		var v0 = lines[i]
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			.split(' ');
		var v1 = 	lines[i+1]
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			.split(' ');
		
		// bulid the graph and the rev-G
		pushEdge(graph, v0, v1);
		pushEdge(revGraph, v1, v0);
	}

	console.log(graph.length, revGraph.length);
	// lets scc
	// console.log(graph[0], graph[1]);
	var size = kosaraju(graph, revGraph)
	console.log(size);
}

function remoteGraph(url){
	/// <summary>reads graph form remote url.</summary>

	// using the properties of array in js, 
	// we can build the graph and the rev-G in O(m) where m is the number of edges

	var ctx = new XMLHttpRequest();
	ctx.open('GET', url, true);
	ctx.onreadystatechange = function (){
		if (ctx.readyState===4 && ctx.status ===200){
			console.log('reading...');
			requestText = ctx.responseText;
			
			var txt = ctx.responseText;
			var lines = txt.split('\r');
			// console.log(lines);
			// graph and rev-G
			var graph = new Array();
			var revGraph = new Array();

			// get the number of edges
			var EDGES_COUNT = lines.length;
			console.log('EDGES_COUNT', EDGES_COUNT);

			// i have known the number of the edges
			for (var i=0;i<EDGES_COUNT;i++){
				// process each line
				var vertex = lines[i]
					.replace(/^\s\s*/, '')
					.replace(/\s\s*$/, '')
					.split(' ');
				
				// bulid the graph and the rev-G
				pushEdge(graph, vertex[0], vertex[1]);
				pushEdge(revGraph, vertex[1], vertex[0]);
			}

			// console.log(graph, revGraph);
			// lets scc
			// console.log(graph[0], graph[1]);
			var size = kosaraju(graph, revGraph)
			console.log(size);
		}
	};

	ctx.send(null);
	console.log('ctx.send');
}

function pushEdge(graph, v1, v2){
	/// <summary>pushes an edge into the graph from the v1 to v2.</summary>

	// if we push v2 into an empty vertex 
	// [v, []] = [label, edgeVertexArray]
	if (!graph[v1]){graph[v1] = [v1, []]}

	graph[v1][1].push(v2);
}

function getEdge(graph, v){
	/// <summary>gets the edges from v of the graph.</summary>

	return graph[v][1];
}

function visiable(graph, v){
	/// <summary>determins whether the v of graph is visiable for visiting or not.</summary>
	return graph && graph[v] && graph[v][0];
}

function labelVertex(graph, v, label){
	/// <summary>marks the label to graph, v for its visited or not, 
	/// the default label is false, means we visits the vertex default.
	/// </summary>
	
	if (!graph[v]) {graph[v]=[v, []];}
	
	graph[v][0]=label;
}

function visitVertex(graph, v){

	labelVertex(graph, v, false);
}

/*
function depthFirstSearchLoop(graph, arr){

	for (var i=Global.MIN_VERTEX_INDEX;i<=Global.MAX_VERTEX_INDEX;i++){
		var vertex = !arr?i:arr[i];
		if (visiable(graph, vertex)){
			s = vertex;
			depthFirstSearch(graph, vertex, !arr);
		}
	}
}
*/


function depthFirstSearchLeader(graph, v, leaderCount){

	// how many vertex we'll visit from the initial v inclusive.
	var size = 0;
	
	var frontier = new Array();
	frontier.push(v);
	while (frontier.length > 0){
		var current = frontier.pop();
		var arc = getEdge(graph, current);
		for (var i=0;i<arc.length;i++){
			if (visiable(graph, arc[i])){
				// push the chidren into frontier
				frontier.push(arc[i]);
			}
		}
		
		// increases the size of component
		if (visiable(graph, current)){
			visitVertex(graph, current);
			size++;
		}
	}
	
	leaderCount[v] = size;
}

function depthFirstSearchFt(graph, v, vertexOrder){
	
	var frontier = new Array();
	
	frontier.push(v);
	while (frontier.length > 0){
		var current = frontier.pop();
		var arc = getEdge(graph, current);
		for (var i=0;i<arc.length;i++){
			if (visiable(graph, arc[i])){
				// push the chidren into frontier
				frontier.push(arc[i]);
			}
		}
		
		// increases the size of component
		if (visiable(graph, current)){
			visitVertex(graph, current);
			vertexOrder.push(current);
		}
	}
	
	/*
	visitVertex(graph, v);
	var arc = getEdge(graph, v);
	for (var i=0;i<arc.length;i++){
		if (visiable(graph, arc[i])){
			depthFirstSearchFt(graph, arc[i], ft, vertexOrder);
		}
	}

	// t++
	vertexOrder.push(v);


	
	t++;
	j=0;
	while (t<=ft[j]){j++;}
	vertexOrder.splice(j, 0, v);
	ft[v] = t;
	*/

	// t++;
	// f(v) = t;
	/*
	f=[Infinity, 4, 5, 3, 7, 2]
	arr=[Infinity]
	for (var i=1;i<=5;i++){
	   j=0;
	   while(f[i]<=f[j]){j++;}
	   // console.log(j)
	   arr.splice(j,0, i);
	}	
	*/
}

function kosaraju(graph, revGraph){

	// magical finishing time
	console.log('magical finishing time');
	var order = [0];

	for (var i=Global.MAX_VERTEX_INDEX;i>=Global.MIN_VERTEX_INDEX;i--){
		var vertex = i;
		if (visiable(revGraph, vertex)){
			depthFirstSearchFt(revGraph, vertex, order);
		}
	}

	// 2nd loop
	console.log('2nd loop')
	var leader = {};
	for (var i=Global.MAX_VERTEX_INDEX;i>=Global.MIN_VERTEX_INDEX;i--){
		var vertex = order[i];
		if (visiable(graph, vertex)){
			depthFirstSearchLeader(graph, vertex, leader);
		}
	}

	// return leader;
	console.log('leader:', leader);
	return getTopLeaderSize(leader, 5);
}

function getTopLeaderSize(leaderCount, k){

	var top = [Infinity];
	for (var x in leaderCount){
		var size = leaderCount[x];
		var j=0;
		while (size<=top[j]){j++;}
		top.splice(j, 0, size);
	}

	return top.slice(1, 1+k);
}

var edge = [
	[1,7],
	[4,1],
	[7,4],
	[7,9],
	[3,9],
	[9,6],
	[6,3],
	[6,8],
	[8,2],
	[5,8],
	[2,5],
];

var gx=new Array();
var gxRev=new Array();

function bulidGraph(edges, graph, revGraph) {
	
	for (i=0;i<edges.length;i++){
		pushEdge(graph, edges[i][1], edges[i][0]);
		pushEdge(revGraph, edges[i][0], edges[i][1]);
	}
}

