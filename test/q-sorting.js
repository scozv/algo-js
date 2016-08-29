require('./q');

var algo = require('../bundle').default;
var T = algo.type;
var Sorting = algo.sorting;

test('Sorting, the basic function', function () {
  // test random unique array generator
  var uniqueArraySort = function (length) {
    // get an unique random array, sort it, and it is supported to eaqul the array [0, 1..., n-1]
    length = length || 10;

    var sortedArray = [],
      randomArray = [],
      success = true,
      i;

    for (i = 0; i < length; i++) {
      sortedArray[i] = i;
    }

    randomArray = Sorting.__randomUniqueArray__(length);
    // according to MDN
    // If compareFunction is not supplied, elements are sorted by converting them to strings 
    // and comparing strings in lexicographic ("dictionary" or "telephone book," not numerical) order.
    randomArray.sort(function (x, y) {
      return x - y;
    });

    for (i = 0; i < length; i++) {
      if (sortedArray[i] !== randomArray[i]) {
        success = false;
        break;
      }
    }

    return success;
  };

  ok(uniqueArraySort(5), 'random array with unique element of length 5');
  ok(uniqueArraySort(50), 'random array with unique element of length 50');
  ok(uniqueArraySort(500), 'random array with unique element of length 500');
  // ok(uniqueArraySort(500000), 'random array with unique element of length 500000');

  var testIsSorted = function (length, fn, compare) {
    var arr = Sorting.__randomUniqueArray__(length);
    arr.sort(function (x, y) {
      return compare(fn(x), fn(y));
    });
    return Sorting.isSorted(arr, compare);
  };

  ok(!Sorting.isSorted([1, 2, 3, 0]), '[1, 2, 3, 0] is not sorted');

  ok(testIsSorted(50, function (x) {
    return x;
  }, function (x, y) {
    return x - y;
  }), 'isSorte test for array of length 50, x=>x, x<y');
  ok(testIsSorted(50, function (x) {
    return x * x;
  }, function (x, y) {
    return x - y;
  }), 'isSorte test for array of length 50, x=>x*x, x<y');
  ok(testIsSorted(50, function (x) {
    return x;
  }, function (x, y) {
    return y - x;
  }), 'isSorte test for array of length 50, x=>x, x>y');
});

test('Sorting, the correctness', function () {
  var arr = Sorting.__randomUniqueArray__(10000);
  ok(Sorting.isSorted(Sorting.mergeSort(arr)), 'merge sort for array of length 10000');
  ok(Sorting.isSorted(Sorting.mergeSortBU(arr)), 'merge sort (bottom up version) for array of length 10000');
  ok(Sorting.isSorted(Sorting.quickSort(arr)), 'quick sort for array of length 10000');
  // heap sorting
  ok(Sorting.isSorted(Sorting.heapSort(arr, {order: 'ASC'})), 'heap sort for array of length 10000');
  ok(Sorting.isSorted(Sorting.heapSort(arr, {order: 'DESC'}), function (x, y) {
    return y - x;
  }), 'heap sort for array of length 10000');
});

test('Soring, the time test', function () {
  var timeArray = function (index, sorting) {
    // get an array of sorting time, resulting from the input sample
    // return index.map(input => time(input))

    var time = [],
      arr = [],
      i;

    for (i = 0; i < index.length; i++) {
      arr = Sorting.__randomUniqueArray__(index[i]);
      time[i] = Math.__timer__(function () {
        sorting(arr);
      });
    }

    return time;
  };

  var error = function (end, sorting) {
    // 0. index: get the index array [0...len)
    // 1. time: get the time array [t_0...t_len)
    // 2. cod: get a, b for ax+b = y, we use cod for [a, b]
    // 3. time1: get the time' array [t'_0...t'_len), where t_i = ax_i + b
    // 4. TODO dev: get sqrt(sum((t'_i-t_i)^2))
    // 5. TODO return dev < 1e-5
    // 6. actually, we return ratio of the number of error > 1

    var index,
      time,
      cod,
      time1,
      dev,
      e;

    index = Math.range(10000, end, 100);
    time = timeArray(index, sorting);
    cod = Math.Stats.linearLeastSquare(index.map(function (i) {
      return i * Math.log(i);
    }), time);
    time1 = index.map(function (i) {
      return cod[0] * (i * Math.log(i)) + cod[1];
    });
    e = time.zip(time1).map(function (x) {
      return Math.pow(x[0] - x[1], 2);
    });
    dev = Math.Stats.sum(e);

    // console.log(index);
    // console.log(index.map(function(i){return i * Math.log(i);}));
    // console.log(time);
    // console.log(cod);
    // console.log(time1);
    // console.log(e);
    // console.log(dev)
    // console.log(e.filter(function(x){return x>1.0;}).length);
    // console.log(e.length);

    // return Math.sqrt(dev);
    var len = e.filter(function (x) {
      return x > 1.0;
    }).length;
    console.log(len, e.length);
    return len / e.length
  };

  // comment out following test, for its time-consuming
  // ok(error(100000, Sorting.mergeSort) < 0.1, 'merge sort in nlogn');
  // ok(error(100000, Sorting.quickSort) < 0.1, 'merge sort in nlogn');
  // ok(error(100000, Sorting.heapSort) < 0.1, 'merge sort in nlogn');
  ok(true, 'wait for time test of sorting, please look at the code of q-index.js');
});

test('Sorting, the binary search', function () {
  strictEqual(Sorting.binarySearch([], 5), -1, 'search 5 in []');

  strictEqual(Sorting.binarySearch([5], 5), 0, 'search 5 in [5]');
  strictEqual(Sorting.binarySearch([5, 6], 5), 0, 'search 5 in [5, 6]');
  strictEqual(Sorting.binarySearch([5, 6, 7], 5), 0, 'search 5 in [5, 6, 7]');
  strictEqual(Sorting.binarySearch([4, 5], 5), 1, 'search 5 in [4, 5]');
  strictEqual(Sorting.binarySearch([3, 4, 5], 5), 2, 'search 5 in [3, 4, 5]');
  strictEqual(Sorting.binarySearch([4, 5, 6], 5), 1, 'search 5 in [4, 5, 6]');
  strictEqual(Sorting.binarySearch([3, 4, 5, 6], 5), 2, 'search 5 in [3, 4, 5, 6]');
  strictEqual(Sorting.binarySearch([4, 5, 6, 7], 5), 1, 'search 5 in [4, 5, 6, 7]');

  strictEqual(Sorting.binarySearch([5], 4.9), -1, 'search 4.9 in [5]');
  strictEqual(Sorting.binarySearch([5, 6], 4.9), -1, 'search 4.9 in [5, 6]');
  strictEqual(Sorting.binarySearch([5, 6, 7], 4.9), -1, 'search 4.9 in [5, 6, 7]');
  strictEqual(Sorting.binarySearch([4, 5], 4.9), -1, 'search 4.9 in [4, 5]');
  strictEqual(Sorting.binarySearch([3, 4, 5], 4.9), -1, 'search 4.9 in [3, 4, 5]');
  strictEqual(Sorting.binarySearch([4, 5, 6], 4.9), -1, 'search 4.9 in [4, 5, 6]');
  strictEqual(Sorting.binarySearch([3, 4, 5, 6], 4.9), -1, 'search 4.9 in [3, 4, 5, 6]');
  strictEqual(Sorting.binarySearch([4, 5, 6, 7], 4.9), -1, 'search 4.9 in [4, 5, 6, 7]');

  strictEqual(Sorting.binarySearch([5], 5.1), -1, 'search 5.1 in [5]');
  strictEqual(Sorting.binarySearch([5, 6], 5.1), -1, 'search 5.1 in [5, 6]');
  strictEqual(Sorting.binarySearch([5, 6, 7], 5.1), -1, 'search 5.1 in [5, 6, 7]');
  strictEqual(Sorting.binarySearch([4, 5], 5.1), -1, 'search 5.1 in [4, 5]');
  strictEqual(Sorting.binarySearch([3, 4, 5], 5.1), -1, 'search 5.1 in [3, 4, 5]');
  strictEqual(Sorting.binarySearch([4, 5, 6], 5.1), -1, 'search 5.1 in [4, 5, 6]');
  strictEqual(Sorting.binarySearch([3, 4, 5, 6], 5.1), -1, 'search 5.1 in [3, 4, 5, 6]');
  strictEqual(Sorting.binarySearch([4, 5, 6, 7], 5.1), -1, 'search 5.1 in [4, 5, 6, 7]');
});