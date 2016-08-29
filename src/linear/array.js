function zip(arr1, arr2) {
  var arr = [],
    n = Math.min(arr1.length, arr2.length),
    i;
  for (i = 0; i < n; i++) {
    arr.push([arr1[i], arr2[i]]);
  }
  return arr;
}

function swap(arr, i, j) {
  i %= arr.length;
  j %= arr.length;

  var swap = arr[i];
  arr[i] = arr[j];
  arr[j] = swap;
}


const take = function (arr, n) {
  var result = [];
  for (var i = 0; i < arr.length && i < n; i++) {
    result.push(arr[i]);
  }

  return result;
};

const skip = function (arr, n) {
  var result = [];
  for (var i = n; i < arr.length; i++) {
    result.push(arr[i]);
  }

  return result;
};

// update or insert item of array, array will be changed
const upsert = function (arr, item, where, how) {
  return update(arr, item, where, how, true);
};

// update item of array, array will be changed
const update = function (arr, item, where, how, upsert) {
  var itemKey = (where && where(item)) || item,
    updated = false;
  /// insert = insert && true;

  // find the item in array by where-function
  for (var i = 0; i < arr.length; i++) {
    var x = arr[i];
    if (where(x) === itemKey) {
      // find it and update it
      updated = true;
      arr[i] = how(x, item);
    }
  }

  if (!updated && upsert) {
    arr.push(item);
  }

  return arr;
};

export default {
  zip,
  swap,
  take,
  skip,
  upsert,
  update,
};