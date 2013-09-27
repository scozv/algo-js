test('Test on QuickFind', function () {
	'use strict'
	
	var find = new UnionFind.QuickFind(10);
	strictEqual(find.count(), 10, 'constructor of quick find');
	ok(!find.connected(1, 2), '!connected(1, 2)');
	find.union(1, 3);
	find.union(7, 2);
	find.union(9, 3);
	ok(find.connected(1, 9), 'connected(1, 9)');
	deepEqual(find._id, [0, 3, 2, 3, 4, 5, 6, 2, 8, 3], 'inner list okay')
});

test('Test on WeightedQuickUnion', function () {
	'use strict'
	
	var find = new UnionFind.WeightedQuickUnion(10);
	strictEqual(find.count(), 10, 'constructor of quick find');
	ok(!find.connected(1, 2), '!connected(1, 2)');
	find.union(1, 3);
	find.union(7, 2);
	find.union(9, 3);
	ok(find.connected(1, 9), 'connected(1, 9)');
	// deepEqual(find._id, [0, 3, 2, 3, 4, 5, 6, 2, 8, 3], 'inner list okay')
});