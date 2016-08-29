require('./q');

var algo = require('../bundle').default;
var T = algo.type;

test('T.Queue enqueuing', function () {
  ok((new T.Queue()).size == 0, 'Construct a empty queue');

  var lst1 = new T.Queue(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method';

  deepEqual(lst1.toArray(), [], 'Empty queue equals []');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.enqueue(2);
  length++;
  deepEqual(lst1.toArray(), [2], 'Enqueue 2 into []');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.enqueue(1);
  length++;
  deepEqual(
    lst1.toArray(), [2, 1],
    'Enqueue 1 into <2] should be <2, 1]');
  strictEqual(lst1.size, length, lengthTestMsg);
  lst1.enqueue(3);
  length++;
  deepEqual(
    lst1.toArray(), [2, 1, 3],
    'Enqueue 3 into <2, 1] should be <2, 1, 3]');
  strictEqual(lst1.size, length, lengthTestMsg);
});

test('T.Queue dequeuing', function () {
  var lst0 = new T.Queue(),
    length = 0,
    lengthTestMsg = 'Length test success after previous method';

  throws(function () {
    lst0.dequeue();
  }, 'Cannot access an empty queue');

  var lst1 = new T.Queue();
  [2, 3, 4, 1, 7, 7, 9, 8].forEach(function (x) {
    lst1.enqueue(x);
  });
  length = lst1.size;

  strictEqual(lst1.peek(), 2, 'Peek a value')
  deepEqual(lst1.toArray(), [2, 3, 4, 1, 7, 7, 9, 8], 'Same queue after peeking');
  strictEqual(lst1.size, length, lengthTestMsg);

  var x;

  x = lst1.dequeue();
  strictEqual(x, 2, 'Pop a value')
  length--;
  deepEqual(lst1.toArray(), [3, 4, 1, 7, 7, 9, 8], 'Different queue after poping');
  strictEqual(lst1.size, length, lengthTestMsg);

  lst1.enqueue(5);
  length++;
  deepEqual(lst1.toArray(), [3, 4, 1, 7, 7, 9, 8, 5], 'Different queue after poping and pushing');
  strictEqual(lst1.size, length, lengthTestMsg);
});