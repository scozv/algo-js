import {MinHeap} from '../type/Heap'
import {WeightedQuickUnion} from '../type/UnionFind'
import quickSort from '../sorting/quickSort'

export const mstPrim = function (graph, s) {
  s = s || 1;

  // assert is weighted, s in [1. n]

  // in our heap (frontier), each x, y is formated like [u, v, w],
  // where u in X, v not in X, w is weight
  var frontier = new MinHeap(function (x, y) {
      return x[2] - y[2];
    }),
    g = graph.clone(),
    mst = [],
    i = 0,
    current;

  // label each vertex
  // -1 for init, 1 for having been added in X
  g.__labelAll__(-1);

  // init for s
  frontier.push([0, s, 0]);

  while (!frontier.isEmpty() && i < g.n) {
    current = frontier.pop();
    // add current into X, T
    g.__labelAt__(current[1], 1);
    mst.push(current);
    i++;

    g.__edgesFrom__(current[1]).forEach(function (v) {
      if (g.__labelAt__(v[0]) === -1) {
        // not visited, update each in frontier
        var updated = frontier.update(
          function (x) {
            return x[1] === v[0];
          },
          function (x) {
            return v[1] < x[2];
          },
          function (x) {
            x[0] = current[1];
            x[2] = v[1];
          });

        if (!updated) {
          frontier.push([current[1], v[0], v[1]]);
        }
      } // end if, unvisited
    });
  }

  return mst.reduce(function (acc, x) {
    return acc + x[2];
  }, 0);
};

export const mstKruskal = function (graph, k) {
  var g = graph.clone(),
    edges = quickSort(
      g.__getEdgeList__(),
      function (x, y) {
        return x[2] - y[2];
      }),
    mst = [],
    u = 0,
    v = 0,
    frontier = new WeightedQuickUnion(g.n),
    space = -1;

  edges.some(function (e) {
    u = e[0];
    v = e[1];
    if (!frontier.connected(u, v)) {
      if (!k || frontier.count() > k) {
        mst.push(e);
        frontier.union(u, v);
      } else {
        space = e[2];
        return true;
      }
    }
  });

  return k ? space : mst.reduce(function (acc, x) {
    return acc + x[2];
  }, 0);
};