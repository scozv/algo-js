import ERROR from './ERROR'
import TRAVERSAL from './TRAVERSAL'
import {__compareOrDefault__} from '../sorting/internal'
import Stack from './Stack'

class _node {
  constructor(elem) {
    this.elem = elem;
    // The height of a node is the length of the longest downward path to a leaf from that node.
    // The depth of a node is the length of the path to its root (i.e., its root path)
    // The root node has depth zero, leaf nodes have height zero
    this.height = 0;
    this.depth = 0;
    // the addresses of all children of this
    // in binary tree, the length of this.children is 2
    // that is [leftChildAddress, righChildAddress]
    this.children = [];
  }
}

class _tree {
  constructor(degree) {
    if (isNaN(degree = +degree)) {
      throw new Error(ERROR.INVALID_NUMERIC_VALUE);
    } else {
      this.__root__ = null;
      this.__count__ = 0;
      // the degree of this tree must >= max{eachNode.children.length}
      Object.defineProperty(this, '__degree__', {writable: false, value: degree});
    }
  }

  get height() {
    // The height of the root is the height of the tree.
    // an empty tree (tree with no nodes, if such are allowed) has depth and height -1.
    return (this.__root__) ? this.__root__.height : -1;
  }

  get degree() {
    return this.__degree__;
  }

  get size() {
    return this.__count__;
  }

  // ***** private members *****

  __insertBelowAt__(elem, node, index) {
    var child = new _node(elem);

    if (node) {
      // assert(index < this.degree)
      node.children = node.children || [];
      node.children[index] = child;
    } else {
      this.__root__ = (node = child);
    }

    this.__count__++;

    return node;
  }
}

export class BinarySearchTree extends _tree {
  constructor(compare) {
    super(2);

    this.__compare__ = __compareOrDefault__(compare);
  }

  search(elem) {
    // search elem in this tree, returns node which contains elem, or null if not exsits
    var parent = this.__searchParent__(elem),
      cp = this.__compare__;

    // notice each of two paths of if-else
    // if the value we return is null, means we cannot find elem,
    // otherwise, the returned node is what we look for
    if (!parent) {
      return this.__root__;
    }
    else {
      return parent.children[cp(elem, parent.elem) < 0 ? 0 : 1]
    }
  }

  rSearch(elem) {
    // recursive version of search
    var cp = this.__compare__;

    var f0 = function (node) {
      var c;

      if (!node || (c = cp(elem, node.elem)) === 0) {
        return node;
      }
      else {
        return f0(node.children[c < 0 ? 0 : 1]);
      }
    };

    return f0(this.__root__);
  }

  __searchParent__(elem) {
    // gets the parent, one of whose children contains elem, so if
    // p is null -> root is null OR root.elem == elem
    // p.children[0 : 1] is null, we can insert elem under parent[0:1]
    // p.children[0 : 1] is not null, that means p.children[0 : 1] === elem (elem has been there)
    var cp = this.__compare__,
      c,
      parent = null,
      current = this.__root__;

    while (current && (c = cp(elem, current.elem)) !== 0) {
      parent = current;
      current = current.children && current.children[c < 0 ? 0 : 1];
    }

    return parent;
  }

  __childOfParent__(elem, parent) {
    // get a valid child of paraent, and the child.elem === elem

    var cp = this.__compare__,
      c = cp(elem, parent.elem),
      i = c < 0 ? 0 : 1;
    return c !== 0 && cp(elem, parent.children[i].elem) === 0 &&
      parent.children[i];

  }

  insert(elem) {
    // inserts elem under BST order, no duplication

    if (!this.__root__) {
      this.__root__ = new _node(elem);
      return;
    }

    var parent = this.__searchParent__(elem),
      cp = this.__compare__,
      i;

    if (parent && !parent.children[i = (cp(elem, parent.elem) < 0 ? 0 : 1)]) {
      parent.children[i] = new _node(elem);
    }
  }

  rInsert(elem) {
    // recursive version of insert
    var cp = this.__compare__;

    var f0 = function (node) {
      // assert(!node)
      var c = cp(elem, node.elem),
        i;
      if (c !== 0) {
        // 0 for left, 1 for right
        i = c < 0 ? 0 : 1;

        node.children[i] ?
          f0(node.children[i]) :
          node.children[i] = new _node(elem);
      }
    };

    this.__root__ ?
      f0(this.__root__) :
      this.__root__ = new _node(elem);
  }

  forEach(traversal, fn) {
    fn = fn && (typeof fn === 'function') ? fn : function (x) {
      return x;
    };

    var cp = this.__compare__;

    // pre order
    // inspired from http://www.geeksforgeeks.org/iterative-preorder-traversal/
    var pre = function (node) {
      if (node) {
        var frontier = new Stack(),
          current;

        frontier.push(node);
        while (!frontier.isEmpty) {
          current = frontier.pop();
          fn(current.elem);
          current.children[1] ? frontier.push(current.children[1]) : null;
          current.children[0] ? frontier.push(current.children[0]) : null;
        }
      }
    };

    // in order
    // inspired from http://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
    var ino = function (node) {
      if (node) {
        var frontier = new Stack(),
          current = node;

        while (current || !frontier.isEmpty) {
          if (current) {
            frontier.push(current);
            current = current.children[0];
          } else {
            current = frontier.pop();
            fn(current.elem);
            current = current.children[1];
          }
        }
      }
    };

    // post order
    // inspired from http://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/
    var pos = function (node) {
      if (node) {
        var frontier = new Stack(),
          current = node;

        do {
          // Move to leftmost node
          while (current) {
            current.children[1] ? frontier.push(current.children[1]) : null;
            frontier.push(current);
            current = current.children[0];
          }

          current = frontier.pop();
          // If the popped item has a right child and the right child is not
          // processed yet, then make sure right child is processed before root
          if (current.children[1] && !frontier.isEmpty &&
            cp(frontier.peek().elem, current.children[1].elem) === 0) {
            frontier.pop();
            frontier.push(current);
            current = current.children[1];
          } else {
            fn(current.elem);
            current = null;
          }

        } while (!frontier.isEmpty)
      }
    };

    switch (traversal) {
      case TRAVERSAL.PRE_ORDER:
        pre(this.__root__);
        break;
      case TRAVERSAL.POST_ORDER:
        pos(this.__root__);
        break;
      default:
        ino(this.__root__);
        break;
    }

  }

  rForEach(traversal, fn) {
    fn = fn && (typeof fn === 'function') ? fn : function (x) {
      return x;
    };

    // pre order
    var pre = function (node) {
      if (node) {
        fn(node.elem);
        pre(node.children[0]);
        pre(node.children[1]);
      }
    };

    // in order
    var ino = function (node) {
      if (node) {
        ino(node.children[0]);
        fn(node.elem);
        ino(node.children[1]);
      }
    };

    // post order
    var pos = function (node) {
      if (node) {
        pos(node.children[0]);
        pos(node.children[1]);
        fn(node.elem);
      }
    };

    switch (traversal) {
      case TRAVERSAL.PRE_ORDER:
        pre(this.__root__);
        break;
      case TRAVERSAL.POST_ORDER:
        pos(this.__root__);
        break;
      default:
        ino(this.__root__);
        break;
    }
  }

  map(traversal, fn) {
    fn = fn && (typeof fn === 'function') ? fn : function (x) {
      return x;
    };

    var arr = [];
    this.forEach(
      traversal,
      function (x) {
        arr.push(fn(x));
      }
    );

    return arr;
  }

  rMap(traversal, fn) {
    fn = fn && (typeof fn === 'function') ? fn : function (x) {
      return x;
    };

    var arr = [];
    this.rForEach(
      traversal,
      function (x) {
        arr.push(fn(x));
      }
    );

    return arr;
  }
}