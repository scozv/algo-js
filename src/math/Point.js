import Vector from './Vector'

export default class Point {
  constructor(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('invalid args, use array.');
    }

    this.dimension = arr.length;
    this.coordinates = arr.map(function (x) {
      return parseFloat(x);
    });
  }

  vector(that) {
    return new Vector(this, that);
  }

  polarCompare(p1, p2) {
    return this.cos(p1) - this.cos(p2);
  }
}