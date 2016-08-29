(function (hash, undefined) {

  hash.tsum = function (arr, l, r) {
    // we sort arr
    // binary search z-x in arr for each x

    var a = arr.clone(),
      zeroIndex = -1,
      u, v;

    a.push(0);
    a = Sorting.quickSort(a);
    zeroIndex = Sorting.binarySearch(a, 0);

    function index(target) {
      // O(nlgn)
      return a.some(function (x) {
          u = x;
          v = target - u;
          return (v < 0 ?
              Sorting.binarySearch(a, v, 0, zeroIndex - 1) :
              Sorting.binarySearch(a, v, zeroIndex, a.length - 1)) > -1;
        }) && (u !== v);
    }

    // O(m * nlgn)
    return Math.range(l, r + 1).filter(function (x) {
      return index(x);
    });
  };

  hash.tsum1 = function (arr, l, r) {
    // we hash x to index of h1, for each x in arr, where x >= 0
    // we hash x to index of h2, where x < 0
    // we search z-x in related hash table, see whether it is a valid index or not, for each x in arr

    var h1 = [],
      h2 = [],
      v;

    // n
    arr.forEach(function (x) {
      x >= 0 ?
        h1[x] = true :
        h2[-x] = true;
    });

    // m * n
    return Math.range(l, r + 1).filter(function (x) {
      // n * 1
      console.log(x);
      return arr.some(function (u) {
        v = x - u;
        return u !== v && ((v >= 0 && h1[v]) || (v < 0 && h2[v]));
      })
    });
  };

  hash.tsum2 = function (arr, l, r) {
    // we hash x to (x % sqrt(arr.length))
    // search f(z-x) in hash table by valid index
    // then seach z-x in that bucket by binary search

    var hlen = Math.sqrt(arr.length),
      h = [],
      k;

    // O(n)
    arr.forEach(function (x) {
      k = Math.mod(x, hlen);
      h[k] = h[k] || [];
      h[k].push(x);
    });

    // O(sqrt(n) * O(sqrt(n) log sqrt(n)))
    // = O(n log sqrt(n))
    h.forEach(function (x) {
      if (x && x.sort) {
        x.sort(function (u, v) {
          return u - v;
        });
      }
    });

    // O(log sqrt(n))
    function exsits(x) {
      k = Math.mod(x, hlen);
      return h[k] && h[k].length && x >= h[k][0] && x <= h[k][h[k].length - 1] && Sorting.binarySearch(h[k], x) > -1;
    }

    // z = x+y?
    // O(m n log sqrt(n))
    return Math.range(l, r + 1).filter(function (z) {
      // O(n log sqrt(n))
      return arr.some(function (x) {
        return (z - x !== x) && exsits(z - x);
      });
    });
  }

  hash.__build__ = function (lines) {
    var arr = lines.map(function (x) {
      return x.split(' ').map(function (wl) {
        return +wl;
      });
    });

    var result = List.minimumWeightedCompletion(arr, function (x, y) {
      var c = (y[0] - y[1]) - (x[0] - x[1]);
      return c === 0 ? (y[0] - x[0]) : c;
    });

    console.log(result);

    result = List.minimumWeightedCompletion(arr);
    console.log(result);
  };

})(window.Hash = window.Hash || {})
