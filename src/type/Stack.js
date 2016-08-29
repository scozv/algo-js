import ERROR from './ERROR'

class Stack {
  constructor(){
    this.__length__ = 0;
    this.__innerList__ = [];
  };

  get isEmpty() {
    return this.__length__ == 0;
  }

  get size() {
    return this.__length__;
  }

  push(item) {
    this.__innerList__[this.__length__] = item;
    this.__length__++;
  }

  peek() {
    if (this.isEmpty) {
      throw new Error(ERROR.INVALID_EMPTY_COL_ACTION);
    }

    return this.__innerList__[this.__length__ - 1];
  }

  pop() {
    // peek the value, and delete it
    // actually, we do not delete it immediately
    var item = this.peek();
    this.__length__--;
    return item;
  }

  forEach(fn) {
    fn = fn || function (x) {
        return x;
      };
    var i = this.__length__ - 1;
    for (; i >= 0; i--) {
      fn(this.__innerList__[i]);
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

export default Stack;