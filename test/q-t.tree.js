require('./q');

var algo = require('../bundle').default;
var T = algo.type;
var Sorting = algo.sorting;

test('Tree, BST', function () {
  var bst1 = new T.BinarySearchTree();
  ok(!!(bst1 &&
  bst1.__degree__ == 2 &&
  (bst1.__root__ === null) &&
  (bst1.__count__ === 0) &&
  (bst1.size === 0) &&
  (bst1.search(5) === null) &&
  (bst1.rSearch(5) === null)), 'basic properties of BST');

  bst1 = new T.BinarySearchTree();
  var arr = Sorting.__randomUniqueArray__(29);
  arr.forEach(function (x) {
    bst1.insert(x);
  });
  ok(arr.every(function (x) {
    var node = bst1.search(x);
    return node && node.elem === x;
  }), 'insert and search from [0, 29)');

  bst1 = new T.BinarySearchTree();
  arr = Sorting.__randomUniqueArray__(29);
  arr.forEach(function (x) {
    bst1.rInsert(x);
  });
  ok(arr.every(function (x) {
    var node = bst1.rSearch(x);
    return node && node.elem === x;
  }), 'insert and search from [0, 29), recursive version');

  deepEqual(
    bst1.rMap(T.TRAVERSAL.PRE_ORDER), bst1.map(T.TRAVERSAL.PRE_ORDER),
    'traversal by pre order, iter vs rec');
  deepEqual(
    bst1.rMap(T.TRAVERSAL.IN_ORDER), bst1.map(T.TRAVERSAL.IN_ORDER),
    'traversal by in order, iter vs rec');
  deepEqual(
    bst1.rMap(T.TRAVERSAL.POST_ORDER), bst1.map(T.TRAVERSAL.POST_ORDER),
    'traversal by post order, iter vs rec');
});