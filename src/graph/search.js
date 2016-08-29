import Stack from '../type/Stack'
import Queue from '../type/Queue'
import Graph from '../type/Graph'
import ERROR from '../type/ERROR'
import math from '../math'
import quickSort from '../sorting/quickSort'

// labelAt for diff meaning
// topo: -1 for init, 0 for head, >0 for order
// search: -1 for init, 0 for being in frotiner, 1 for being visited
// tarjan scc: -1 as init, 0 as being SCC, else as dfs(v)

export const bfs = function (graph) {
  var g = graph.clone();
  g.__labelAll__(-1);
  var result = search(g, new Queue(), 1);
  g = null;

  return result;
};

export const dfs = function (graph) {
  var g = graph.clone();
  g.__labelAll__(-1);
  var result = search(g, new Stack(), 1);
  g = null;

  return result;
};

export const undirectedConnected = function (graph) {
  if (graph.__directed__) {
    throw new Error(ERROR.INVALID_GRAPH_ACTION);
  }

  var g = graph.clone(),
    connect = [],	// [x] where x = [head, [following vertex]]
    label;

  g.__labelAll__(-1);

  math.range(1, g.n + 1).forEach(function (v) {
    label = g.__labelAt__(v);
    if (label < 1 /*label !== 'v'*/) {
      connect.push([v, search(g, new Stack(), v)]);
    }
  });

  g = null;

  // undirected graph is connected iff connect.length == 1 && connnect[0][1] == graph.dfs(graph)
  return connect;
};

export const topologicalSort = function (graph) {
  if (!graph.__directed__) {
    throw new Error(ERROR.INVALID_GRAPH_ACTION);
  }

  var g = graph.clone(),
    result,
    i = 0,
    n = [g.n];

  g.__labelAll__(-1);

  math.range(1, g.n + 1).forEach(function (v) {
    if (g.__labelAt__(v) <= 0) {
      // unvisited or unmarked
      i++;
      tsearch(g, v, n);
    }
  });

  // TODO: inspect i to find graph info after topo sort, is there non connection, is there cycle?
  console.log(i);

  result = g.__adjacencyList__
    .map(function (x, i) {
      return [i, (+x[0])];
    })
    .filter(function (x, i) {
      return i > 0 && x;
    });

  g = null;

  result = quickSort(result, function (x, y) {
      return x[1] - y[1];
    })
    .map(function (x) {
      return x[0];
    });

  return result;
};

export const sccKosaraju = function (graph) {
  var label,					// label of vertex
    rg = reverse(graph),	// reversed graph
    g = graph.clone(),		// clone one
    connect = [];			// connectivity array

  g.__labelAll__(-1);

  topologicalSort(rg).forEach(function (v) {
    label = g.__labelAt__(v);
    if (label < 1 /*typeof label !== 'string'*/) {
      connect.push([v, search(g, new Stack(), v)]);
    }
  });

  rg = null;
  g = null;

  return buildConnect(connect);
};

export const sccTarjan = function (graph) {
  var g = graph.clone(),
    n = [0],
    connect = [],
    low = [],
    component = new Stack();

  g.__labelAll__(-1);

  math.range(1, g.n + 1).forEach(function (i) {
    if (g.__labelAt__(i) === 0) {
      // has been marked SCC
      return;
    }

    // tarjan(g, i, n);

    // pseudo code for tarjan(g, i, index) below, iteration version
    // inspired by https://www.byvoid.com/blog/scc-tarjan

    var index = n,
      frontier = new Stack(),		// frontier for keep order
      head = new Stack(),			// head stack for push vertex before pusing (walking) its edges
      current,
      label;

    frontier.push(i);
    // g.__labelAt__(i, 'm');
    head.push(-1);

    while (!frontier.isEmpty) {
      current = frontier.peek();
      // if current has been in a SCC (0) or in a component (>0) or , we pop it and continue
      if (g.__labelAt__(current) === 0 || low[current] === -1) {
        frontier.pop();
        continue;
      }

      if (current === head.peek()) {
        // that means we are on the top of dfs(v), we visit current from its parent
        frontier.pop();
        head.pop();
        // assert this ?
        if (component.isEmpty) {
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
          (head.peek() === -1 && !component.isEmpty) ||
          // we repeat until leading of connect equals component vettex again
          // i.e. repeat until u = v
          (!component.isEmpty && (h = component.peek(), h !== current))
            ) {
            h = component.pop();
            c.push(h);
            g.__labelAt__(h, 0);
          }

          if (!component.isEmpty && (h = component.peek(), h === current)) {
            // push the leading of component
            h = component.pop();
            c.push(h);
            g.__labelAt__(h, 0);
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
        g.__edgesFrom__(current).forEach(function (v) {
          label = g.__labelAt__(v);
          if (label !== 0) {
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

  return buildConnect(connect);
};

const tsearch = function(graph, i, n) {

  var frontier = new Stack(),		// frontier for keep order
    head = new Stack(),			// head stack for push vertex before pusing (walking) its edges
    current,
    label;
  // n = graph.n;					// as topological order

  frontier.push(i);
  // graph.__labelAt__(i, 'm');
  head.push(-1);

  while (!frontier.isEmpty) {

    current = frontier.peek();
    label = graph.__labelAt__(current);
    if (label > 0 /*label !== 'h' && label !== 'm' && typeof label === 'string'*/) {
      // current has been marked order OR has been in head (avoid cycle)
      frontier.pop();
      continue;
    }

    if (current === head.peek()) {
      // that means we are on the top of dfs(v), we visit current from its parent

      // lable as topological order
      graph.__labelAt__(current, n[0]--);
      frontier.pop();
      head.pop();

      continue;
    }

    head.push(current);
    graph.__labelAt__(current, 0);

    if (graph.__hasEdgesAt__(current)) {
      graph.__edgesFrom__(current).forEach(function (v) {
        label = graph.__labelAt__(v);
        if (label === -1 /*label === 'm' || typeof label !== 'string'*/) {
          frontier.push(v);
          // v has been add into frontier
          // graph.__labelAt__(v, 'm');
        }
      });
    } // end if

  } // end while
};

const search = function (graph, frontier, i) {
  // seach graph from initial vertex v, using that frontier

  i = i || (i = +i) || 1;

  var order = [],
    frontierIn = function (item) {
      return (frontier.push && frontier.push(item)) ||
        (frontier.enqueue && frontier.enqueue(item));
    },
    frontierOut = function () {
      return (frontier.pop && frontier.pop()) ||
        (frontier.dequeue && frontier.dequeue());
    },
    current,
    label;

  frontierIn(i);
  graph.__labelAt__(i, 0);
  while (!frontier.isEmpty) {
    current = frontierOut();

    // push all valid v sourcing from current into frontier
    if (graph.__hasEdgesAt__(current)) {
      graph.__edgesFrom__(current).forEach(function (v) {
        label = graph.__labelAt__(v);
        if (label < 0 /*label !== 'm' && !== 'v'*/) {
          frontierIn(v);
          // v has been add into frontier
          graph.__labelAt__(v, 0);
        }
      });
    }
    // visit current
    graph.__labelAt__(current, 1);
    order.push(current);
  }

  return order;
};

const reverse = function (graph) {
  // get a new graph from graph, with each u->v into v->u

  if (graph.__directed__) {
    var rg = new Graph(graph.n, true);
    math.range(1, graph.n + 1).forEach(function (u) {
      if (graph.__hasEdgesAt__(u)) {
        graph.__edgesFrom__(u).forEach(function (v) {
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

const buildConnect = function (connect) {
  // return [
  //   length of component,
  //   [top 100 componet size],
  //   [top 100 distinct component size]
  // ]

  connect = connect.map(function (x) {
    return x[1].length;
  });

  var desc = function (x, y) {
      return y - x;
    },
    sortedSize = quickSort(connect, desc, true),
    pre = -1;

  return [
    connect.length,
    sortedSize.slice(0, 100),
    sortedSize.filter(function (x) {
      var same = (x === pre);
      pre = x;
      return !same;
    }).slice(0, 100)];
};