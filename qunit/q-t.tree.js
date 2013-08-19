test('Tree, BST', function(){
	var bst1 = new T.BinarySearchTree();
	ok(!!(bst1 && 
		bst1.__degree__ == 2 && 
		(bst1.__root__ === null) && 
		(bst1.__count__ === 0) &&
		(bst1.size() === 0) &&
		(bst1.search(5) === null)), 'basic properties of BST');
});