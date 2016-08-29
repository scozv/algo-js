(function (Graph, undefined) {
  Graph.mstKruskal = function () {
    // gets edge list sorted
    var edges = Sorting.quickSort(Graph.__edgeList__, function (x) {
      return x[2];
    });
    var T = [];

    var count = Graph.__countGraph__(); // [vertexCount, EdgeCount]
    var i, totalCost, u, v;

    UnionFind.build(count[0]);

    totalCost = 0;
    for (i = 0; i < edges.length; i++) {
      u = parseInt(edges[i][0]) - 1;
      v = parseInt(edges[i][1]) - 1;
      if (!UnionFind.connected(u, v)) {
        T.push(edges[i]);
        totalCost += edges[i][2];
        UnionFind.union(u, v);
      }
    }

    return totalCost;
  };

  Graph.kClustering = function (k) {
    // gets edge list sorted
    var edges = Sorting.quickSort(Graph.__edgeList__, function (x) {
      return x[2];
    });
    var T = [];

    var count = Graph.__countGraph__(); // [vertexCount, EdgeCount]
    var i, totalCost, space, u, v;

    UnionFind.build(count[0]);

    totalCost = 0;
    space = -1;
    for (i = 0; (!k || UnionFind.count() > k) && i < edges.length; i++) {
      u = parseInt(edges[i][0]) - 1;
      v = parseInt(edges[i][1]) - 1;
      if (!UnionFind.connected(u, v)) {
        T.push(edges[i]);
        totalCost += edges[i][2];
        UnionFind.union(u, v);
      }
    }

    // find the next unconnected edge for the space number
    for (; i < edges.length; i++) {
      u = parseInt(edges[i][0]) - 1;
      v = parseInt(edges[i][1]) - 1;
      if (!UnionFind.connected(u, v)) {
        space = edges[i][2];
        break;
      }
    }

    return [totalCost, space];
  };
}(window.Graph = window.Graph || {}));