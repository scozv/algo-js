(function (Graph, undefined) {
  (function (Path, undefined) {
    Path.bellmanFord = function (source) {
      ///<summary>gets the single source shortest path by bllemanFord algo.</summary>
      var count = Graph.count(); // [vertexCount, EdgeCount]
      source = source || 1;

      // A, the array, i, j, k for loop
      // edges for the edges from v
      // min is global min path of v
      // len is the A[i-1,w] + C_wv
      var A = [], i, j, k, edges, min, len;
      for (j = 1; j <= count[0]; j++) {
        A[0] = A[0] || [];
        A[0][j] = (j == source) ? 0 : Number.MAX_VALUE;
      }

      for (i = 1; i <= count[0]; i++) {
        A[i] = A[i] || [];
        for (j = 1; j <= count[0]; j++) {
          // gets (w, j) \in E with structure [[w1, c1], [w2, c2]]
          edges = Graph.__getEdge__(j, true);
          min = A[i - 1][j];
          for (k = 0; k < edges.length; k++) {
            len = A[i - 1][edges[k][0]] + edges[k][1];
            if (len < min) {
              min = len;
            }
          }
          A[i][j] = min;
        }
      }

      var result = A[count[0] - 1];

      // check negative cycle exsits or not
      var neg = false;
      for (j = 1; j <= count[0]; j++) {
        if (A[count[0] - 1][j] != A[count[0]][j]) {
          neg = true;
          break;
        }
      }

      return neg ? 'negative cycle exsits' : A[count[0] - 1];
    };
  }(Graph.Path = Graph.Path || {}));
}(window.Graph = window.Graph || {}));