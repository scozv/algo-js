require('./q');

var algo = require('../bundle').default;
var T = algo.type;
var Sorting = algo.sorting;
var Graph = T.Graph;
var graph = algo.graph;
var should = require('should');

test('graph constructor and properties, Part I', function () {
  throws(function () {
    new T.Graph();
  }, 'error should be thrown when build graph without indicating n');
  throws(function () {
    new T.GraphW();
  }, 'error should be thrown when build weighted graph without indicating n');

  var g1 = new T.Graph(10);
  g1.n = 13;
  strictEqual(g1.n, 10, 'Graph.n is readonly after been constructed');

  g1 = new T.Graph(10, 1);
  strictEqual(g1.__directed__, false, 'Graph.directed is false by default');

  var g2 = new T.Graph(10, true);
  strictEqual(g2.__directed__, true, 'Graph.directed is true iff we pass true');

  throws(function () {
    g1.__pushEdge__();
  }, 'the edge pushed into graph must be with two numeric endpoints');

  g1.__pushEdge__(1, 3);
  deepEqual(g1.__adjacencyList__[1], [1, [3]], 'a edge (u, v) has been pushed into a undirected graph');
  it('(v, u) will not be in graph when we push (u, v) into graph', function() {
    should(g1.__adjacencyList__[3]).undefined();
  });

  g1.__pushEdge__(2, 4, true);
  deepEqual(g1.__adjacencyList__[2], [2, [4]], 'a edge (u, v) has been pushed into a undirected graph');
  deepEqual(g1.__adjacencyList__[4], [4, [2]], 'a edge (v, u) has been pushed into a undirected graph too');
});

test('graph constructor and properties, Part II', function () {
  throws(function () {
    new T.Graph();
  }, 'error should be thrown when build graph without indicating n');
  throws(function () {
    new T.GraphW();
  }, 'error should be thrown when build weighted graph without indicating n');

  var g1 = new T.Graph(10);
  g1.n = 13;
  g1 = new T.Graph(10, 1);
  var g2 = new T.Graph(10, true);
  g1.__pushEdge__(1, 3);
  g1.__pushEdge__(2, 4, true);
  g1.__pushEdge__(2, 7);

  deepEqual(g1.__edgesFrom__(7), [], '__edgesFrom__(7)');
  deepEqual(g1.__edgesFrom__(1), [3], '__edgesFrom__(1)');
  deepEqual(g1.__edgesFrom__(2), [4, 7], '__edgesFrom__(2)');

  deepEqual(g1.__edgeAt__(0), [1, 3], '__edgeAt__(0)');
  deepEqual(g1.__edgeAt__(3), [4, 2], '__edgeAt__(3)');
  deepEqual(g1.__edgeAt__(4), [-1, -1], '__edgeAt__(4)');

  ok(g1.__hasEdgesAt__(1), '__hasEdgesAt__(1)');
  ok(g1.__hasEdgesAt__(2), '__hasEdgesAt__(2)');
  ok(!g1.__hasEdgesAt__(3), '__hasEdgesAt__(3)');

  var lst;
  ok((lst = g1.__getEdgeList__(), lst.length === 4) && lst[0].length === 2, 'get edge list of graph');

  g2 = new T.GraphW(10, true);
  g2.__pushEdge__(1, 3, 4);
  ok((lst = g2.__getEdgeList__(), lst.length === 1) && lst[0].length === 3, 'get edge list of weigthed graph');
});

test('graph exceptions', function () {
  var g1 = new T.Graph(10);
  throws(function () {
    g1.__pushEdge__();
  }, 'exception from __pushEdge__');
  throws(function () {
    g1.__edgesFrom__();
  }, 'exception from __edgesFrom__');
  throws(function () {
    g1.__edgesFrom__();
  }, 'exception from __edgesFrom__');
  throws(function () {
    g1.__visiableAt__();
  }, 'exception from __visiableAt__');
  throws(function () {
    g1.__hasEdgesAt__();
  }, 'exception from __hasEdgesAt__');
  throws(function () {
    g1.__labelAt__();
  }, 'exception from __labelAt__');
  throws(function () {
    g1.__visitAt__();
  }, 'exception from __visitAt__');
});

test('graph algorithm', function () {
  var g1 = new T.Graph(50, true);
  [[1, 8], [1, 35], [2, 15], [2, 46], [2, 22], [2, 23], [2, 23],
    [2, 50], [3, 20], [3, 26], [3, 34], [4, 5], [4, 18], [4, 28],
    [4, 37], [4, 43], [5, 18], [5, 18], [5, 28], [6, 44], [7, 14],
    [7, 14], [7, 29], [7, 29], [8, 42], [8, 45], [9, 20], [9, 49],
    [10, 10], [10, 12], [10, 31], [10, 47], [11, 1], [11, 8], [11, 29],
    [11, 29], [11, 29], [11, 30], [11, 30], [11, 35], [11, 42], [12, 22],
    [12, 31], [13, 10], [13, 12], [13, 22], [13, 22], [13, 27], [14, 23],
    [14, 24], [14, 48], [15, 9], [15, 22], [15, 49], [16, 9], [16, 35],
    [16, 50], [17, 10], [18, 21], [18, 25], [18, 39], [19, 7], [19, 29],
    [19, 33], [19, 43], [20, 16], [20, 41], [21, 4], [21, 36], [21, 39],
    [21, 47], [23, 7], [24, 12], [24, 22], [24, 23], [25, 5], [25, 6],
    [25, 39], [25, 44], [26, 3], [26, 35], [27, 10], [27, 13], [27, 17],
    [28, 6], [28, 25], [28, 33], [28, 32], [28, 43], [29, 23], [29, 30],
    [29, 40], [29, 45], [30, 23], [30, 50], [31, 24], [31, 38], [32, 19],
    [32, 33], [33, 6], [33, 7], [33, 14], [33, 38], [33, 48], [34, 3],
    [34, 9], [34, 20], [35, 3], [35, 20], [35, 41], [36, 10], [36, 38],
    [36, 47], [37, 21], [37, 43], [38, 6], [38, 10], [38, 36], [38, 48],
    [38, 48], [39, 36], [39, 38], [39, 39], [40, 19], [40, 43],
    [41, 16], [42, 29], [42, 45], [43, 32], [44, 38], [44, 39], [45, 40],
    [46, 9], [46, 15], [46, 15], [46, 16], [46, 50], [47, 17],
    [48, 24], [48, 31], [49, 13], [49, 22], [49, 34], [49, 34], [50, 35], [50, 23], [50, 50]]
    .forEach(function (e) {
      g1.__pushEdge__(e[0], e[1]);
    });

  deepEqual(
    algo.graph.bfs(g1),
    [1, 8, 35, 42, 45, 3, 20, 41, 29, 40, 26, 34, 16, 23, 30, 19, 43, 9, 50, 7, 33, 32, 49, 14, 6, 38, 48, 13, 22, 24, 44, 10, 36, 31, 12, 27, 39, 47, 17],
    'bfs on graph');

  deepEqual(
    algo.graph.dfs(g1),
    [1, 35, 41, 16, 50, 23, 7, 29, 45, 40, 43, 32, 33, 48, 31, 24, 22, 12, 38, 36, 47, 17, 10, 6, 44, 39, 19, 30, 14, 9, 49, 34, 13, 27, 20, 3, 26, 8, 42],
    'dfs on graph');

  var g2 = new T.Graph(4, true),
    e2 = [[1, 2], [1, 3], [2, 4], [3, 2], [3, 4]];
  e2.forEach(function (x) {
    g2.__pushEdge__(x[0], x[1])
  });

  deepEqual(
    algo.graph.topologicalSort(g2),
    [1, 3, 2, 4], 'topological sort on [1, 3, 2, 4]');

  g2 = new T.Graph(3, true);
  e2 = [[1, 2], [2, 3], [3, 1]];
  e2.forEach(function (x) {
    g2.__pushEdge__(x[0], x[1])
  });

  deepEqual(
    algo.graph.topologicalSort(g2),
    [1, 2, 3], 'topological sort on [1, 2, 3]');

  deepEqual(
    algo.graph.topologicalSort(g1),
    [11, 4, 28, 25, 5, 18, 37, 21, 2, 46, 15, 1, 8, 42, 35, 41, 16, 9, 49, 13, 27, 34, 3, 26, 20, 50, 23, 7, 29, 30, 45, 40, 43, 32, 19, 33, 14, 48, 31, 24, 38, 6, 44, 39, 36, 47, 17, 10, 12, 22],
    'topological sort on graph');

  deepEqual(
    algo.graph.sccKosaraju(g1),
    [10, [35, 7, 1, 1, 1, 1, 1, 1, 1, 1], [35, 7, 1]],
    'scc of graph by Kosaraju');


  g2 = new T.Graph(64);
  // test case from https://class.coursera.org/algo-004/forum/thread?thread_id=563
  [[1, [34, 36, 49, 7, 2, 9, 10, 43, 40, 15, 48, 17, 44, 52, 57, 63]],
    [2, [33, 38, 46, 49, 19, 20, 53, 22, 23, 58, 21, 59, 28, 30, 32]],
    [3, [34, 4, 39, 41, 10, 12, 13, 15, 48, 36, 21, 54, 56, 25, 27, 61]],
    [4, [34, 36, 55, 7, 41, 48, 35, 16, 17, 51, 53, 22, 23, 28, 61]],
    [5, [52, 36, 38, 40, 42, 43, 14, 16, 49, 51, 20, 10, 22, 56, 25, 63]],
    [6, [18, 23, 8, 42, 44, 46, 47, 16, 17, 50, 52, 21, 55, 26, 58, 56]],
    [7, [49, 39, 8, 41, 45, 13, 47, 17, 18, 51, 36, 26, 61, 62]],
    [8, [33, 35, 38, 40, 12, 13, 17, 51, 20, 54, 56, 27, 29, 63]],
    [9, [34, 36, 40, 10, 11, 12, 14, 15, 49, 31, 53, 47, 56, 28, 63]],
    [10, [34, 37, 38, 42, 11, 44, 45, 19, 49, 51, 20, 64]],
    [11, [41, 26, 39, 46, 15, 16, 50, 19, 53, 55, 24, 57, 58, 27]],
    [12, [33, 37, 38, 40, 13, 46, 15, 17, 41, 21, 25, 60, 61]],
    [13, [39, 41, 42, 14, 16, 25, 52, 57, 60, 30, 31, 64]],
    [14, [38, 40, 43, 44, 47, 18, 55, 24, 58, 23, 61, 31, 64]],
    [15, [35, 37, 42, 45, 16, 49, 22, 25, 59, 60, 32]],
    [16, [34, 47, 48, 17, 18, 54, 55, 59, 60, 63]],
    [17, [37, 41, 42, 51, 20, 53, 26, 40, 28]],
    [18, [33, 20, 42, 44, 45, 50, 19, 52, 53, 24, 31, 64]],
    [19, [37, 48, 62, 27, 21, 54, 26, 59, 28, 61, 30, 32]],
    [20, [41, 44, 52, 53, 23, 56, 37, 29, 30, 63]],
    [21, [33, 37, 32, 48, 50, 24, 26, 59, 60, 63, 38]],
    [22, [61, 43, 44, 46, 31, 23, 25, 58, 59, 60, 29, 63]],
    [23, [37, 39, 40, 61, 45, 50, 52, 58, 60, 29]],
    [24, [35, 36, 40, 43, 44, 46, 47, 49, 52, 54, 55, 56]],
    [25, [34, 36, 61, 43, 52, 53, 56, 32, 29, 54]],
    [26, [35, 37, 40, 42, 62, 50, 51, 57, 39, 30]],
    [27, [36, 37, 41, 42, 46, 47, 50, 56, 59, 32, 29, 64]],
    [28, [36, 29, 44, 41, 31, 55, 57, 58, 61, 62, 63]],
    [29, [35, 37, 39, 32, 51, 60, 59, 63, 64]],
    [30, [33, 34, 45, 43, 44, 47, 51, 56, 57, 62, 64]],
    [31, [34, 35, 38, 45, 47, 52, 53, 55, 58, 62]],
    [32, [35, 61, 45, 51, 49, 53, 54, 55, 63]],
    [33, [35, 36, 45, 46, 48, 49, 54, 55, 57, 58]],
    [34, [42, 62, 50, 54, 55, 58, 60]],
    [35, [38, 41, 47, 48, 49, 57, 60]],
    [36, [44, 49, 50, 41, 58]],
    [37, [40, 44, 46, 53, 64]],
    [38, [41, 44, 45, 52, 42, 56, 40]],
    [39, [40, 43, 45, 54, 56, 58, 59, 60, 61]],
    [40, [42, 48, 50]],
    [41, [60, 61, 62]],
    [42, [43, 49, 47, 62]],
    [43, [46, 56, 45, 47, 62, 57, 48]],
    [44, [46, 53, 54]],
    [45, [60, 55, 48, 62]],
    [46, [48, 52, 54, 61, 62]],
    [47, [52, 57, 60, 64]],
    [48, [49, 54, 62, 63]],
    [49, [57, 64]],
    [50, [51, 53, 58, 59, 55, 64]],
    [51, [57, 59, 62, 63, 64]],
    [52, [53, 59, 60]],
    [53, [59, 64]],
    [54, [57, 59, 62]],
    [55, [64, 59, 63]],
    [56, [58, 61, 64]],
    [57, [60, 61, 63]],
    [58, [63, 62]],
    [59, [64]]].forEach(function (x) {
    var v = x[0];
    x[1].forEach(function (u) {
      g2.__pushEdge__(v, u, true);
    });
  });

  strictEqual(algo.graph.multiMinimumCut(g2, g2.n), 16, 'minimum cut on graph');
  strictEqual(algo.graph.undirectedConnected(g2).length, 1, 'connectivity on graph');

  var g3 = new T.GraphW(15);
  // test case form https://class.coursera.org/algo-004/forum/thread?thread_id=1001
  // index starts from 0 !
  [[0, [[1, 28], [2, 4], [3, 53], [4, 95], [5, 59], [7, 48], [8, 84], [10, 27], [11, 7], [12, 91], [13, 96]]],
    [1, [[0, 28], [2, 79], [5, 30], [7, 59], [8, 62], [9, 20], [11, 15], [12, 16], [13, 96]]],
    [2, [[0, 4], [1, 79], [3, 80], [5, 19], [6, 74], [8, 59], [10, 80], [11, 81], [12, 65], [13, 7], [14, 13]]],
    [3, [[0, 53], [2, 80], [4, 87], [5, 42], [6, 70], [7, 8], [12, 44], [13, 92]]],
    [4, [[0, 95], [3, 87], [5, 86], [6, 46], [7, 44], [9, 12], [10, 39], [12, 14], [13, 95], [14, 19]]],
    [5, [[0, 59], [1, 30], [2, 19], [3, 42], [4, 86], [6, 12], [7, 0], [8, 72], [10, 92], [11, 54], [12, 0], [13, 68], [14, 22]]],
    [6, [[2, 74], [3, 70], [4, 46], [5, 12], [7, 86], [9, 76], [10, 68], [11, 32], [12, 62], [13, 34]]],
    [7, [[0, 48], [1, 59], [3, 8], [4, 44], [5, 0], [6, 86], [8, 38], [9, 34], [10, 12], [11, 55], [12, 25], [14, 9]]],
    [8, [[0, 84], [1, 62], [2, 59], [5, 72], [7, 38], [10, 66], [11, 31], [12, 95]]],
    [9, [[1, 20], [4, 12], [6, 76], [7, 34], [10, 63], [11, 37], [12, 93], [13, 79]]],
    [10, [[0, 27], [2, 80], [4, 39], [5, 92], [6, 68], [7, 12], [8, 66], [9, 63], [12, 45], [14, 78]]],
    [11, [[0, 7], [1, 15], [2, 81], [5, 54], [6, 32], [7, 55], [8, 31], [9, 37], [12, 75], [13, 87]]],
    [12, [[0, 91], [1, 16], [2, 65], [3, 44], [4, 14], [5, 0], [6, 62], [7, 25], [8, 95], [9, 93], [10, 45], [11, 75], [13, 46], [14, 63]]],
    [13, [[0, 96], [1, 96], [2, 7], [3, 92], [4, 95], [5, 68], [6, 34], [9, 79], [11, 87], [12, 46]]],
    [14, [[2, 13], [4, 19], [5, 22], [7, 9], [10, 78], [12, 63]]]].forEach(function (x) {
    var v = x[0] + 1;
    x[1].forEach(function (u) {
      g3.__pushEdge__(v, u[0] + 1, u[1], false);
    });
  });

  deepEqual(
    algo.graph.dijkstra(g3).map(function (x) {
      return x[1];
    }),
    [0, 22, 4, 31, 36, 23, 35, 23, 38, 42, 27, 7, 23, 11, 17],
    'dijkstra on graph');
});
