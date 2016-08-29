require('./q');

var algo = require('../bundle').default;
var T = algo.type;

test('T.Stack pushing', function () {
  ok((new T.Stack()).size == 0, 'Construct a empty stack');

  var lst1 = new T.Stack(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method';

  deepEqual(lst1.toArray(), [], 'Empty stack equals []');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.push(2);
  length++;
  deepEqual(lst1.toArray(), [2], 'Push 2 into []');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.push(1);
  length++;
  deepEqual(
    lst1.toArray(), [1, 2],
    'Push 1 into <2] should be <1, 2]');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.push(3);
  length++;
  deepEqual(
    lst1.toArray(), [3, 1, 2],
    'Push 3 into <1, 2] should be <3, 1, 2]');
  strictEqual(lst1.size, length, lengthTestMsg);
});

test('T.Stack poping', function () {
  var lst0 = new T.Stack(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method';

  throws(function () {
    lst0.pop();
  }, 'Cannot access an empty stack');

  var lst1 = new T.Stack();
  [2, 3, 4, 1, 7, 7, 9, 8].forEach(function (x) {
    lst1.push(x);
  });
  length = lst1.size;

  strictEqual(lst1.peek(), 8, 'Peek a value')
  deepEqual(lst1.toArray(), [8, 9, 7, 7, 1, 4, 3, 2], 'Same stack after peeking');
  strictEqual(lst1.size, length, lengthTestMsg);

  var x;

  x = lst1.pop();
  strictEqual(x, 8, 'Pop a value')
  length--;
  deepEqual(lst1.toArray(), [9, 7, 7, 1, 4, 3, 2], 'Different stack after poping');
  strictEqual(lst1.size, length, lengthTestMsg);

  lst1.push(5);
  length++;
  deepEqual(lst1.toArray(), [5, 9, 7, 7, 1, 4, 3, 2], 'Different stack after poping and pushing');
  strictEqual(lst1.size, length, lengthTestMsg);
});