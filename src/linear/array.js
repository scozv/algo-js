
const array = {
  zip: function (arr1, arr2) {
    var arr = [],
      n = Math.min(arr1.length, arr2.length),
      i;
    for (i = 0; i < n; i++) {
      arr.push([arr1[i], arr2[i]]);
    }
    return arr;
  },
  swap: function (arr, i, j) {
    i %= arr.length;
    j %= arr.length;

    var swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
  }
};

export default array;


// $pt.take = function (n) {
//   var result = [];
//   for (var i = 0; i < this.length && i < n; i++) {
//     result.push(this[i]);
//   }
//
//   return result;
// };
//
// $pt.skip = function (n) {
//   var result = [];
//   for (var i = n; i < this.length; i++) {
//     result.push(this[i]);
//   }
//
//   return result;
// };
//
// // update or insert item of array, array will be changed
// $pt.upsert = function (item, where, how) {
//   return this.update(item, where, how, true);
// };
//
// // update item of array, array will be changed
// $pt.update = function (item, where, how, upsert) {
//   var itemKey = (where && where(item)) || item,
//     updated = false;
//   /// insert = insert && true;
//
//   // find the item in array by where-function
//   for (var i = 0; i < this.length; i++) {
//     var x = this[i];
//     if (where(x) === itemKey) {
//       // find it and update it
//       updated = true;
//       this[i] = how(x, item);
//     }
//   }
//
//   if (!updated && upsert) {
//     this.push(item);
//   }
//
//   return this;
// };