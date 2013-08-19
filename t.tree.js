(function(type, undefined){
	var _node = function(elem){
		this.elem = elem;
		// The height of a node is the length of the longest downward path to a leaf from that node. 
		// The depth of a node is the length of the path to its root (i.e., its root path)
		// The root node has depth zero, leaf nodes have height zero
		this.height = 0;
		this.depth = 0;
		// the addresses of all children of this
		// in binary tree, the length of this.children is 2
		// that is [leftChildAddress, righChildAddress]
		this.children = [];
	};

	var _tree = function(degree){
		if (isNaN(degree = +degree)) {
			throw new Error(T.ERROR.INVALID_NUMERIC_VALUE);
		} else {
			this.__root__ = null;
			this.__count__ = 0;
			// the degree of this tree must >= max{eachNode.children.length}
			Object.defineProperty(this, '__degree__', {writable: false, value: degree});
		}
	};

	$t = _tree.prototype;

	$t.height = function(){
			// The height of the root is the height of the tree.
			// an empty tree (tree with no nodes, if such are allowed) has depth and height −1.
			if (this.__root__){return this.__root__.height;}
			else {return -1;}
	};

	$t.degree = function(){
			return this.__degree__;
	};

	$t.size = function(){return this.__count__;};

		// ***** private members *****

	$t.__insertBelowAt__ = function(elem, node, index){
			var child = new _node(elem);

			if (node){
				// assert(index < this.degree)
				node.children = node.children || [];
				node.children[index] = child;
			} else {
				this.__root__ = (node = child);
			}

			this.__count__ ++;

			return node;
	};

	type.BinarySearchTree = (function(_super){
		T.__x__(me, _super);

		function me(){
			_super.call(this, 2);
		}

		return me;
	})(_tree);

	$bst = type.BinarySearchTree.prototype;

	$bst.search = function(elem){
			// search elem in this tree, returns node which contains elem, or null if not exsits
			var current = this.__root__;
			while (current){
				if (elem === current.elem) {return current;}
				else if (elem < current.elem) {
					// left for smaller
					current = current.children && current.children[0];
				}
				else {
					current = current.children && current.children[1];
				}
			}

			return null;
	};
}(window.T = window.T || {}));