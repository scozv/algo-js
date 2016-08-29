(function (Graph, undefined) {
  Graph.dijkstra = function (graph, s) {
    s = s || 1;

    // assert is weighted, s in [1. n]

    // in our heap (frontier), each x, y is formated like [v, w], 
    // means, for now on, shortest path from s to v is w
    var frontier = new T.MinHeap(function (x, y) {
        return x[1] - y[1];
      }),
      g = graph.clone(),
      i = 0,
      current;

    // label each vertex
    // -1 for init
    // [0, ...] for FINAL shortest length from init s
    g.__labelAll__(-1);

    // init for s
    frontier.push([s, 0]);

    while (!frontier.isEmpty() && i < g.n) {
      current = frontier.pop();
      g.__labelAt__(current[0], current[1]);
      i++;

      g.__edgesFrom__(current[0]).forEach(function (v) {
        if (g.__labelAt__(v[0]) === -1) {
          // not visited, update each in frontier
          var updated = frontier.update(
            function (x) {
              return x[0] === v[0];
            },
            function (x) {
              return current[1] + v[1] < x[1];
            },
            function (x) {
              x[1] = current[1] + v[1];
            });

          if (!updated) {
            frontier.push([v[0], current[1] + v[1]]);
          }
        } // end if, unvisited
      });
    }


    return g.__adjacencyList__
      .map(function (v, i) {
        return [i, v[0]];
      })
      .filter(function (v) {
        return v && v.length;
      });
  };

  Graph.tspHeldKarp = function (coordinates) {
    // run TSP algorithm by Held-Karp
    // vertex i in input corrdinates array is [x,y]

    var n = coordinates.length,
      cost = [],
      i, j;

    function distance(a, b) {
      return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
    }

    // build cost matrix c(i,j) for each (i, j) and i < j
    for (i = 0; i < n; i++) {
      for (j = i + 1; j < n; j++) {
        cost[i * n + j] = distance(coordinates[i], coordinates[j]);
      }
    }

  };
})(window.Graph = window.Graph || {});
