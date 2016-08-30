var algo = require('../bundle').default;
var MinHeap = algo.type.MinHeap;
var MaxHeap = algo.type.MaxHeap;
var should = require('should');

describe('T.MinHeap', function(){
  "use strict";

  it('Empty heap is empty', function() {
    var h = new MinHeap();
    (h.isEmpty).should.be.true();
    (h.size).should.be.equal(0);
  });

  it('heap [1]', function() {
    var h = new MinHeap();
    h.push(1);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(1);
    (h.peek()).should.be.equal(1);
  });

  it('heap [1, 2]', function() {
    var h = new MinHeap();
    h.push(1);
    h.push(2);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(2);
    (h.peek()).should.be.equal(1);
  });

  it('heap [1, 2, 0]', function() {
    var h = new MinHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(3);
    (h.peek()).should.be.equal(0);
  });

  it('heap [1, 2, 0, 7]', function() {
    var h = new MinHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(4);
    (h.peek()).should.be.equal(0);
  });

  it('heap [1, 2, 0, 7, 3, 4]', function() {
    var h = new MinHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    h.push(3);
    h.push(4);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(6);
    (h.peek()).should.be.equal(0);
  });

  it('heap [1, 2, 0, 7, 3, 4] pop', function() {
    var h = new MinHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    h.push(3);
    h.push(4);
    (h.pop()).should.be.equal(0);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(5);
    (h.peek()).should.be.equal(1);

    (h.pop()).should.be.equal(1);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(4);
    (h.peek()).should.be.equal(2);

    (h.pop()).should.be.equal(2);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(3);
    (h.peek()).should.be.equal(3);
  });

});

describe('T.MaxHeap', function(){
  "use strict";

  it('Empty heap is empty', function() {
    var h = new MaxHeap();
    (h.isEmpty).should.be.true();
    (h.size).should.be.equal(0);
  });

  it('heap [1]', function() {
    var h = new MaxHeap();
    h.push(1);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(1);
    (h.peek()).should.be.equal(1);
  });

  it('heap [1, 2]', function() {
    var h = new MaxHeap();
    h.push(1);
    h.push(2);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(2);
    (h.peek()).should.be.equal(2);
  });

  it('heap [1, 2, 0]', function() {
    var h = new MaxHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(3);
    (h.peek()).should.be.equal(2);
  });

  it('heap [1, 2, 0, 7]', function() {
    var h = new MaxHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(4);
    (h.peek()).should.be.equal(7);
  });

  it('heap [1, 2, 0, 7, 3, 4]', function() {
    var h = new MaxHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    h.push(3);
    h.push(4);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(6);
    (h.peek()).should.be.equal(7);
  });

  it('heap [1, 2, 0, 7, 3, 4] pop', function() {
    var h = new MaxHeap();
    h.push(1);
    h.push(2);
    h.push(0);
    h.push(7);
    h.push(3);
    h.push(4);
    (h.pop()).should.be.equal(7);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(5);
    (h.peek()).should.be.equal(4);

    (h.pop()).should.be.equal(4);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(4);
    (h.peek()).should.be.equal(3);

    (h.pop()).should.be.equal(3);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(3);
    (h.peek()).should.be.equal(2);
  });

});

describe('MinHeap.update test', function(){
  "use strict";

  // for each item in frontier
  // [v0, length]
  var compare = function(x, y){return x[1] - y[1];};

  it('frontier construction', function(){
    var f = new MinHeap(compare);

    (f.isEmpty).should.be.true();
    (f.size).should.equal(0);
  });

  it('heap [{1, 2}]', function(){
    var f = new MinHeap(compare);
    f.push([1, 2]);

    (f.isEmpty).should.be.false();
    (f.size).should.equal(1);
    (f.peek()).should.eql([1, 2]);
  });

  it('heap [{1, 2}, {2, 7}]', function(){
    var f = new MinHeap(compare);
    f.push([1, 2]);
    f.push([2, 7]);

    (f.isEmpty).should.be.false();
    (f.size).should.equal(2);
    (f.peek()).should.eql([1, 2]);
  });

  it('heap [{1, 2}, {2, 7}, {3, 4}]', function(){
    var f = new MinHeap(compare);
    f.push([1, 2]);
    f.push([2, 7]);
    f.push([3, 4]);

    (f.isEmpty).should.be.false();
    (f.size).should.equal(3);
    (f.peek()).should.eql([1, 2]);
  });

  it('heap [2, 7, 4, 1]', function() {
    var h = new MinHeap();
    h.push(2);
    h.push(7);
    h.push(4);
    h.push(1);
    (h.isEmpty).should.be.false();
    (h.size).should.be.equal(4);
    (h.peek()).should.be.equal(1);
  });

  it('heap [{1, 2}, {2, 7}, {3, 4}, {4, 1}]', function(){
    var f = new MinHeap(compare);
    f.push([1, 2]);
    f.push([2, 7]);
    f.push([3, 4]);
    f.push([4, 1]);

    (f.isEmpty).should.be.false();
    (f.size).should.equal(4);
    (f.peek()).should.eql([4, 1]);
  });
});