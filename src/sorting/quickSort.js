import {__compareOrDefault__} from './internal'
import array from '../linear/array'

function _partition(arr, l, r, compare) {
  var i = l,
    j = r + 1;

  while (true) {
    while (compare(arr[++i], arr[l]) < 0) {
      if (i == r) {
        break;
      }
    }

    while (compare(arr[l], arr[--j]) < 0) {
      if (j == l) {
        break;
      }
    }

    if (i >= j) {
      break;
    }
    array.swap(arr, i, j);
  }

  array.swap(arr, l, j);
  return j;
}

function _quickSort(arr, l, r, compare) {
  /// <summary>quick sort the arr, during the range from index l to r, inclusive.</summary>

  // base case
  if (r >= arr.length) {
    r = arr.length - 1;
  }

  if (l >= r) {
    return;
  }

  var j = _partition(arr, l, r, compare);

  // recursive calls
  _quickSort(arr, l, j - 1, compare);
  _quickSort(arr, j + 1, r, compare);
}

export default function quickSort(arr, compare, skipClone) {
  // default order by asc
  compare = __compareOrDefault__(compare);

  var arrCopy = skipClone === true ? arr : [...arr];

  _quickSort(arrCopy, 0, arrCopy.length - 1, compare);

  return arrCopy;
}