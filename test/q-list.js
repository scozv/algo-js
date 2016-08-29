require('./q');

var algo = require('../bundle').default;
var List = algo.linear;

test('Linear Collection', function () {
  ok(
    List.validPopStackSeries([1, 2, 3], [1, 2, 3]) &&
    List.validPopStackSeries([1, 2, 3], [2, 3, 1]) &&
    List.validPopStackSeries([1, 2, 3], [3, 2, 1]) &&
    List.validPopStackSeries([1, 2, 3], [2, 1, 3]) &&
    List.validPopStackSeries([1, 2, 3], [1, 3, 2]) && !List.validPopStackSeries([1, 2, 3], [3, 1, 2]),
    'push [1, 2, 3] into stack, pop what we want?');

  var arr = [3, 1, 2, 5, 7, 8, 6, 4, 9, 0];
  var med = [3, 1, 2, 2, 3, 3, 5, 4, 5, 4];
  deepEqual(List.medianMaintenence(arr), med, 'median maintenance');
});