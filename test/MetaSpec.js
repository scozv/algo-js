var algo = require('../bundle').default;
var should = require('should');
var p = function(o, ps){
  "use strict";

  (o).should.have.properties(ps);
};

// https://scozv.github.io/algo-wiki/en/

describe('Meta test', function(){
  "use strict";

  it('algo namaspace', function(){
    p(algo, ['type', 'math', 'linear', 'sorting', 'graph']);
  });

  it('algo.type constructor', function(){
    p(algo.type, [
      'LinkedList', 'Stack', 'Queue', 'MinHeap', 'MaxHeap',
      'QuickFind', 'WeightedQuickUnion',
      'BinarySearchTree', 'Graph', 'GraphW']);
  });
});