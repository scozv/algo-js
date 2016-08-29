window = global;

// require('../src/index.js')
// require('../src/x.array.js');
// require('../src/index.js');
// require('../src/LinkedList.js');
// require('../src/Stack.js');
// require('../src/Queue.js');
// require('../src/Tree.js');
// require('../src/Heap.js');
// require('../src/graph.js');
// require('../src/WeightedGraph.js');
// require('../src/UnionFind.js');
// require('../src/Stats.js');
// require('../src/Vector.js');
//
// require('../src/list.js');
// require('../src/index.js');
// require('../src/mergeSort.js');
// require('../src/quickSort.js');
// require('../src/cut.js');
// require('../src/search.js');
// require('../src/path.js');

window.should = require('should');
window.test = (message, fn) => describe(message, fn);
window.strictEqual = (actual, expected, message) => it(message || 'N/A', () => (actual).should.equal(expected));
window.deepEqual = (actual, expected, message) => it(message || 'N/A', () => (actual).should.eql(expected));
window.ok = (actual, message) => it(message || 'N/A', () => (actual).should.be.ok);
window.throws = (fn, message) =>it(message || 'N/A', () => (fn).should.throw());