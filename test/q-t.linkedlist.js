require('./q');

var algo = require('../bundle').default;
var T = algo.type;

test('T.LinkedList inserting', function () {
  ok((new T.LinkedList()).size == 0, 'Construct a empty list');

  var lst1 = new T.LinkedList(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method',
    rearTestMsg = 'Rear elem test success',
    peek = function (lst) {
      return lst.__rear__.elem;
    };

  deepEqual(lst1.toArray(), [], 'Empty list equals []');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 'H', rearTestMsg);
  lst1.push(2);
  length++;
  deepEqual(lst1.toArray(), [2], 'Push 2 into []');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 2, rearTestMsg);
  lst1.insert(1, 0);
  length++;
  deepEqual(
    lst1.toArray(), [2, 1],
    'Insert 1 into [2], after 0, should be [2, 1]');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 1, rearTestMsg);
  lst1.insert(3, 0);
  length++;
  deepEqual(
    lst1.toArray(), [2, 3, 1],
    'Insert 3 into [2, 1], after 0, should be [2, 3, 1]');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 1, rearTestMsg);
  lst1.insert(4, 1);
  length++;
  deepEqual(
    lst1.toArray(), [2, 3, 4, 1],
    'Insert 4 into [2, 3, 1], after 1, should be [2, 3, 4, 1]');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 1, rearTestMsg);
  lst1.insert(7, 4);
  length++;
  deepEqual(
    lst1.toArray(), [2, 3, 4, 1, 7],
    'Insert 7 into [2, 3, 4, 1], after 4 (>= length), should be at the end');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 7, rearTestMsg);
  lst1.insert(9, 100);
  length++;
  deepEqual(
    lst1.toArray(), [2, 3, 4, 1, 7, 9],
    'Insert 9 into [2, 3, 4, 1, 7], after 100 (>= length), should be at the end');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 9, rearTestMsg);
  lst1.push(8);
  length++;
  deepEqual(lst1.toArray(), [2, 3, 4, 1, 7, 9, 8], 'Push 8 into [2, 3, 4, 1, 7, 9], should be [2, 3, 4, 1, 7, 9, 8]');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 8, rearTestMsg);
});

test('T.LinkedList reversing', function () {
  var lst0 = new T.LinkedList(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method',
    rearTestMsg = 'Rear elem test success',
    peek = function (lst) {
      return lst.__rear__.elem;
    };

  lst0.reverse();
  deepEqual(lst0.toArray(), [], 'Reverse an empty list');
  strictEqual(lst0.size, length, lengthTestMsg);

  lst0.push(2);
  length++;
  lst0.reverse();
  deepEqual(lst0.toArray(), [2], 'Reverse a list with only one element');
  strictEqual(lst0.size, length, lengthTestMsg);
  strictEqual(peek(lst0), 2, rearTestMsg);

  lst0.push(1);
  length++;
  lst0.reverse();
  deepEqual(lst0.toArray(), [1, 2], 'Reverse [2, 1] should be [1, 2]');
  strictEqual(lst0.size, length, lengthTestMsg);
  strictEqual(peek(lst0), 2, rearTestMsg);

  var lst1 = new T.LinkedList();
  [2, 3, 4, 1, 7, 9, 8].forEach(function (x) {
    lst1.push(x);
  });
  length = lst1.size;
  lst1.reverse();
  deepEqual(lst1.toArray(), [8, 9, 7, 1, 4, 3, 2], 'Reverse [2, 3, 4, 1, 7, 9, 8]');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 2, rearTestMsg);
});

test('T.LinkedList removing', function () {
  var lst0 = new T.LinkedList(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method',
    rearTestMsg = 'Rear elem test success',
    peek = function (lst) {
      return lst.__rear__.elem;
    };

  lst0.remove(2);
  deepEqual(lst0.toArray(), [], 'Remove 2 from an empty list');
  strictEqual(lst0.size, length, lengthTestMsg);
  strictEqual(peek(lst0), 'H', rearTestMsg);

  var lst1 = new T.LinkedList();
  [2, 3, 4, 1, 7, 7, 9, 8].forEach(function (x) {
    lst1.push(x);
  });
  length = lst1.size;

  lst1.remove(-1);
  deepEqual(lst1.toArray(), [2, 3, 4, 1, 7, 7, 9, 8], 'Remove a nonexisted item');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 8, rearTestMsg);

  lst1.remove(2);
  length--;
  deepEqual(lst1.toArray(), [3, 4, 1, 7, 7, 9, 8], 'Remove 1st item');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 8, rearTestMsg);

  lst1.remove(1);
  length--;
  deepEqual(lst1.toArray(), [3, 4, 7, 7, 9, 8], 'Remove middle item');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 8, rearTestMsg);

  lst1.remove(8);
  length--;
  deepEqual(lst1.toArray(), [3, 4, 7, 7, 9], 'Remove last item');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 9, rearTestMsg);

  lst1.remove(7);
  length--;
  deepEqual(lst1.toArray(), [3, 4, 7, 9], 'Remove 1st one of dulicated items');
  strictEqual(lst1.size, length, lengthTestMsg);
  strictEqual(peek(lst1), 9, rearTestMsg);
});