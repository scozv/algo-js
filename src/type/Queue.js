import LinkedList from './LinkedList'
import ERROR from './ERROR'

class Queue {
  constructor(){
    this.__innerList__ = new LinkedList();
  };

  get isEmpty() {
    return this.__innerList__.isEmpty;
  }

  enqueue(item) {
    this.__innerList__.push(item);
  }

  peek() {
    if (this.__innerList__.isEmpty) {
      throw new Error(ERROR.INVALID_EMPTY_COL_ACTION);
    }

    return this.__innerList__.__header__.next.elem;
  }

  dequeue() {
    var item = this.peek(),
      _lst = this.__innerList__;
    _lst.__removeNext__(_lst.__header__);
    return item;
  }

  get size() {
    return this.__innerList__.size;
  }

  forEach(fn) {
    this.__innerList__.forEach(fn);
  }

  map(fn) {
    return this.__innerList__.map(fn);
  }

  toArray() {
    return this.__innerList__.toArray();
  }
}

export default Queue;