import ERROR from './ERROR'
import TRAVERSAL from './TRAVERSAL'

import LinkedList from './LinkedList'
import Queue from './Queue'
import Stack from './Stack'

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
  ERROR: ERROR,
  TRAVERSAL: TRAVERSAL,
  "__x__": __x__,

  LinkedList: LinkedList,
  Queue: Queue,
  Stack: Stack
};