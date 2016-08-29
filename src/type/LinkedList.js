class _node {
  constructor(elem, nextNode = null) {
    this.elem = elem;
    this.next = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.__header__ = new _node('H');
    this.__rear__ = this.__header__;
    this.__length__ = 0;
  }

  get isEmpty() {
    return this.__rear__ === this.__header__;
  }

  get size() {
    return this.__length__;
  }

  __insertAfter__(elem, node) {
    // insert elem after the node
    if (node) {
      var x = new _node(elem);
      x.next = node.next;
      node.next = x;
      this.__length__++;

      if (this.__rear__ == node) {
        this.__rear__ = node.next;
      }
    }
  }

  __removeNext__(node) {
    // remove the node after the args node
    if (node && node.next) {
      if (this.__rear__ == node.next) {
        this.__rear__ = node;
      }

      var current = node.next;
      node.next = current.next;

      current.next = null;
      current = null;
      // delete (current);
      // http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=delete#delete

      this.__length__--;
    }
  }

  insert(elem, i) {
    var current = this.__header__,
      j = 0;
    while (/*i < this.length && */current.next && j <= i) {
      current = current.next;
      j++;
    }
    this.__insertAfter__(elem, current);
  }

  push(elem) {
    this.__insertAfter__(elem, this.__rear__);
  }

  remove(elem) {
    var parent = this.__header__;
    while (parent.next && parent.next.elem != elem) {
      parent = parent.next;
    }

    if (parent.next) {
      this.__removeNext__(parent);
    }
  }

  reverse() {
    // iff we have at least 2 elements in this, then we rev it.
    if (this.__length__ > 1) {
      var p = this.__header__.next,
        q = p.next;

      while (q) {
        p.next = q.next;
        q.next = this.__header__.next;
        this.__header__.next = q;
        // move the point
        q = p.next;
      }

      this.__rear__ = p;
    }
  }

  forEach(fn) {
    fn = fn || function (x) {
        x;
      };
    var current = this.__header__.next;

    while (current) {
      fn(current.elem);
      current = current.next;
    }
  }

  map(fn) {
    fn = fn || function (x) {
        return x;
      };
    var arr = [],
      i = 0;
    this.forEach(function (x) {
      arr[i++] = fn(x);
    });

    return arr;
  }

  toArray() {
    return this.map();
  }
}

export default LinkedList;

// type.LinkedList.merge = function(lst1, lst2){
// 	var h1 = lst1.__header__.next,
// 		h2 = lst2.__header__.next,
// 		current;

// 	while (h1 && h2){
// 		if (h1.elem < h2.elem) {
// 			current = h1.next;
// 			h1.next = h2;
// 			h1 = current;
// 		} else {
// 			current = h2.next;
// 			h2.next = h1;
// 			h2 = current;
// 		}
// 	}
// };