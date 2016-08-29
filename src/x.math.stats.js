(function (Math, undefined) {
  (function (Stats, undefined) {
    // using x.array.js

    Stats.max = function (arr) {
      return firstOrder(arr, function (x, y) {
        return y - x;
      }, Number.MIN_VALUE);
    };

    Stats.min = function (arr) {
      return firstOrder(arr, function (x, y) {
        return x - y;
      }, Number.MAX_VALUE);
    };

    Stats.sum = function (arr) {
      return arr.reduce(function (acc, x) {
        return x + acc;
      }, 0.0);
    };

    Stats.mean = function (arr) {
      return Stats.sum(arr) / arr.length;
    };

    // sample variance
    Stats.var = function (arr) {
      var avg = Stats.mean(arr);
      return arr.reduce(
          function (acc, x) {
            return (x - avg) * (x - avg);
          },
          0.0) / (arr.length - 1);
    };

    Stats.stddev = function (arr) {
      return Math.sqrt(Stats.var(arr));
    };

    Stats.normalize = arr => arr.map(x => x / Stats.sum(arr));

    Stats.linearLeastSquare = function (arr1, arr2, fn) {
      // require(arr1.length == arr2.length)
      if (fn && typeof fn === 'function') {
        arr1 = arr1.map(fn);
        arr2 = arr2.map(fn);
      }

      var avg1 = Stats.mean(arr1);
      var avg2 = Stats.mean(arr2);

      var m = 0, n = 0;
      for (var i = 0; i < arr1.length; i++) {
        m += (arr1[i] - avg1) * (arr2[i] - avg2);
        n += (arr1[i] - avg1) * (arr1[i] - avg1);
      }

      return [m / n, avg2 - m / n * avg1];
    };

    var firstOrder = function (arr, compare, acc) {
      arr.forEach(function (x) {
        if (compare(x, acc) < 0) {
          acc = x;
        }
      });

      return acc;
    };
  }(Math.Stats = Math.Stats || {}));
})(window.Math = window.Math || {});