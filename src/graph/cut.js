import math from '../math'


export const multiMinimumCut = function (graph, times) {
  /// <summary>gets the minimum number of potential minimum cut in multiple try.<summary>

  var min = Number.MAX_VALUE,
    gh,
    cut,
    time = [];

  math.range(times).forEach(function () {
    gh = graph.clone();
    time.push(math.__timer__(function () {
      cut = minimumCut(gh);
    }));
    if (cut < min) {
      min = cut;
    }
  });
  console.log(math.Stats.mean(time), math.Stats.stddev(time));
  console.log(time.join(', '));
  return min;
};

export const minimumCut = function (graph) {
  /// <summary>gets the number of potential minimum cut in single try.<summary>

  var count = graph.__count__(),
    v = count[0],
    e = count[1],
    k = 0,
    edge;
  while (v > 2) {
    k = math.randomInteger(1, e);
    // find the k-th edge
    edge = graph.__edgeAt__(k);
    // merge
    mergeVertex(graph, edge[0], edge[1]);
    // recount
    count = graph.__count__();
    v = count[0];
    e = count[1];
  }

  // return number of edges of min cut
  return graph.__count__()[1];
};

export const mergeVertex = function (graph, v1, v2) {
  /// <summary>merges the vertex and contracts the edge.<summary>

  // merge the edge from v1 to v2, e1 is the edges from v1 to v2 (no matter in undirected graph)
  // 1. copy the endpoints from v1's to v2's
  // 2. loop all vertex of graph, change endpoint v1 to v2
  // 3.      if self loop, delete endpoint
  // 4. mark v1 visited

  var _g = graph.__adjacencyList__,
    e1 = graph.__edgesFrom__(v1),
    e2 = graph.__edgesFrom__(v2),
    i;

  // 1
  e1.forEach(function (v) {
    if (v >= 0 /*&& e2.indexOf(v) === -1*/) {
      e2.push(v);
    }
  });

  // 2
  _g.forEach(function (x) {
    if (x && x[0]) {
      // edges from x[0]
      for (i = 0; i < x[1].length; i++) {
        if (x[1][i] === v1) {
          x[1][i] = v2;
        }
        // 3 self loop
        if (x[1][i] > 0 && x[1][i] === x[0]) {
          x[1][i] = -1;
          graph.__e__--;
        }
      }
    }
  });

  // 4
  // DO NOT decrease __e__, for _g[v1][1] has been moved into _g[v2][1] at step 1
  _g[v1][0] = -1;
  graph.__v__--;
};