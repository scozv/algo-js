import array from '../linear/array'

export function __compareOrDefault__(compare) {
  return compare && (typeof compare === 'function') ?
    compare :
    function (x, y) {
      return x - y;
    }
}

export function __randomUniqueArray__(length) {
  /// <summary>gets an array of such length, each unique integer element in [0, length].</summary>

  var arr = [],
    i;
  for (i = 0; i < length; i++) {
    arr[i] = i;
  }

  // Knuth shuffle
  var j = -1;
  for (i = length - 1; i > 0; i--) {
    // math.r in [0, 1), we need j in [0, i]
    j = Math.floor(Math.random() * (i + 1));
    array.swap(arr, i, j);
  }

  return arr;
}