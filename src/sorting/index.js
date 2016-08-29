import heapSort from './heapSort'
import quickSort from './quickSort'
import {mergeSort, mergeSortBU} from './mergeSort'
import {__randomUniqueArray__, __compareOrDefault__} from './internal'

function isSorted(arr, compare) {
  // default order by asc
  /*
   * inspired by http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
   */
  compare = __compareOrDefault__(compare);

  var sorted = true, i;
  for (i = 0; i < arr.length - 1; i++) {
    if (compare(arr[i], arr[i + 1]) > 0) {
      // console.log(arr[i], arr[i+1]);
      sorted = false;
      break;
    }
  }

  return sorted;
}

function binarySearch(arr, x, low, high) {
  low = low || 0;
  high = high || arr.length - 1;

  var mid = -1;

  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (arr[mid] === x) {
      return mid;
    }
    else if (arr[mid] < x) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }

  return -1;
}

export default {
  __randomUniqueArray__,
  isSorted,
  binarySearch,
  heapSort,
  quickSort,
  mergeSort,
  mergeSortBU,
}