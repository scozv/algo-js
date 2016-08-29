import math from '../math'

export class QuickFind {
  constructor(n) {
    this._count = n;
    this._id = math.range(n);
  }

  count() {
    return this._count;
  }

  // find parent of i
  find(p) {
    p = math.mod(p, this._id.length);
    return this._id[p];
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    var _ = this,
      i = _.find(p),
      j = _.find(q);

    if (i !== j) {
      _._id.forEach(function (x, k) {
        _._id[k] = (x === i ? j : x);
      });

      _._count--;
    }

    return _._count;
  }
}

export class WeightedQuickUnion extends QuickFind {
  constructor(n) {
    super(n);

    this._size = math.range(n).map(_ => 1);
  }

  find(p) {
    p = math.mod(p, this._id.length);
    while (p !== this._id[p]) {
      p = this._id[p];
    }

    return p;
  }

  union(p, q) {
    var _ = this,
      i = this.find(p),
      j = this.find(q);

    if (i !== j) {
      if (_._size[i] < _._size[j]) {
        _._id[i] = j;
        _._size[j] += _._size[i];
      } else {
        _._id[j] = i;
        _._size[i] += _._size[j];
      }

      _._count--;
    }

    return _._count;
  }
}