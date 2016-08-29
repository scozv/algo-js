import {__compareOrDefault__} from './internal'

function _deepCloneTo(arr, to, l, r) {
  // copy arr to to deeply from l to r inclusively
  // require arr.length  = to.length;

  r = r % arr.length;

  for (var i = l; i <= r; i++) {
    to[i] = arr[i];
  }
}

function _merge(arr, aux, l, mid, r, compare) {
  // required sorted(arr, l, mid);
  // required sorted(arr, mid+1, r);
  // require arr.length = aux.length;

  _deepCloneTo(arr, aux, l, r);
  var i = l, j = mid + 1,
    k = l;
  for (; k <= r; k++) {
    if (i > mid) {
      arr[k] = aux[j++];
    }
    else if (j > r) {
      arr[k] = aux[i++];
    }
    else if (compare(aux[i], aux[j]) > 0) {
      // inversions += (mid - i + 1);
      arr[k] = aux[j++];
    }
    else {
      arr[k] = aux[i++];
    }
  }
}

function _mergeSort(arr, aux, l, r, compare) {
  if (l < r) {
    var mid = l + ((r - l) >> 1);
    _mergeSort(arr, aux, l, mid, compare);
    _mergeSort(arr, aux, mid + 1, r, compare);
    _merge(arr, aux, l, mid, r, compare);
  }
}

export function mergeSort(arr, compare) {
  // default order by asc
  compare = __compareOrDefault__(compare);

  var copy = [...arr];
  var aux = [];

  // inversions = 0;

  _mergeSort(copy, aux, 0, copy.length - 1, compare);

  // console.log('# of inversions: ' + inversions);

  return copy;
}

export function mergeSortBU(arr, compare) {
  // default order by asc
  compare = __compareOrDefault__(compare);

  var copy = [...arr];
  var aux = [];
  var n = arr.length,
    sz = 1,
    lo = 0;
  for (sz = 1; sz < n; sz <<= 1) {
    for (lo = 0; lo < n - sz; lo += (sz << 1)) {
      _merge(copy, aux, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, n - 1), compare);
    }
  }

  return copy;
}
