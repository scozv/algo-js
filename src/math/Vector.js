// -----API
// Point class and its members
// new Math.Point(arr), a new Point initialized by its coordinates
// this.vector(that), return a new vector build by this and that points
// this.polarCompare(p1, p2), return the comparasion  for angle between <this, p1> and <this, p2>

// Vector class and its members
import array from '../linear/array'
import Point from './Point'

export default class Vector {
  constructor() {
    this.coordinates = [];
    this.dimension = 0;
    var x = 0,
      i;
    if (arguments.length == 1) {
      // arg.length == 1, we build the vector by itselt
      this.dimension = arguments[0].length;
      this.coordinates = arguments[0].map(function (x) {
        return parseFloat(x);
      });
    } else if (arguments.length == 2) {
      var arg0 = arguments[0],
        arg1 = arguments[1];

      var fn = function (x) {
        return parseFloat(x[1]) - parseFloat(x[0]);
      };

      // arg.length == 2, we build the vector by these two Points
      if (Array.isArray(arg0) &&
        Array.isArray(arg1) &&
        arg0.length == arg1.length) {
        this.coordinates = array.zip(arg0, arg1)
          .map(fn);
      } else if ((arg0 instanceof Point) &&
        (arg1 instanceof Point) &&
        (arg0.dimension == arg1.dimension)) {

        this.coordinates = array.zip(arg0.coordinates, arg1.coordinates)
          .map(fn);
      } else {
        throw new Error('unmathced args.');
      }
    } else {
      throw new Error('invalid args.');
    }
  }

  static dot(v1, v2) {
    return array.zip(v1.coordinates, v2.coordinates)
      .reduce(
        function (acc, x) {
          return acc + (x[1] * x[0]);
        },
        0.0);
  }

  static norm(v) {
    var squareSum =
      v.coordinates.reduce(
        function (acc, x) {
          return acc + (x * x);
        },
        0.0);
    return Math.sqrt(squareSum);
  }

  static cos(v1, v2) {
    return Math.Vector.dot(v1, v2) / Math.Vector.norm(v1) / Math.Vector.norm(v2);
  }

  dot(that) {
    return Math.Vector.dot(this, that);
  }

  norm() {
    // gets the norm or length or magnitude of this vector
    return Math.Vector.norm(this);
  }

  cos(that) {
    return Math.Vector.cos(this, that);
  }
}