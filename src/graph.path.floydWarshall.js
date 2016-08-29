(function (Graph, undefined) {
  (function (Path, undefined) {
    Path.floydWarshall = function () {
      ///<summary>gets the single source shortest path by bllemanFord algo.</summary>
      var count = Graph.count(); // [vertexCount, EdgeCount]

      // A, the array, i, j, k for loop
      // edges for the edges from v
      // min is global min path of v
      // len is the A[i-1,w] + C_wv
      // space is the shorstest length of u to v where u <> v
      var A = [[]], i, j, k, edges, min, len, space;
      for (i = 1; i <= count[0]; i++) {
        A[i] = A[i] || [];
        for (j = 1; j < count[0]; j++) {
          A[i][j] = (i == j) ? 0 : Number.MAX_VALUE;
        }
      }
      edges = Graph.__edgeList__;
      for (k = 0; k < edges.length; k++) {
        len = edges[k];
        A[len[0]][len[1]] = len[2];
      }

      // lop in o n ^ 3
      space = Number.MAX_VALUE;
      for (k = 1; k <= count[0]; k++) {
        for (i = 1; i <= count[0]; i++) {
          A[i] = A[i] || [];
          for (j = 1; j < count[0]; j++) {
            len = A[i][k] + A[k][j];
            if (len < A[i][j]) {
              A[i][j] = len;
            }
            if (i != j && A[i][j] < space) {
              space = A[i][j];
            }
          }
        }
      }

      var result = space;

      // check negative cycle exsits or not
      var neg = false;
      for (i = 1; i <= count[0]; i++) {
        if (A[i][i] < 0) {
          neg = true;
          break;
        }
      }

      return neg ? 'negative cycle exsits' : space;
    };
  }(Graph.Path = Graph.Path || {}));
}(window.Graph = window.Graph || {}));