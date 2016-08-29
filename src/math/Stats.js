const firstOrder = function (arr, compare, acc) {
  arr.forEach(function (x) {
    if (compare(x, acc) < 0) {
      acc = x;
    }
  });

  return acc;
}
;
const max = function (arr) {
  return firstOrder(arr, function (x, y) {
    return y - x;
  }, Number.MIN_VALUE);
};

const min = function (arr) {
  return firstOrder(arr, function (x, y) {
    return x - y;
  }, Number.MAX_VALUE);
};

const sum = function (arr) {
  return arr.reduce(function (acc, x) {
    return x + acc;
  }, 0.0);
};

const mean = function (arr) {
  return sum(arr) / arr.length;
};

// sample variance
function var0(arr) {
  var avg = mean(arr);
  return arr.reduce(
      function (acc, x) {
        return (x - avg) * (x - avg);
      },
      0.0) / (arr.length - 1);
};

const stddev = function (arr) {
  return Math.sqrt(var0(arr));
};

const normalize = arr => arr.map(x => x / sum(arr));

const linearLeastSquare = function (arr1, arr2, fn) {
  // require(arr1.length == arr2.length)
  if (fn && typeof fn === 'function') {
    arr1 = arr1.map(fn);
    arr2 = arr2.map(fn);
  }

  var avg1 = mean(arr1);
  var avg2 = mean(arr2);

  var m = 0, n = 0;
  for (var i = 0; i < arr1.length; i++) {
    m += (arr1[i] - avg1) * (arr2[i] - avg2);
    n += (arr1[i] - avg1) * (arr1[i] - avg1);
  }

  return [m / n, avg2 - m / n * avg1];
};

export default {
  "var": var0,
  max,
  min,
  sum,
  mean,
  stddev,
  normalize,
  linearLeastSquare,
}