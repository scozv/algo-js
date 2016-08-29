import LinkedList from './LinkedList'

const error = {
  INVALID_EMPTY_COL_ACTION: 'invalid action on an empty collection',
  INVALID_NUMERIC_VALUE: 'invalid numeric value has been passed',
  INVALID_GRAPH_ACTION: 'invalid action on this graph, check it is directed or not'
};

const traversal = {
  PRE_ORDER: 0,
  IN_ORDER: 1,
  POST_ORDER: 2
};

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
  ERROR: error,
  TRAVERSAL: traversal,
  "__x__": __x__,

  LinkedList: LinkedList
};