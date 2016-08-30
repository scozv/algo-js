import {__compareOrDefault__} from '../sorting/internal'
import linear from '../linear'

class Heap {
  constructor(compare){
    // inspired by alg4p1's implementation
    this.__id__ = [-1];
    this.__count__ = 0;

    this.__compare__ = __compareOrDefault__(compare);
  }

  get isEmpty() {
    return this.size <= 0;
  }

  get size() {
    return this.__count__;
  }

  // exchange child with parent, until _heap is ordered
  __swim__(k) {
    var id = this.__id__,
      cp = this.__compare__;

    while (k > 1 && cp(id[k], id[k >> 1]) < 0) {
      linear.array.swap(id, k, k >> 1);
      k >>= 1;
    }
  }

  push(x) {
    this.__id__[++this.__count__] = x;
    this.__swim__(this.__count__);
    return this.__count__;
  }

  // exchange parent with larger child for max_heap or smaller child for min_heap, until _heap is ordered
  __sink__(k) {
    var id = this.__id__,
      cp = this.__compare__,
      ct = this.__count__,
      j;
    while ((k << 1) <= ct) {
      j = (k << 1);
      if (j < ct && cp(id[j + 1], id[j]) < 0) {
        j++;
      }
      if (cp(id[j], id[k]) < 0) {
        linear.array.swap(id, k, j);
        k = j;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.size <= 0) {
      throw new Error('empty _heap now.');
    }

    var res = this.__id__[1];
    linear.array.swap(this.__id__, 1, this.__count__--);
    this.__sink__(1);
    this.__id__[this.__count__ + 1] = undefined;
    return res;
  }

  peek() {
    if (this.size <= 0) {
      throw new Error('empty _heap now.');
    }

    return this.__id__[1];
  }

  __toArray__() {
    console.warn('this heap has been destroyed by pop to empty');
    var arr = [];
    while (!this.isEmpty) {
      arr.push(this.pop());
    }

    return arr;
  }
}

export class MaxHeap extends Heap {
  constructor(){
    super((x, y) => y - x);
  }
}

export class MinHeap extends Heap {
  constructor(compare){
    super(compare);
  }

  update(indexWhen, updateWhen, updateHow) {
    var heap = this,
      updated = this.__id__.some(function (x, i) {
        return i <= heap.__count__ && x && indexWhen(x) && ((function () {
            if (updateWhen(x)) {
              updateHow(x);
              heap.__swim__(i);
            }
          })(), true);
      });

    return updated;
  }
}