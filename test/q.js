window = global;

require('../src/t.js')
require('../src/x.array.js');
require('../src/x.math.js');
require('../src/t.linkedlist.js');
require('../src/t.stack.js');
require('../src/t.queue.js');
require('../src/t.tree.js');
require('../src/t.heap.js');
require('../src/t.graph.js');
require('../src/t.graph.weighted.js');
require('../src/t.unionfind.js');
require('../src/x.math.stats.js');
require('../src/x.math.vector.js');

require('../src/list.js');
require('../src/sorting.js');
require('../src/sorting.mergeSort.js');
require('../src/sorting.quickSort.js');
require('../src/graph.cut.js');
require('../src/graph.search.js');
require('../src/graph.path.js');

var should = require('should');

test = (message, fn) => describe(message, fn);
strictEqual = (actual, expected, message) => it(message || 'N/A', () => should(actual).equal(expected));
deepEqual = (actual, expected, message) => it(message || 'N/A', () => should(actual).eql(expected));
ok = (actual, message) => it(message || 'N/A', () => (actual).should.be.ok);
throws = (fn, message) =>it(message || 'N/A', () => (fn).should.throw());