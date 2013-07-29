(function(type, undefined){
	var Node = function(elem){
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

	type.Tree = function(degree){
		if (degree && ((+degree) === degree)) {
			this.__root__ = null;
			// the degree of this tree must >= max{eachNode.children.length}
			this.__degree__ = degree;
		} else {
			throw new Error('invalid degree number');
		}
	};

	type.Tree.prototype = {
		height: function(){
			// The height of the root is the height of the tree.
			// an empty tree (tree with no nodes, if such are allowed) has depth and height −1.
			if (this.__root__){return this.__root__.height;}
			else {return -1;}
		},

		degree: function(){
			return this.__degree__;
		},

		// ***** private members *****

		__insertBelowAt__: function(elem, node, index){
			var child = new Node(elem);

			if (node){
				// assert(index < this.degree)
				node.children = node.children || [];
				node.children[index] = child;
			} else {
				this.__root__ = (node = child);
			}

			return node;
		}
	};
}(window.T = window.T || {}));

/*
T.Tree:
__insertBelowAt__(elem, node, index): Node
insert elem below node at child index in children, return node
*/