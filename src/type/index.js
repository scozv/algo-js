import ERROR from './ERROR'
import TRAVERSAL from './TRAVERSAL'

import LinkedList from './LinkedList'
import Queue from './Queue'
import Stack from './Stack'
import {MinHeap, MaxHeap} from './Heap'
import {BinarySearchTree} from './Tree'
import {WeightedQuickUnion, QuickFind} from './UnionFind'
import Graph from './Graph'
import GraphW from './WeightedGraph'

function __x__(d, b) {
  // inspired from http://www.typescriptlang.org/Playground/
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }

  __.prototype = b.prototype;
  d.prototype = new __();
}

export default {
  ERROR,
  TRAVERSAL,
  LinkedList,
  Queue, Stack,
  MinHeap, MaxHeap,
  BinarySearchTree,
  QuickFind, WeightedQuickUnion,
  Graph, GraphW,
};