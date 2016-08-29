require('./q');

var algo = require('../bundle').default;
var T = algo.type;

test('Test on QuickFind', function () {
  'use strict';

  var find = new T.QuickFind(10);
  strictEqual(find.count(), 10, 'constructor of quick find');
  ok(!find.connected(1, 2), '!connected(1, 2)');
  find.union(1, 3);
  find.union(7, 2);
  find.union(9, 3);
  ok(find.connected(1, 9), 'connected(1, 9)');
  deepEqual(find._id, [0, 3, 2, 3, 4, 5, 6, 2, 8, 3], 'inner list okay')
});

test('Test on WeightedQuickUnion', function () {
  'use strict';

  var find = new T.WeightedQuickUnion(10);
  strictEqual(find.count(), 10, 'constructor of weightd quick union');
  ok(!find.connected(1, 2), '!connected(1, 2)');
  find.union(10, 1);
  find.union(7, 2);
  find.union(5, 10);
  ok(find.connected(1, 5), 'connected(1, 5)');
  strictEqual(find.count(), 7, 'final count of weightd quick union');
  deepEqual(find._id, [ 0, 0, 7, 3, 4, 0, 6, 7, 8, 9 ], 'no potential out of range');
});