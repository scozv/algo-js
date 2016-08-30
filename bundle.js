module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _type = __webpack_require__(1);

	var _type2 = _interopRequireDefault(_type);

	var _sorting = __webpack_require__(21);

	var _sorting2 = _interopRequireDefault(_sorting);

	var _linear = __webpack_require__(10);

	var _linear2 = _interopRequireDefault(_linear);

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	var _graph = __webpack_require__(24);

	var _graph2 = _interopRequireDefault(_graph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  type: _type2.default,
	  sorting: _sorting2.default,
	  linear: _linear2.default,
	  math: _math2.default,
	  graph: _graph2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	var _TRAVERSAL = __webpack_require__(3);

	var _TRAVERSAL2 = _interopRequireDefault(_TRAVERSAL);

	var _LinkedList = __webpack_require__(4);

	var _LinkedList2 = _interopRequireDefault(_LinkedList);

	var _Queue = __webpack_require__(5);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _Stack = __webpack_require__(6);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _Heap = __webpack_require__(7);

	var _Tree = __webpack_require__(13);

	var _UnionFind = __webpack_require__(14);

	var _Graph = __webpack_require__(19);

	var _Graph2 = _interopRequireDefault(_Graph);

	var _WeightedGraph = __webpack_require__(20);

	var _WeightedGraph2 = _interopRequireDefault(_WeightedGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function __x__(d, b) {
	  // inspired from http://www.typescriptlang.org/Playground/
	  for (var p in b) {
	    if (b.hasOwnProperty(p)) d[p] = b[p];
	  }function __() {
	    this.constructor = d;
	  }

	  __.prototype = b.prototype;
	  d.prototype = new __();
	}

	exports.default = {
	  ERROR: _ERROR2.default,
	  TRAVERSAL: _TRAVERSAL2.default,
	  LinkedList: _LinkedList2.default,
	  Queue: _Queue2.default, Stack: _Stack2.default,
	  MinHeap: _Heap.MinHeap, MaxHeap: _Heap.MaxHeap,
	  BinarySearchTree: _Tree.BinarySearchTree,
	  QuickFind: _UnionFind.QuickFind, WeightedQuickUnion: _UnionFind.WeightedQuickUnion,
	  Graph: _Graph2.default, GraphW: _WeightedGraph2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ERROR = {
	  INVALID_EMPTY_COL_ACTION: 'invalid action on an empty collection',
	  INVALID_NUMERIC_VALUE: 'invalid numeric value has been passed',
	  INVALID_GRAPH_ACTION: 'invalid action on this graph, check it is directed or not'
	};

	exports.default = ERROR;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TRAVERSAL = {
	  PRE_ORDER: 0,
	  IN_ORDER: 1,
	  POST_ORDER: 2
	};

	exports.default = TRAVERSAL;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _node = function _node(elem) {
	  var nextNode = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  _classCallCheck(this, _node);

	  this.elem = elem;
	  this.next = nextNode;
	};

	var LinkedList = function () {
	  function LinkedList() {
	    _classCallCheck(this, LinkedList);

	    this.__header__ = new _node('H');
	    this.__rear__ = this.__header__;
	    this.__length__ = 0;
	  }

	  _createClass(LinkedList, [{
	    key: '__insertAfter__',
	    value: function __insertAfter__(elem, node) {
	      // insert elem after the node
	      if (node) {
	        var x = new _node(elem);
	        x.next = node.next;
	        node.next = x;
	        this.__length__++;

	        if (this.__rear__ == node) {
	          this.__rear__ = node.next;
	        }
	      }
	    }
	  }, {
	    key: '__removeNext__',
	    value: function __removeNext__(node) {
	      // remove the node after the args node
	      if (node && node.next) {
	        if (this.__rear__ == node.next) {
	          this.__rear__ = node;
	        }

	        var current = node.next;
	        node.next = current.next;

	        current.next = null;
	        current = null;
	        // delete (current);
	        // http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=delete#delete

	        this.__length__--;
	      }
	    }
	  }, {
	    key: 'insert',
	    value: function insert(elem, i) {
	      var current = this.__header__,
	          j = 0;
	      while ( /*i < this.length && */current.next && j <= i) {
	        current = current.next;
	        j++;
	      }
	      this.__insertAfter__(elem, current);
	    }
	  }, {
	    key: 'push',
	    value: function push(elem) {
	      this.__insertAfter__(elem, this.__rear__);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(elem) {
	      var parent = this.__header__;
	      while (parent.next && parent.next.elem != elem) {
	        parent = parent.next;
	      }

	      if (parent.next) {
	        this.__removeNext__(parent);
	      }
	    }
	  }, {
	    key: 'reverse',
	    value: function reverse() {
	      // iff we have at least 2 elements in this, then we rev it.
	      if (this.__length__ > 1) {
	        var p = this.__header__.next,
	            q = p.next;

	        while (q) {
	          p.next = q.next;
	          q.next = this.__header__.next;
	          this.__header__.next = q;
	          // move the point
	          q = p.next;
	        }

	        this.__rear__ = p;
	      }
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(fn) {
	      fn = fn || function (x) {
	        x;
	      };
	      var current = this.__header__.next;

	      while (current) {
	        fn(current.elem);
	        current = current.next;
	      }
	    }
	  }, {
	    key: 'map',
	    value: function map(fn) {
	      fn = fn || function (x) {
	        return x;
	      };
	      var arr = [],
	          i = 0;
	      this.forEach(function (x) {
	        arr[i++] = fn(x);
	      });

	      return arr;
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray() {
	      return this.map();
	    }
	  }, {
	    key: 'isEmpty',
	    get: function get() {
	      return this.__rear__ === this.__header__;
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.__length__;
	    }
	  }]);

	  return LinkedList;
	}();

	exports.default = LinkedList;

	// type.LinkedList.merge = function(lst1, lst2){
	// 	var h1 = lst1.__header__.next,
	// 		h2 = lst2.__header__.next,
	// 		current;

	// 	while (h1 && h2){
	// 		if (h1.elem < h2.elem) {
	// 			current = h1.next;
	// 			h1.next = h2;
	// 			h1 = current;
	// 		} else {
	// 			current = h2.next;
	// 			h2.next = h1;
	// 			h2 = current;
	// 		}
	// 	}
	// };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LinkedList = __webpack_require__(4);

	var _LinkedList2 = _interopRequireDefault(_LinkedList);

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Queue = function () {
	  function Queue() {
	    _classCallCheck(this, Queue);

	    this.__innerList__ = new _LinkedList2.default();
	  }

	  _createClass(Queue, [{
	    key: 'enqueue',
	    value: function enqueue(item) {
	      this.__innerList__.push(item);
	    }
	  }, {
	    key: 'peek',
	    value: function peek() {
	      if (this.__innerList__.isEmpty) {
	        throw new Error(_ERROR2.default.INVALID_EMPTY_COL_ACTION);
	      }

	      return this.__innerList__.__header__.next.elem;
	    }
	  }, {
	    key: 'dequeue',
	    value: function dequeue() {
	      var item = this.peek(),
	          _lst = this.__innerList__;
	      _lst.__removeNext__(_lst.__header__);
	      return item;
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(fn) {
	      this.__innerList__.forEach(fn);
	    }
	  }, {
	    key: 'map',
	    value: function map(fn) {
	      return this.__innerList__.map(fn);
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray() {
	      return this.__innerList__.toArray();
	    }
	  }, {
	    key: 'isEmpty',
	    get: function get() {
	      return this.__innerList__.isEmpty;
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.__innerList__.size;
	    }
	  }]);

	  return Queue;
	}();

	exports.default = Queue;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stack = function () {
	  function Stack() {
	    _classCallCheck(this, Stack);

	    this.__length__ = 0;
	    this.__innerList__ = [];
	  }

	  _createClass(Stack, [{
	    key: 'push',
	    value: function push(item) {
	      this.__innerList__[this.__length__] = item;
	      this.__length__++;
	    }
	  }, {
	    key: 'peek',
	    value: function peek() {
	      if (this.isEmpty) {
	        throw new Error(_ERROR2.default.INVALID_EMPTY_COL_ACTION);
	      }

	      return this.__innerList__[this.__length__ - 1];
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      // peek the value, and delete it
	      // actually, we do not delete it immediately
	      var item = this.peek();
	      this.__length__--;
	      return item;
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(fn) {
	      fn = fn || function (x) {
	        return x;
	      };
	      var i = this.__length__ - 1;
	      for (; i >= 0; i--) {
	        fn(this.__innerList__[i]);
	      }
	    }
	  }, {
	    key: 'map',
	    value: function map(fn) {
	      fn = fn || function (x) {
	        return x;
	      };
	      var arr = [],
	          i = 0;
	      this.forEach(function (x) {
	        arr[i++] = fn(x);
	      });

	      return arr;
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray() {
	      return this.map();
	    }
	  }, {
	    key: 'isEmpty',
	    get: function get() {
	      return this.__length__ == 0;
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.__length__;
	    }
	  }]);

	  return Stack;
	}();

	exports.default = Stack;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MinHeap = exports.MaxHeap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _internal = __webpack_require__(8);

	var _linear = __webpack_require__(10);

	var _linear2 = _interopRequireDefault(_linear);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Heap = function () {
	  function Heap(compare) {
	    _classCallCheck(this, Heap);

	    // inspired by alg4p1's implementation
	    this.__id__ = [-1];
	    this.__count__ = 0;

	    this.__compare__ = (0, _internal.__compareOrDefault__)(compare);
	  }

	  _createClass(Heap, [{
	    key: '__swim__',


	    // exchange child with parent, until _heap is ordered
	    value: function __swim__(k) {
	      var id = this.__id__,
	          cp = this.__compare__;

	      while (k > 1 && cp(id[k], id[k >> 1]) < 0) {
	        _linear2.default.array.swap(id, k, k >> 1);
	        k >>= 1;
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(x) {
	      this.__id__[++this.__count__] = x;
	      this.__swim__(this.__count__);
	      return this.__count__;
	    }

	    // exchange parent with larger child for max_heap or smaller child for min_heap, until _heap is ordered

	  }, {
	    key: '__sink__',
	    value: function __sink__(k) {
	      var id = this.__id__,
	          cp = this.__compare__,
	          ct = this.__count__,
	          j;
	      while (k << 1 <= ct) {
	        j = k << 1;
	        if (j < ct && cp(id[j + 1], id[j]) < 0) {
	          j++;
	        }
	        if (cp(id[j], id[k]) < 0) {
	          _linear2.default.array.swap(id, k, j);
	          k = j;
	        } else {
	          break;
	        }
	      }
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      if (this.size <= 0) {
	        throw new Error('empty _heap now.');
	      }

	      var res = this.__id__[1];
	      _linear2.default.array.swap(this.__id__, 1, this.__count__--);
	      this.__sink__(1);
	      this.__id__[this.__count__ + 1] = undefined;
	      return res;
	    }
	  }, {
	    key: 'peek',
	    value: function peek() {
	      if (this.size <= 0) {
	        throw new Error('empty _heap now.');
	      }

	      return this.__id__[1];
	    }
	  }, {
	    key: '__toArray__',
	    value: function __toArray__() {
	      console.warn('this heap has been destroyed by pop to empty');
	      var arr = [];
	      while (!this.isEmpty) {
	        arr.push(this.pop());
	      }

	      return arr;
	    }
	  }, {
	    key: 'isEmpty',
	    get: function get() {
	      return this.size <= 0;
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.__count__;
	    }
	  }]);

	  return Heap;
	}();

	var MaxHeap = exports.MaxHeap = function (_Heap) {
	  _inherits(MaxHeap, _Heap);

	  function MaxHeap() {
	    _classCallCheck(this, MaxHeap);

	    return _possibleConstructorReturn(this, (MaxHeap.__proto__ || Object.getPrototypeOf(MaxHeap)).call(this, function (x, y) {
	      return y - x;
	    }));
	  }

	  return MaxHeap;
	}(Heap);

	var MinHeap = exports.MinHeap = function (_Heap2) {
	  _inherits(MinHeap, _Heap2);

	  function MinHeap(compare) {
	    _classCallCheck(this, MinHeap);

	    return _possibleConstructorReturn(this, (MinHeap.__proto__ || Object.getPrototypeOf(MinHeap)).call(this, compare));
	  }

	  _createClass(MinHeap, [{
	    key: 'update',
	    value: function update(indexWhen, updateWhen, updateHow) {
	      var heap = this,
	          updated = this.__id__.some(function (x, i) {
	        return i <= heap.__count__ && x && indexWhen(x) && (function () {
	          if (updateWhen(x)) {
	            updateHow(x);
	            heap.__swim__(i);
	          }
	        }(), true);
	      });

	      return updated;
	    }
	  }]);

	  return MinHeap;
	}(Heap);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.__compareOrDefault__ = __compareOrDefault__;
	exports.__randomUniqueArray__ = __randomUniqueArray__;

	var _array = __webpack_require__(9);

	var _array2 = _interopRequireDefault(_array);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function __compareOrDefault__(compare) {
	  return compare && typeof compare === 'function' ? compare : function (x, y) {
	    return x - y;
	  };
	}

	function __randomUniqueArray__(length) {
	  /// <summary>gets an array of such length, each unique integer element in [0, length].</summary>

	  var arr = [],
	      i;
	  for (i = 0; i < length; i++) {
	    arr[i] = i;
	  }

	  // Knuth shuffle
	  var j = -1;
	  for (i = length - 1; i > 0; i--) {
	    // math.r in [0, 1), we need j in [0, i]
	    j = Math.floor(Math.random() * (i + 1));
	    _array2.default.swap(arr, i, j);
	  }

	  return arr;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function zip(arr1, arr2) {
	  var arr = [],
	      n = Math.min(arr1.length, arr2.length),
	      i;
	  for (i = 0; i < n; i++) {
	    arr.push([arr1[i], arr2[i]]);
	  }
	  return arr;
	}

	function swap(arr, i, j) {
	  i %= arr.length;
	  j %= arr.length;

	  var swap = arr[i];
	  arr[i] = arr[j];
	  arr[j] = swap;
	}

	var take = function take(arr, n) {
	  var result = [];
	  for (var i = 0; i < arr.length && i < n; i++) {
	    result.push(arr[i]);
	  }

	  return result;
	};

	var skip = function skip(arr, n) {
	  var result = [];
	  for (var i = n; i < arr.length; i++) {
	    result.push(arr[i]);
	  }

	  return result;
	};

	// update or insert item of array, array will be changed
	var upsert = function upsert(arr, item, where, how) {
	  return update(arr, item, where, how, true);
	};

	// update item of array, array will be changed
	var update = function update(arr, item, where, how, upsert) {
	  var itemKey = where && where(item) || item,
	      updated = false;
	  /// insert = insert && true;

	  // find the item in array by where-function
	  for (var i = 0; i < arr.length; i++) {
	    var x = arr[i];
	    if (where(x) === itemKey) {
	      // find it and update it
	      updated = true;
	      arr[i] = how(x, item);
	    }
	  }

	  if (!updated && upsert) {
	    arr.push(item);
	  }

	  return arr;
	};

	exports.default = {
	  zip: zip,
	  swap: swap,
	  take: take,
	  skip: skip,
	  upsert: upsert,
	  update: update
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _array = __webpack_require__(9);

	var _array2 = _interopRequireDefault(_array);

	var _list = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  array: _array2.default,
	  validPopStackSeries: _list.validPopStackSeries,
	  medianMaintenence: _list.medianMaintenence,
	  minimumWeightedCompletion: _list.minimumWeightedCompletion
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.minimumWeightedCompletion = exports.medianMaintenence = exports.validPopStackSeries = undefined;

	var _quickSort = __webpack_require__(12);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	var _Stack = __webpack_require__(6);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _Heap = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validPopStackSeries = exports.validPopStackSeries = function validPopStackSeries(pushArray, popArray) {
	  // if we push [1, 2, 3, 4] one by one,
	  // can we get the series [2, 3, 4, 1] by poping after certain push?
	  var st = new _Stack2.default(),
	      j = 0;
	  pushArray.forEach(function (x) {
	    st.push(x);
	    while (!st.isEmpty && st.peek() == popArray[j]) {
	      st.pop();
	      j++;
	    }
	  });

	  return st.isEmpty;
	};

	var medianMaintenence = exports.medianMaintenence = function medianMaintenence(arr) {
	  // [MaxHeap, max], media ,[min, MinHeap]

	  var min = new _Heap.MinHeap(),
	      max = new _Heap.MaxHeap(),
	      media = [];

	  arr.forEach(function (x) {
	    if (min.size === max.size) {
	      if (!max.isEmpty && x > max.peek()) {
	        min.push(x);
	        max.push(min.pop());
	      } else {
	        max.push(x);
	      }
	    } else {
	      // we always keep max.size - min.size \in [0, 1]
	      if (x > max.peek()) {
	        min.push(x);
	      } else {
	        max.push(x);
	        min.push(max.pop());
	      }
	    }

	    media.push(max.peek());
	  });

	  return media;
	};

	var minimumWeightedCompletion = exports.minimumWeightedCompletion = function minimumWeightedCompletion(arr, fn) {
	  // for each x in arr, x[0], x[1] = weight, length
	  fn = fn || function (x, y) {
	    return y[0] / y[1] - x[0] / x[1];
	  };

	  var c = 0,
	      s = 0;
	  (0, _quickSort2.default)(arr, fn).forEach(function (x) {
	    c += x[1];
	    s += x[0] * c;
	  });

	  return s;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = quickSort;

	var _internal = __webpack_require__(8);

	var _array = __webpack_require__(9);

	var _array2 = _interopRequireDefault(_array);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _partition(arr, l, r, compare) {
	  var i = l,
	      j = r + 1;

	  while (true) {
	    while (compare(arr[++i], arr[l]) < 0) {
	      if (i == r) {
	        break;
	      }
	    }

	    while (compare(arr[l], arr[--j]) < 0) {
	      if (j == l) {
	        break;
	      }
	    }

	    if (i >= j) {
	      break;
	    }
	    _array2.default.swap(arr, i, j);
	  }

	  _array2.default.swap(arr, l, j);
	  return j;
	}

	function _quickSort(arr, l, r, compare) {
	  /// <summary>quick sort the arr, during the range from index l to r, inclusive.</summary>

	  // base case
	  if (r >= arr.length) {
	    r = arr.length - 1;
	  }

	  if (l >= r) {
	    return;
	  }

	  var j = _partition(arr, l, r, compare);

	  // recursive calls
	  _quickSort(arr, l, j - 1, compare);
	  _quickSort(arr, j + 1, r, compare);
	}

	function quickSort(arr, compare, skipClone) {
	  // default order by asc
	  compare = (0, _internal.__compareOrDefault__)(compare);

	  var arrCopy = skipClone === true ? arr : [].concat(_toConsumableArray(arr));

	  _quickSort(arrCopy, 0, arrCopy.length - 1, compare);

	  return arrCopy;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BinarySearchTree = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	var _TRAVERSAL = __webpack_require__(3);

	var _TRAVERSAL2 = _interopRequireDefault(_TRAVERSAL);

	var _internal = __webpack_require__(8);

	var _Stack = __webpack_require__(6);

	var _Stack2 = _interopRequireDefault(_Stack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _node = function _node(elem) {
	  _classCallCheck(this, _node);

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

	var _tree = function () {
	  function _tree(degree) {
	    _classCallCheck(this, _tree);

	    if (isNaN(degree = +degree)) {
	      throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	    } else {
	      this.__root__ = null;
	      this.__count__ = 0;
	      // the degree of this tree must >= max{eachNode.children.length}
	      Object.defineProperty(this, '__degree__', { writable: false, value: degree });
	    }
	  }

	  _createClass(_tree, [{
	    key: '__insertBelowAt__',


	    // ***** private members *****

	    value: function __insertBelowAt__(elem, node, index) {
	      var child = new _node(elem);

	      if (node) {
	        // assert(index < this.degree)
	        node.children = node.children || [];
	        node.children[index] = child;
	      } else {
	        this.__root__ = node = child;
	      }

	      this.__count__++;

	      return node;
	    }
	  }, {
	    key: 'height',
	    get: function get() {
	      // The height of the root is the height of the tree.
	      // an empty tree (tree with no nodes, if such are allowed) has depth and height -1.
	      return this.__root__ ? this.__root__.height : -1;
	    }
	  }, {
	    key: 'degree',
	    get: function get() {
	      return this.__degree__;
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.__count__;
	    }
	  }]);

	  return _tree;
	}();

	var BinarySearchTree = exports.BinarySearchTree = function (_tree2) {
	  _inherits(BinarySearchTree, _tree2);

	  function BinarySearchTree(compare) {
	    _classCallCheck(this, BinarySearchTree);

	    var _this = _possibleConstructorReturn(this, (BinarySearchTree.__proto__ || Object.getPrototypeOf(BinarySearchTree)).call(this, 2));

	    _this.__compare__ = (0, _internal.__compareOrDefault__)(compare);
	    return _this;
	  }

	  _createClass(BinarySearchTree, [{
	    key: 'search',
	    value: function search(elem) {
	      // search elem in this tree, returns node which contains elem, or null if not exsits
	      var parent = this.__searchParent__(elem),
	          cp = this.__compare__;

	      // notice each of two paths of if-else
	      // if the value we return is null, means we cannot find elem,
	      // otherwise, the returned node is what we look for
	      if (!parent) {
	        return this.__root__;
	      } else {
	        return parent.children[cp(elem, parent.elem) < 0 ? 0 : 1];
	      }
	    }
	  }, {
	    key: 'rSearch',
	    value: function rSearch(elem) {
	      // recursive version of search
	      var cp = this.__compare__;

	      var f0 = function f0(node) {
	        var c;

	        if (!node || (c = cp(elem, node.elem)) === 0) {
	          return node;
	        } else {
	          return f0(node.children[c < 0 ? 0 : 1]);
	        }
	      };

	      return f0(this.__root__);
	    }
	  }, {
	    key: '__searchParent__',
	    value: function __searchParent__(elem) {
	      // gets the parent, one of whose children contains elem, so if
	      // p is null -> root is null OR root.elem == elem
	      // p.children[0 : 1] is null, we can insert elem under parent[0:1]
	      // p.children[0 : 1] is not null, that means p.children[0 : 1] === elem (elem has been there)
	      var cp = this.__compare__,
	          c,
	          parent = null,
	          current = this.__root__;

	      while (current && (c = cp(elem, current.elem)) !== 0) {
	        parent = current;
	        current = current.children && current.children[c < 0 ? 0 : 1];
	      }

	      return parent;
	    }
	  }, {
	    key: '__childOfParent__',
	    value: function __childOfParent__(elem, parent) {
	      // get a valid child of paraent, and the child.elem === elem

	      var cp = this.__compare__,
	          c = cp(elem, parent.elem),
	          i = c < 0 ? 0 : 1;
	      return c !== 0 && cp(elem, parent.children[i].elem) === 0 && parent.children[i];
	    }
	  }, {
	    key: 'insert',
	    value: function insert(elem) {
	      // inserts elem under BST order, no duplication

	      if (!this.__root__) {
	        this.__root__ = new _node(elem);
	        return;
	      }

	      var parent = this.__searchParent__(elem),
	          cp = this.__compare__,
	          i;

	      if (parent && !parent.children[i = cp(elem, parent.elem) < 0 ? 0 : 1]) {
	        parent.children[i] = new _node(elem);
	      }
	    }
	  }, {
	    key: 'rInsert',
	    value: function rInsert(elem) {
	      // recursive version of insert
	      var cp = this.__compare__;

	      var f0 = function f0(node) {
	        // assert(!node)
	        var c = cp(elem, node.elem),
	            i;
	        if (c !== 0) {
	          // 0 for left, 1 for right
	          i = c < 0 ? 0 : 1;

	          node.children[i] ? f0(node.children[i]) : node.children[i] = new _node(elem);
	        }
	      };

	      this.__root__ ? f0(this.__root__) : this.__root__ = new _node(elem);
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(traversal, fn) {
	      fn = fn && typeof fn === 'function' ? fn : function (x) {
	        return x;
	      };

	      var cp = this.__compare__;

	      // pre order
	      // inspired from http://www.geeksforgeeks.org/iterative-preorder-traversal/
	      var pre = function pre(node) {
	        if (node) {
	          var frontier = new _Stack2.default(),
	              current;

	          frontier.push(node);
	          while (!frontier.isEmpty) {
	            current = frontier.pop();
	            fn(current.elem);
	            current.children[1] ? frontier.push(current.children[1]) : null;
	            current.children[0] ? frontier.push(current.children[0]) : null;
	          }
	        }
	      };

	      // in order
	      // inspired from http://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
	      var ino = function ino(node) {
	        if (node) {
	          var frontier = new _Stack2.default(),
	              current = node;

	          while (current || !frontier.isEmpty) {
	            if (current) {
	              frontier.push(current);
	              current = current.children[0];
	            } else {
	              current = frontier.pop();
	              fn(current.elem);
	              current = current.children[1];
	            }
	          }
	        }
	      };

	      // post order
	      // inspired from http://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/
	      var pos = function pos(node) {
	        if (node) {
	          var frontier = new _Stack2.default(),
	              current = node;

	          do {
	            // Move to leftmost node
	            while (current) {
	              current.children[1] ? frontier.push(current.children[1]) : null;
	              frontier.push(current);
	              current = current.children[0];
	            }

	            current = frontier.pop();
	            // If the popped item has a right child and the right child is not
	            // processed yet, then make sure right child is processed before root
	            if (current.children[1] && !frontier.isEmpty && cp(frontier.peek().elem, current.children[1].elem) === 0) {
	              frontier.pop();
	              frontier.push(current);
	              current = current.children[1];
	            } else {
	              fn(current.elem);
	              current = null;
	            }
	          } while (!frontier.isEmpty);
	        }
	      };

	      switch (traversal) {
	        case _TRAVERSAL2.default.PRE_ORDER:
	          pre(this.__root__);
	          break;
	        case _TRAVERSAL2.default.POST_ORDER:
	          pos(this.__root__);
	          break;
	        default:
	          ino(this.__root__);
	          break;
	      }
	    }
	  }, {
	    key: 'rForEach',
	    value: function rForEach(traversal, fn) {
	      fn = fn && typeof fn === 'function' ? fn : function (x) {
	        return x;
	      };

	      // pre order
	      var pre = function pre(node) {
	        if (node) {
	          fn(node.elem);
	          pre(node.children[0]);
	          pre(node.children[1]);
	        }
	      };

	      // in order
	      var ino = function ino(node) {
	        if (node) {
	          ino(node.children[0]);
	          fn(node.elem);
	          ino(node.children[1]);
	        }
	      };

	      // post order
	      var pos = function pos(node) {
	        if (node) {
	          pos(node.children[0]);
	          pos(node.children[1]);
	          fn(node.elem);
	        }
	      };

	      switch (traversal) {
	        case _TRAVERSAL2.default.PRE_ORDER:
	          pre(this.__root__);
	          break;
	        case _TRAVERSAL2.default.POST_ORDER:
	          pos(this.__root__);
	          break;
	        default:
	          ino(this.__root__);
	          break;
	      }
	    }
	  }, {
	    key: 'map',
	    value: function map(traversal, fn) {
	      fn = fn && typeof fn === 'function' ? fn : function (x) {
	        return x;
	      };

	      var arr = [];
	      this.forEach(traversal, function (x) {
	        arr.push(fn(x));
	      });

	      return arr;
	    }
	  }, {
	    key: 'rMap',
	    value: function rMap(traversal, fn) {
	      fn = fn && typeof fn === 'function' ? fn : function (x) {
	        return x;
	      };

	      var arr = [];
	      this.rForEach(traversal, function (x) {
	        arr.push(fn(x));
	      });

	      return arr;
	    }
	  }]);

	  return BinarySearchTree;
	}(_tree);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WeightedQuickUnion = exports.QuickFind = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QuickFind = exports.QuickFind = function () {
	  function QuickFind(n) {
	    _classCallCheck(this, QuickFind);

	    this._count = n;
	    this._id = _math2.default.range(n);
	  }

	  _createClass(QuickFind, [{
	    key: 'count',
	    value: function count() {
	      return this._count;
	    }

	    // find parent of i

	  }, {
	    key: 'find',
	    value: function find(p) {
	      p = _math2.default.mod(p, this._id.length);
	      return this._id[p];
	    }
	  }, {
	    key: 'connected',
	    value: function connected(p, q) {
	      return this.find(p) === this.find(q);
	    }
	  }, {
	    key: 'union',
	    value: function union(p, q) {
	      var _ = this,
	          i = _.find(p),
	          j = _.find(q);

	      if (i !== j) {
	        _._id.forEach(function (x, k) {
	          _._id[k] = x === i ? j : x;
	        });

	        _._count--;
	      }

	      return _._count;
	    }
	  }]);

	  return QuickFind;
	}();

	var WeightedQuickUnion = exports.WeightedQuickUnion = function (_QuickFind) {
	  _inherits(WeightedQuickUnion, _QuickFind);

	  function WeightedQuickUnion(n) {
	    _classCallCheck(this, WeightedQuickUnion);

	    var _this = _possibleConstructorReturn(this, (WeightedQuickUnion.__proto__ || Object.getPrototypeOf(WeightedQuickUnion)).call(this, n));

	    _this._size = _math2.default.range(n).map(function (_) {
	      return 1;
	    });
	    return _this;
	  }

	  _createClass(WeightedQuickUnion, [{
	    key: 'find',
	    value: function find(p) {
	      p = _math2.default.mod(p, this._id.length);
	      while (p !== this._id[p]) {
	        p = this._id[p];
	      }

	      return p;
	    }
	  }, {
	    key: 'union',
	    value: function union(p, q) {
	      var _ = this,
	          i = this.find(p),
	          j = this.find(q);

	      if (i !== j) {
	        if (_._size[i] < _._size[j]) {
	          _._id[i] = j;
	          _._size[j] += _._size[i];
	        } else {
	          _._id[j] = i;
	          _._size[i] += _._size[j];
	        }

	        _._count--;
	      }

	      return _._count;
	    }
	  }]);

	  return WeightedQuickUnion;
	}(QuickFind);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _array = __webpack_require__(9);

	var _array2 = _interopRequireDefault(_array);

	var _Stats = __webpack_require__(16);

	var _Stats2 = _interopRequireDefault(_Stats);

	var _Point = __webpack_require__(17);

	var _Point2 = _interopRequireDefault(_Point);

	var _Vector = __webpack_require__(18);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EPSILON = Math.abs(1e-29);

	var mod = function mod(i, n) {
	  return equals(n, 0) ? NaN : i >= 0 ? i % n : mod(i + Math.ceil((0 - i) / n) * n, n);
	};

	function equals(x, y) {
	  var eq = false;

	  if (Array.isArray(x) && Array.isArray(y)) {
	    eq = x.length === y.length && _array2.default.zip(x, y).every(function (item) {
	      return equals(item[0], item[1]);
	    });
	  } else if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y))) {
	    eq = Math.abs(parseFloat(x) - parseFloat(y)) < EPSILON;
	  } else {
	    eq = false;
	  }

	  return eq;
	}

	function range(start, end, step) {
	  // gets a range [start, end) with step
	  var arr = [],
	      i;

	  if (arguments.length == 0) {
	    throw new Error('at least one argument.');
	  }

	  for (i = 0; i < arguments.length; i++) {
	    if (+arguments[i] !== arguments[i]) {
	      throw new Error('all of arguments should be number.');
	    }
	  }

	  if (arguments.length == 1) {
	    end = arguments[0];
	    start = 0;
	    step = 1;
	  } else if (arguments.length == 2) {
	    start = arguments[0];
	    end = arguments[1];
	    step = 1;
	  } else {
	    start = arguments[0];
	    end = arguments[1];
	    step = arguments[2];
	  }

	  if (isNaN(start = +start) || isNaN(end = +end) || isNaN(step = +step)) {
	    throw new Error('invalid number as parameter');
	  }

	  for (i = start; i < end; i += step) {
	    arr.push(i);
	  }

	  return arr;
	}

	function randomInteger(a, b) {
	  // return a random integer in [a=0, b]
	  var swap = 0;
	  if (arguments.length === 0) {
	    throw new Error('at least one parameter');
	  } else if (arguments.length === 1) {
	    b = a;
	    a = 0;
	  }

	  if (isNaN(a = +a) || isNaN(b = +b)) {
	    throw new Error('invalid number as parameter');
	  }

	  if (a > b) {
	    swap = a;
	    a = b;
	    b = swap;
	  }

	  return Math.floor(Math.random() * (b - a + 1)) + a;
	}

	function __timer__(fn) {
	  // stopwatch
	  var start = new Date().getTime();
	  fn();
	  var end = new Date().getTime();
	  return end - start;
	}

	exports.default = {
	  EPSILON: EPSILON,
	  mod: mod,
	  equals: equals,
	  range: range,
	  randomInteger: randomInteger,
	  __timer__: __timer__,
	  Stats: _Stats2.default,
	  Point: _Point2.default,
	  Vector: _Vector2.default
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var firstOrder = function firstOrder(arr, compare, acc) {
	  arr.forEach(function (x) {
	    if (compare(x, acc) < 0) {
	      acc = x;
	    }
	  });

	  return acc;
	};
	var max = function max(arr) {
	  return firstOrder(arr, function (x, y) {
	    return y - x;
	  }, Number.MIN_VALUE);
	};

	var min = function min(arr) {
	  return firstOrder(arr, function (x, y) {
	    return x - y;
	  }, Number.MAX_VALUE);
	};

	var sum = function sum(arr) {
	  return arr.reduce(function (acc, x) {
	    return x + acc;
	  }, 0.0);
	};

	var mean = function mean(arr) {
	  return sum(arr) / arr.length;
	};

	// sample variance
	function var0(arr) {
	  var avg = mean(arr);
	  return arr.reduce(function (acc, x) {
	    return (x - avg) * (x - avg);
	  }, 0.0) / (arr.length - 1);
	};

	var stddev = function stddev(arr) {
	  return Math.sqrt(var0(arr));
	};

	var normalize = function normalize(arr) {
	  return arr.map(function (x) {
	    return x / sum(arr);
	  });
	};

	var linearLeastSquare = function linearLeastSquare(arr1, arr2, fn) {
	  // require(arr1.length == arr2.length)
	  if (fn && typeof fn === 'function') {
	    arr1 = arr1.map(fn);
	    arr2 = arr2.map(fn);
	  }

	  var avg1 = mean(arr1);
	  var avg2 = mean(arr2);

	  var m = 0,
	      n = 0;
	  for (var i = 0; i < arr1.length; i++) {
	    m += (arr1[i] - avg1) * (arr2[i] - avg2);
	    n += (arr1[i] - avg1) * (arr1[i] - avg1);
	  }

	  return [m / n, avg2 - m / n * avg1];
	};

	exports.default = {
	  "var": var0,
	  max: max,
	  min: min,
	  sum: sum,
	  mean: mean,
	  stddev: stddev,
	  normalize: normalize,
	  linearLeastSquare: linearLeastSquare
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(18);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function () {
	  function Point(arr) {
	    _classCallCheck(this, Point);

	    if (!Array.isArray(arr)) {
	      throw new Error('invalid args, use array.');
	    }

	    this.dimension = arr.length;
	    this.coordinates = arr.map(function (x) {
	      return parseFloat(x);
	    });
	  }

	  _createClass(Point, [{
	    key: 'vector',
	    value: function vector(that) {
	      return new _Vector2.default(this, that);
	    }
	  }, {
	    key: 'polarCompare',
	    value: function polarCompare(p1, p2) {
	      return this.cos(p1) - this.cos(p2);
	    }
	  }]);

	  return Point;
	}();

	exports.default = Point;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----API
	// Point class and its members
	// new Math.Point(arr), a new Point initialized by its coordinates
	// this.vector(that), return a new vector build by this and that points
	// this.polarCompare(p1, p2), return the comparasion  for angle between <this, p1> and <this, p2>

	// Vector class and its members


	var _array = __webpack_require__(9);

	var _array2 = _interopRequireDefault(_array);

	var _Point = __webpack_require__(17);

	var _Point2 = _interopRequireDefault(_Point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = function () {
	  function Vector() {
	    _classCallCheck(this, Vector);

	    this.coordinates = [];
	    this.dimension = 0;
	    var x = 0,
	        i;
	    if (arguments.length == 1) {
	      // arg.length == 1, we build the vector by itselt
	      this.dimension = arguments[0].length;
	      this.coordinates = arguments[0].map(function (x) {
	        return parseFloat(x);
	      });
	    } else if (arguments.length == 2) {
	      var arg0 = arguments[0],
	          arg1 = arguments[1];

	      var fn = function fn(x) {
	        return parseFloat(x[1]) - parseFloat(x[0]);
	      };

	      // arg.length == 2, we build the vector by these two Points
	      if (Array.isArray(arg0) && Array.isArray(arg1) && arg0.length == arg1.length) {
	        this.coordinates = _array2.default.zip(arg0, arg1).map(fn);
	      } else if (arg0 instanceof _Point2.default && arg1 instanceof _Point2.default && arg0.dimension == arg1.dimension) {

	        this.coordinates = _array2.default.zip(arg0.coordinates, arg1.coordinates).map(fn);
	      } else {
	        throw new Error('unmathced args.');
	      }
	    } else {
	      throw new Error('invalid args.');
	    }
	  }

	  _createClass(Vector, [{
	    key: 'dot',
	    value: function dot(that) {
	      return Math.Vector.dot(this, that);
	    }
	  }, {
	    key: 'norm',
	    value: function norm() {
	      // gets the norm or length or magnitude of this vector
	      return Math.Vector.norm(this);
	    }
	  }, {
	    key: 'cos',
	    value: function cos(that) {
	      return Math.Vector.cos(this, that);
	    }
	  }], [{
	    key: 'dot',
	    value: function dot(v1, v2) {
	      return _array2.default.zip(v1.coordinates, v2.coordinates).reduce(function (acc, x) {
	        return acc + x[1] * x[0];
	      }, 0.0);
	    }
	  }, {
	    key: 'norm',
	    value: function norm(v) {
	      var squareSum = v.coordinates.reduce(function (acc, x) {
	        return acc + x * x;
	      }, 0.0);
	      return Math.sqrt(squareSum);
	    }
	  }, {
	    key: 'cos',
	    value: function cos(v1, v2) {
	      return Math.Vector.dot(v1, v2) / Math.Vector.norm(v1) / Math.Vector.norm(v2);
	    }
	  }]);

	  return Vector;
	}();

	exports.default = Vector;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graph = function () {
	  function Graph(n, directed) {
	    _classCallCheck(this, Graph);

	    if (isNaN(n = +n)) {
	      throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	    }

	    // gets a unweighted graph, dafualt is undirected graph
	    if (directed !== true) {
	      directed = false;
	    }

	    Object.defineProperty(this, 'n', { value: n, writable: false });
	    Object.defineProperty(this, '__directed__', { value: directed, writable: false });
	    Object.defineProperty(this, '__edgeListCache__', { value: [], writable: false });

	    // adgList format (each x in adgList): [v, [v1, v2, v3...]] = [label, [edgeVertexArray]]
	    // label can be used for marking visit info
	    this.__adjacencyList__ = [];
	    this.__v__ = 0;
	    this.__e__ = 0;
	  }

	  _createClass(Graph, [{
	    key: 'v',
	    value: function v() {
	      return this.__v__;
	    }
	  }, {
	    key: 'e',
	    value: function e() {
	      return this.__directed__ ? this.__e__ : this.__e__ >> 1;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var gh = new Graph(this.n, this.__directed__);
	      this.__adjacencyList__.forEach(function (x) {
	        // clone each x in format [v, []]
	        // TODO: warning the case in which we push v2 into an empty vertex
	        gh.__adjacencyList__[x[0]] = [x[0], [].concat(_toConsumableArray(x[1]))];
	      });

	      gh.__v__ = this.__v__;
	      gh.__e__ = this.__e__;

	      return gh;
	    }
	  }, {
	    key: 'toString',
	    value: function toString(verbose) {
	      if (verbose !== true) {
	        verbose = false;
	      }

	      var count = this.__count__(),
	          _g = this.__adjacencyList__,
	          str = ['Graph: #n = ' + String(this.n) + ', #v = ' + String(count[0]) + ', #e = ' + String(count[1])];

	      if (verbose) {
	        _g.filter(function (x) {
	          return x && x[0] && x[0] > 0;
	        }).forEach(function (x) {
	          str.push(x[0] + ': ' + x[1].filter(function (v) {
	            return v > 0;
	          }).join(' '));
	        });
	      }

	      return str.join('\n\r');
	    }
	  }, {
	    key: '__pushEdge__',
	    value: function __pushEdge__(v1, v2, bidirectional) {
	      /// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

	      if (isNaN(v1 = +v1) || isNaN(v2 = +v2)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;

	      if (!_g[v1]) {
	        _g[v1] = [v1, []];
	        this.__v__++;
	      }

	      _g[v1][1].push(v2);
	      this.__e__++;

	      if (!this.__directed__ && bidirectional) {
	        // if not directed, AND we force bidirectional pusing,
	        // then we push [v2, v1]
	        if (!_g[v2]) {
	          _g[v2] = [v2, []];
	          this.__v__++;
	        }

	        _g[v2][1].push(v1);
	        this.__e__++;
	      }
	    }
	  }, {
	    key: '__getEdgeList__',
	    value: function __getEdgeList__() {
	      var edges = this.__edgeListCache__;
	      if (edges && edges.length) {
	        return edges;
	      } else {
	        this.__adjacencyList__.forEach(function (x) {
	          x && x[1] && x[1].length && x[1].forEach(function (e) {
	            // push [u, v, w] if GraphW, else [u, v]
	            edges.push(e.length ? [x[0], e[0], e[1]] : [x[0], e]);
	          });
	        });
	        return edges;
	      }
	    }
	  }, {
	    key: '__edgesFrom__',
	    value: function __edgesFrom__(v) {
	      /// <summary>gets the edge sourceing from v.</summary>
	      if (isNaN(v = +v)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;

	      if (!_g[v]) {
	        _g[v] = [v, []];
	      }

	      return _g[v][1];
	    }
	  }, {
	    key: '__edgeAt__',
	    value: function __edgeAt__(k) {
	      /// <summary>gets a the k-th edge of graph, return the two endpoint. start from 0 as index</summary>

	      var _g = this.__adjacencyList__,
	          p = 0,
	          edge = [-1, -1];

	      _g.some(function (x) {
	        return x && x[0] && x[0] >= 0 && x[1].some(function (v) {
	          if (v >= 0 && p++ == k) {
	            edge = [x[0], v];
	            return true;
	          } else {
	            return false;
	          }
	        });
	      });

	      return edge;
	    }
	  }, {
	    key: '__count__',
	    value: function __count__() {
	      /// <summary>gets the number of vertex and edge.<summary>
	      /// <returns type="Array[2]">returns the number of vertex and edge in arr[0] and arr[1].</returns>

	      return [this.v(), this.e()];
	    }
	  }, {
	    key: '__visiableAt__',
	    value: function __visiableAt__(v) {
	      /// <summary>determins whether the v of graph is visiable for visiting or not.</summary>
	      if (isNaN(v = +v)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;
	      return _g[v] === undefined || _g[v] && _g[v][0] && _g[v][0] >= 0;
	    }
	  }, {
	    key: '__hasEdgesAt__',
	    value: function __hasEdgesAt__(v) {
	      /// <summary>determins whether graph has edge(s) sourcing from v or not.</summary>
	      if (isNaN(v = +v)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;
	      return _g[v] && _g[v][1] && _g[v][1].length;
	    }
	  }, {
	    key: '__labelAll__',
	    value: function __labelAll__(label) {
	      if (typeof label === 'string' || label === +label) {
	        var _g = this.__adjacencyList__;
	        _math2.default.range(1, this.n + 1).forEach(function (v) {
	          if (!_g[v]) {
	            _g[v] = [v, []];
	          }
	          _g[v][0] = label;
	        });
	      }
	    }
	  }, {
	    key: '__labelAt__',
	    value: function __labelAt__(v, label) {
	      /// <summary>marks the label to graph, v for its visited or not,
	      /// the default label is false, means we visits the vertex default.
	      /// </summary>
	      if (isNaN(v = +v)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;
	      if (!_g[v]) {
	        _g[v] = [v, []];
	      }

	      if (arguments.length > 1 || label !== undefined) {
	        _g[v][0] = label;
	      }

	      return _g[v][0];
	    }
	  }, {
	    key: '__visitAt__',
	    value: function __visitAt__(v) {
	      this.__labelAt__(v, -1);
	    }
	  }], [{
	    key: '__build__',
	    value: function __build__(lines) {
	      var gh, info, i, minCut, result;

	      lines.forEach(function (line, i) {
	        if (i === 0) {
	          gh = new Graph(+line, true);
	        } else {
	          info = line.split(' ').map(function (x) {
	            return +x.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	          }).filter(function (x) {
	            return x > 0;
	          });

	          gh.__pushEdge__(info[0], info[1]);
	        }
	      });

	      result = Graph.sccTarjan(gh);
	      console.log(result);

	      result = Graph.sccKosaraju(gh);
	      console.log(result);
	    }
	  }]);

	  return Graph;
	}();

	exports.default = Graph;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Graph2 = __webpack_require__(19);

	var _Graph3 = _interopRequireDefault(_Graph2);

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GraphW = function (_Graph) {
	  _inherits(GraphW, _Graph);

	  function GraphW(n, directed) {
	    _classCallCheck(this, GraphW);

	    return _possibleConstructorReturn(this, (GraphW.__proto__ || Object.getPrototypeOf(GraphW)).call(this, n, directed));
	  }

	  _createClass(GraphW, [{
	    key: 'clone',
	    value: function clone() {
	      var gh = new GraphW(this.n, this.__directed__);
	      this.__adjacencyList__.forEach(function (x) {
	        // clone each x in format [v, []]
	        // TODO: warning the case in which we push v2 into an empty vertex
	        gh.__adjacencyList__[x[0]] = [x[0], x[1].map(function (v) {
	          return [].concat(_toConsumableArray(v));
	        })];
	      });

	      gh.__v__ = this.__v__;
	      gh.__e__ = this.__e__;

	      return gh;
	    }
	  }, {
	    key: 'toString',
	    value: function toString(verbose) {
	      if (verbose !== true) {
	        verbose = false;
	      }

	      var count = this.__count__(),
	          _g = this.__adjacencyList__,
	          str = ['graph: #n = ' + String(this.n) + ', #v = ' + String(count[0]) + ', #e = ' + String(count[1])];

	      if (verbose) {
	        _g.filter(function (x) {
	          return x && x[0] && x[0] > 0;
	        }).forEach(function (x) {
	          str.push(x[0] + ': ' + x[1].filter(function (v) {
	            return v.length === 2;
	          }).map(function (v) {
	            return String(v[0]) + '(' + String(v[1]) + ')';
	          }).join(','));
	        });
	      }

	      return str.join('\n\r');
	    }
	  }, {
	    key: '__pushEdge__',
	    value: function __pushEdge__(v1, v2, w, bidirectional) {
	      /// <summary>pushes an edge into thisEdge graph from the v1 to v2.</summary>

	      if (isNaN(v1 = +v1) || isNaN(v2 = +v2)) {
	        throw new Error(_ERROR2.default.INVALID_NUMERIC_VALUE);
	      }

	      var _g = this.__adjacencyList__;

	      if (!_g[v1]) {
	        _g[v1] = [v1, []];
	        this.__v__++;
	      }

	      _g[v1][1].push([v2, w]);
	      this.__e__++;

	      if (!this.__directed__ && bidirectional) {
	        // if not directed, AND we force bidirectional pusing,
	        // then we push [v2, v1]
	        if (!_g[v2]) {
	          _g[v2] = [v2, []];
	          this.__v__++;
	        }

	        _g[v2][1].push([v1, w]);
	        this.__e__++;
	      }
	    }
	  }], [{
	    key: '__build__',
	    value: function __build__(lines) {
	      var gh, info, i, current, vm, result;

	      lines.forEach(function (line, i) {
	        if (i === 0) {
	          gh = new GraphW(+line.split(' ')[0]);
	        } else {
	          info = line.split(' ');
	          gh.__pushEdge__(+info[0], +info[1], +info[2], true);
	        }
	      });

	      result = _Graph3.default.mstPrim(gh);
	      console.log(result);

	      result = _Graph3.default.mstKruskal(gh);
	      console.log(result);
	    }
	  }]);

	  return GraphW;
	}(_Graph3.default);

	exports.default = GraphW;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _heapSort = __webpack_require__(22);

	var _heapSort2 = _interopRequireDefault(_heapSort);

	var _quickSort = __webpack_require__(12);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	var _mergeSort = __webpack_require__(23);

	var _internal = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isSorted(arr, compare) {
	  // default order by asc
	  /*
	   * inspired by http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
	   */
	  compare = (0, _internal.__compareOrDefault__)(compare);

	  var sorted = true,
	      i;
	  for (i = 0; i < arr.length - 1; i++) {
	    if (compare(arr[i], arr[i + 1]) > 0) {
	      // console.log(arr[i], arr[i+1]);
	      sorted = false;
	      break;
	    }
	  }

	  return sorted;
	}

	function binarySearch(arr, x, low, high) {
	  low = low || 0;
	  high = high || arr.length - 1;

	  var mid = -1;

	  while (low <= high) {
	    mid = low + (high - low >> 1);
	    if (arr[mid] === x) {
	      return mid;
	    } else if (arr[mid] < x) {
	      low = mid + 1;
	    } else {
	      high = mid - 1;
	    }
	  }

	  return -1;
	}

	exports.default = {
	  __randomUniqueArray__: _internal.__randomUniqueArray__,
	  isSorted: isSorted,
	  binarySearch: binarySearch,
	  heapSort: _heapSort2.default,
	  quickSort: _quickSort2.default,
	  mergeSort: _mergeSort.mergeSort,
	  mergeSortBU: _mergeSort.mergeSortBU
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = heapSort;

	var _Heap = __webpack_require__(7);

	function heapSort(arr, option) {
	  option = option || {
	    'order': 'ASC'
	  };

	  var heap;

	  switch (option.order) {
	    case 'ASC':
	    case 'asc':
	      heap = new _Heap.MinHeap();
	      break;
	    case 'DESC':
	    case 'desc':
	      heap = new _Heap.MaxHeap();
	      break;
	    default:
	      throw new Error('invalid order option, use one of ASC | DESC');
	  }

	  // push x into heap
	  arr.forEach(function (x) {
	    heap.push(x);
	  });

	  return heap.__toArray__();
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeSort = mergeSort;
	exports.mergeSortBU = mergeSortBU;

	var _internal = __webpack_require__(8);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _deepCloneTo(arr, to, l, r) {
	  // copy arr to to deeply from l to r inclusively
	  // require arr.length  = to.length;

	  r = r % arr.length;

	  for (var i = l; i <= r; i++) {
	    to[i] = arr[i];
	  }
	}

	function _merge(arr, aux, l, mid, r, compare) {
	  // required sorted(arr, l, mid);
	  // required sorted(arr, mid+1, r);
	  // require arr.length = aux.length;

	  _deepCloneTo(arr, aux, l, r);
	  var i = l,
	      j = mid + 1,
	      k = l;
	  for (; k <= r; k++) {
	    if (i > mid) {
	      arr[k] = aux[j++];
	    } else if (j > r) {
	      arr[k] = aux[i++];
	    } else if (compare(aux[i], aux[j]) > 0) {
	      // inversions += (mid - i + 1);
	      arr[k] = aux[j++];
	    } else {
	      arr[k] = aux[i++];
	    }
	  }
	}

	function _mergeSort(arr, aux, l, r, compare) {
	  if (l < r) {
	    var mid = l + (r - l >> 1);
	    _mergeSort(arr, aux, l, mid, compare);
	    _mergeSort(arr, aux, mid + 1, r, compare);
	    _merge(arr, aux, l, mid, r, compare);
	  }
	}

	function mergeSort(arr, compare) {
	  // default order by asc
	  compare = (0, _internal.__compareOrDefault__)(compare);

	  var copy = [].concat(_toConsumableArray(arr));
	  var aux = [];

	  // inversions = 0;

	  _mergeSort(copy, aux, 0, copy.length - 1, compare);

	  // console.log('# of inversions: ' + inversions);

	  return copy;
	}

	function mergeSortBU(arr, compare) {
	  // default order by asc
	  compare = (0, _internal.__compareOrDefault__)(compare);

	  var copy = [].concat(_toConsumableArray(arr));
	  var aux = [];
	  var n = arr.length,
	      sz = 1,
	      lo = 0;
	  for (sz = 1; sz < n; sz <<= 1) {
	    for (lo = 0; lo < n - sz; lo += sz << 1) {
	      _merge(copy, aux, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, n - 1), compare);
	    }
	  }

	  return copy;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cut = __webpack_require__(25);

	var _mst = __webpack_require__(26);

	var _path = __webpack_require__(27);

	var _search = __webpack_require__(28);

	exports.default = {
	  // cut
	  mergeVertex: _cut.mergeVertex, minimumCut: _cut.minimumCut, multiMinimumCut: _cut.multiMinimumCut,

	  // mst
	  mstKruskal: _mst.mstKruskal, mstPrim: _mst.mstPrim,

	  // path
	  dijkstra: _path.dijkstra, tspHeldKarp: _path.tspHeldKarp,

	  // search
	  topologicalSort: _search.topologicalSort, sccTarjan: _search.sccTarjan, sccKosaraju: _search.sccKosaraju, bfs: _search.bfs, dfs: _search.dfs, undirectedConnected: _search.undirectedConnected
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeVertex = exports.minimumCut = exports.multiMinimumCut = undefined;

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var multiMinimumCut = exports.multiMinimumCut = function multiMinimumCut(graph, times) {
	  /// <summary>gets the minimum number of potential minimum cut in multiple try.<summary>

	  var min = Number.MAX_VALUE,
	      gh,
	      cut,
	      time = [];

	  _math2.default.range(times).forEach(function () {
	    gh = graph.clone();
	    time.push(_math2.default.__timer__(function () {
	      cut = minimumCut(gh);
	    }));
	    if (cut < min) {
	      min = cut;
	    }
	  });
	  console.log(_math2.default.Stats.mean(time), _math2.default.Stats.stddev(time));
	  console.log(time.join(', '));
	  return min;
	};

	var minimumCut = exports.minimumCut = function minimumCut(graph) {
	  /// <summary>gets the number of potential minimum cut in single try.<summary>

	  var count = graph.__count__(),
	      v = count[0],
	      e = count[1],
	      k = 0,
	      edge;
	  while (v > 2) {
	    k = _math2.default.randomInteger(1, e);
	    // find the k-th edge
	    edge = graph.__edgeAt__(k);
	    // merge
	    mergeVertex(graph, edge[0], edge[1]);
	    // recount
	    count = graph.__count__();
	    v = count[0];
	    e = count[1];
	  }

	  // return number of edges of min cut
	  return graph.__count__()[1];
	};

	var mergeVertex = exports.mergeVertex = function mergeVertex(graph, v1, v2) {
	  /// <summary>merges the vertex and contracts the edge.<summary>

	  // merge the edge from v1 to v2, e1 is the edges from v1 to v2 (no matter in undirected graph)
	  // 1. copy the endpoints from v1's to v2's
	  // 2. loop all vertex of graph, change endpoint v1 to v2
	  // 3.      if self loop, delete endpoint
	  // 4. mark v1 visited

	  var _g = graph.__adjacencyList__,
	      e1 = graph.__edgesFrom__(v1),
	      e2 = graph.__edgesFrom__(v2),
	      i;

	  // 1
	  e1.forEach(function (v) {
	    if (v >= 0 /*&& e2.indexOf(v) === -1*/) {
	        e2.push(v);
	      }
	  });

	  // 2
	  _g.forEach(function (x) {
	    if (x && x[0]) {
	      // edges from x[0]
	      for (i = 0; i < x[1].length; i++) {
	        if (x[1][i] === v1) {
	          x[1][i] = v2;
	        }
	        // 3 self loop
	        if (x[1][i] > 0 && x[1][i] === x[0]) {
	          x[1][i] = -1;
	          graph.__e__--;
	        }
	      }
	    }
	  });

	  // 4
	  // DO NOT decrease __e__, for _g[v1][1] has been moved into _g[v2][1] at step 1
	  _g[v1][0] = -1;
	  graph.__v__--;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mstKruskal = exports.mstPrim = undefined;

	var _Heap = __webpack_require__(7);

	var _UnionFind = __webpack_require__(14);

	var _quickSort = __webpack_require__(12);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mstPrim = exports.mstPrim = function mstPrim(graph, s) {
	  s = s || 1;

	  // assert is weighted, s in [1. n]

	  // in our heap (frontier), each x, y is formated like [u, v, w],
	  // where u in X, v not in X, w is weight
	  var frontier = new _Heap.MinHeap(function (x, y) {
	    return x[2] - y[2];
	  }),
	      g = graph.clone(),
	      mst = [],
	      i = 0,
	      current;

	  // label each vertex
	  // -1 for init, 1 for having been added in X
	  g.__labelAll__(-1);

	  // init for s
	  frontier.push([0, s, 0]);

	  while (!frontier.isEmpty() && i < g.n) {
	    current = frontier.pop();
	    // add current into X, T
	    g.__labelAt__(current[1], 1);
	    mst.push(current);
	    i++;

	    g.__edgesFrom__(current[1]).forEach(function (v) {
	      if (g.__labelAt__(v[0]) === -1) {
	        // not visited, update each in frontier
	        var updated = frontier.update(function (x) {
	          return x[1] === v[0];
	        }, function (x) {
	          return v[1] < x[2];
	        }, function (x) {
	          x[0] = current[1];
	          x[2] = v[1];
	        });

	        if (!updated) {
	          frontier.push([current[1], v[0], v[1]]);
	        }
	      } // end if, unvisited
	    });
	  }

	  return mst.reduce(function (acc, x) {
	    return acc + x[2];
	  }, 0);
	};

	var mstKruskal = exports.mstKruskal = function mstKruskal(graph, k) {
	  var g = graph.clone(),
	      edges = (0, _quickSort2.default)(g.__getEdgeList__(), function (x, y) {
	    return x[2] - y[2];
	  }),
	      mst = [],
	      u = 0,
	      v = 0,
	      frontier = new _UnionFind.WeightedQuickUnion(g.n),
	      space = -1;

	  edges.some(function (e) {
	    u = e[0];
	    v = e[1];
	    if (!frontier.connected(u, v)) {
	      if (!k || frontier.count() > k) {
	        mst.push(e);
	        frontier.union(u, v);
	      } else {
	        space = e[2];
	        return true;
	      }
	    }
	  });

	  return k ? space : mst.reduce(function (acc, x) {
	    return acc + x[2];
	  }, 0);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tspHeldKarp = exports.dijkstra = undefined;

	var _Heap = __webpack_require__(7);

	var dijkstra = exports.dijkstra = function dijkstra(graph, s) {
	  s = s || 1;

	  // assert is weighted, s in [1. n]

	  // in our heap (frontier), each x, y is formated like [v, w],
	  // means, for now on, shortest path from s to v is w
	  var frontier = new _Heap.MinHeap(function (x, y) {
	    return x[1] - y[1];
	  }),
	      g = graph.clone(),
	      i = 0,
	      current;

	  // label each vertex
	  // -1 for init
	  // [0, ...] for FINAL shortest length from init s
	  g.__labelAll__(-1);

	  // init for s
	  frontier.push([s, 0]);

	  while (!frontier.isEmpty && i < g.n) {
	    current = frontier.pop();
	    g.__labelAt__(current[0], current[1]);
	    i++;

	    g.__edgesFrom__(current[0]).forEach(function (v) {
	      if (g.__labelAt__(v[0]) === -1) {
	        // not visited, update each in frontier
	        var updated = frontier.update(function (x) {
	          return x[0] === v[0];
	        }, function (x) {
	          return current[1] + v[1] < x[1];
	        }, function (x) {
	          x[1] = current[1] + v[1];
	        });

	        if (!updated) {
	          frontier.push([v[0], current[1] + v[1]]);
	        }
	      } // end if, unvisited
	    });
	  }

	  return g.__adjacencyList__.map(function (v, i) {
	    return [i, v[0]];
	  }).filter(function (v) {
	    return v && v.length;
	  });
	};

	var tspHeldKarp = exports.tspHeldKarp = function tspHeldKarp(coordinates) {
	  // run TSP algorithm by Held-Karp
	  // vertex i in input corrdinates array is [x,y]

	  var n = coordinates.length,
	      cost = [],
	      i,
	      j;

	  function distance(a, b) {
	    return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
	  }

	  // build cost matrix c(i,j) for each (i, j) and i < j
	  for (i = 0; i < n; i++) {
	    for (j = i + 1; j < n; j++) {
	      cost[i * n + j] = distance(coordinates[i], coordinates[j]);
	    }
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sccTarjan = exports.sccKosaraju = exports.topologicalSort = exports.undirectedConnected = exports.dfs = exports.bfs = undefined;

	var _Stack = __webpack_require__(6);

	var _Stack2 = _interopRequireDefault(_Stack);

	var _Queue = __webpack_require__(5);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _Graph = __webpack_require__(19);

	var _Graph2 = _interopRequireDefault(_Graph);

	var _ERROR = __webpack_require__(2);

	var _ERROR2 = _interopRequireDefault(_ERROR);

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	var _quickSort = __webpack_require__(12);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// labelAt for diff meaning
	// topo: -1 for init, 0 for head, >0 for order
	// search: -1 for init, 0 for being in frotiner, 1 for being visited
	// tarjan scc: -1 as init, 0 as being SCC, else as dfs(v)

	var bfs = exports.bfs = function bfs(graph) {
	  var g = graph.clone();
	  g.__labelAll__(-1);
	  var result = search(g, new _Queue2.default(), 1);
	  g = null;

	  return result;
	};

	var dfs = exports.dfs = function dfs(graph) {
	  var g = graph.clone();
	  g.__labelAll__(-1);
	  var result = search(g, new _Stack2.default(), 1);
	  g = null;

	  return result;
	};

	var undirectedConnected = exports.undirectedConnected = function undirectedConnected(graph) {
	  if (graph.__directed__) {
	    throw new Error(_ERROR2.default.INVALID_GRAPH_ACTION);
	  }

	  var g = graph.clone(),
	      connect = [],
	      // [x] where x = [head, [following vertex]]
	  label;

	  g.__labelAll__(-1);

	  _math2.default.range(1, g.n + 1).forEach(function (v) {
	    label = g.__labelAt__(v);
	    if (label < 1 /*label !== 'v'*/) {
	        connect.push([v, search(g, new _Stack2.default(), v)]);
	      }
	  });

	  g = null;

	  // undirected graph is connected iff connect.length == 1 && connnect[0][1] == graph.dfs(graph)
	  return connect;
	};

	var topologicalSort = exports.topologicalSort = function topologicalSort(graph) {
	  if (!graph.__directed__) {
	    throw new Error(_ERROR2.default.INVALID_GRAPH_ACTION);
	  }

	  var g = graph.clone(),
	      result,
	      i = 0,
	      n = [g.n];

	  g.__labelAll__(-1);

	  _math2.default.range(1, g.n + 1).forEach(function (v) {
	    if (g.__labelAt__(v) <= 0) {
	      // unvisited or unmarked
	      i++;
	      tsearch(g, v, n);
	    }
	  });

	  // TODO: inspect i to find graph info after topo sort, is there non connection, is there cycle?
	  console.log(i);

	  result = g.__adjacencyList__.map(function (x, i) {
	    return [i, +x[0]];
	  }).filter(function (x, i) {
	    return i > 0 && x;
	  });

	  g = null;

	  result = (0, _quickSort2.default)(result, function (x, y) {
	    return x[1] - y[1];
	  }).map(function (x) {
	    return x[0];
	  });

	  return result;
	};

	var sccKosaraju = exports.sccKosaraju = function sccKosaraju(graph) {
	  var label,
	      // label of vertex
	  rg = reverse(graph),
	      // reversed graph
	  g = graph.clone(),
	      // clone one
	  connect = []; // connectivity array

	  g.__labelAll__(-1);

	  topologicalSort(rg).forEach(function (v) {
	    label = g.__labelAt__(v);
	    if (label < 1 /*typeof label !== 'string'*/) {
	        connect.push([v, search(g, new _Stack2.default(), v)]);
	      }
	  });

	  rg = null;
	  g = null;

	  return buildConnect(connect);
	};

	var sccTarjan = exports.sccTarjan = function sccTarjan(graph) {
	  var g = graph.clone(),
	      n = [0],
	      connect = [],
	      low = [],
	      component = new _Stack2.default();

	  g.__labelAll__(-1);

	  _math2.default.range(1, g.n + 1).forEach(function (i) {
	    if (g.__labelAt__(i) === 0) {
	      // has been marked SCC
	      return;
	    }

	    // tarjan(g, i, n);

	    // pseudo code for tarjan(g, i, index) below, iteration version
	    // inspired by https://www.byvoid.com/blog/scc-tarjan

	    var index = n,
	        frontier = new _Stack2.default(),
	        // frontier for keep order
	    head = new _Stack2.default(),
	        // head stack for push vertex before pusing (walking) its edges
	    current,
	        label;

	    frontier.push(i);
	    // g.__labelAt__(i, 'm');
	    head.push(-1);

	    while (!frontier.isEmpty) {
	      current = frontier.peek();
	      // if current has been in a SCC (0) or in a component (>0) or , we pop it and continue
	      if (g.__labelAt__(current) === 0 || low[current] === -1) {
	        frontier.pop();
	        continue;
	      }

	      if (current === head.peek()) {
	        // that means we are on the top of dfs(v), we visit current from its parent
	        frontier.pop();
	        head.pop();
	        // assert this ?
	        if (component.isEmpty) {
	          // console.warn('component.isEmpty while head.isNotEmpty');
	        } else if (current !== component.peek()) {}
	        // console.warn(current, 'head.peek !== component.peek', component.peek());


	        // dfn or visited info
	        label = g.__labelAt__(current);

	        if (low[current] === label) {
	          var c = [],
	              // temporary connect which will be a connect component
	          h; // each value in THIS component

	          while (
	          // we reach the 1st item of head (outmost of recursion) OR
	          head.peek() === -1 && !component.isEmpty ||
	          // we repeat until leading of connect equals component vettex again
	          // i.e. repeat until u = v
	          !component.isEmpty && (h = component.peek(), h !== current)) {
	            h = component.pop();
	            c.push(h);
	            g.__labelAt__(h, 0);
	          }

	          if (!component.isEmpty && (h = component.peek(), h === current)) {
	            // push the leading of component
	            h = component.pop();
	            c.push(h);
	            g.__labelAt__(h, 0);
	          }

	          connect.push([current, c]);
	        } else {
	          // pay attention on h has poped before
	          low[head.peek()] = Math.min(low[head.peek()], low[current]);
	          // g.__labelAt__(current, -1);
	          // Attention! if current is poped from f and h, that means all of
	          // its children have been poped too.
	          low[current] = -1;
	        }

	        continue;
	      }

	      head.push(current);
	      // components will be poped from stack like head until dfn = low
	      component.push(current);
	      low[current] = ++index[0];
	      if (low[current] > g.n) {
	        debugger;
	      }
	      g.__labelAt__(current, low[current]);

	      if (g.__hasEdgesAt__(current)) {
	        g.__edgesFrom__(current).forEach(function (v) {
	          label = g.__labelAt__(v);
	          if (label !== 0) {
	            // not visited yet
	            if (label > 0) {
	              // marked
	              low[current] = Math.min(low[current], label);
	            } else {
	              // not marked
	              frontier.push(v);
	            }
	          }
	        });
	      } // end if
	    } // end while
	  });

	  g = null;

	  return buildConnect(connect);
	};

	var tsearch = function tsearch(graph, i, n) {

	  var frontier = new _Stack2.default(),
	      // frontier for keep order
	  head = new _Stack2.default(),
	      // head stack for push vertex before pusing (walking) its edges
	  current,
	      label;
	  // n = graph.n;					// as topological order

	  frontier.push(i);
	  // graph.__labelAt__(i, 'm');
	  head.push(-1);

	  while (!frontier.isEmpty) {

	    current = frontier.peek();
	    label = graph.__labelAt__(current);
	    if (label > 0 /*label !== 'h' && label !== 'm' && typeof label === 'string'*/) {
	        // current has been marked order OR has been in head (avoid cycle)
	        frontier.pop();
	        continue;
	      }

	    if (current === head.peek()) {
	      // that means we are on the top of dfs(v), we visit current from its parent

	      // lable as topological order
	      graph.__labelAt__(current, n[0]--);
	      frontier.pop();
	      head.pop();

	      continue;
	    }

	    head.push(current);
	    graph.__labelAt__(current, 0);

	    if (graph.__hasEdgesAt__(current)) {
	      graph.__edgesFrom__(current).forEach(function (v) {
	        label = graph.__labelAt__(v);
	        if (label === -1 /*label === 'm' || typeof label !== 'string'*/) {
	            frontier.push(v);
	            // v has been add into frontier
	            // graph.__labelAt__(v, 'm');
	          }
	      });
	    } // end if
	  } // end while
	};

	var search = function search(graph, frontier, i) {
	  // seach graph from initial vertex v, using that frontier

	  i = i || (i = +i) || 1;

	  var order = [],
	      frontierIn = function frontierIn(item) {
	    return frontier.push && frontier.push(item) || frontier.enqueue && frontier.enqueue(item);
	  },
	      frontierOut = function frontierOut() {
	    return frontier.pop && frontier.pop() || frontier.dequeue && frontier.dequeue();
	  },
	      current,
	      label;

	  frontierIn(i);
	  graph.__labelAt__(i, 0);
	  while (!frontier.isEmpty) {
	    current = frontierOut();

	    // push all valid v sourcing from current into frontier
	    if (graph.__hasEdgesAt__(current)) {
	      graph.__edgesFrom__(current).forEach(function (v) {
	        label = graph.__labelAt__(v);
	        if (label < 0 /*label !== 'm' && !== 'v'*/) {
	            frontierIn(v);
	            // v has been add into frontier
	            graph.__labelAt__(v, 0);
	          }
	      });
	    }
	    // visit current
	    graph.__labelAt__(current, 1);
	    order.push(current);
	  }

	  return order;
	};

	var reverse = function reverse(graph) {
	  // get a new graph from graph, with each u->v into v->u

	  if (graph.__directed__) {
	    var rg = new _Graph2.default(graph.n, true);
	    _math2.default.range(1, graph.n + 1).forEach(function (u) {
	      if (graph.__hasEdgesAt__(u)) {
	        graph.__edgesFrom__(u).forEach(function (v) {
	          rg.__pushEdge__(v, u);
	        });
	      }
	    });

	    return rg;
	  } else {
	    // reverse undirected graph is itself
	    return graph.clone();
	  }
	};

	var buildConnect = function buildConnect(connect) {
	  // return [
	  //   length of component,
	  //   [top 100 componet size],
	  //   [top 100 distinct component size]
	  // ]

	  connect = connect.map(function (x) {
	    return x[1].length;
	  });

	  var desc = function desc(x, y) {
	    return y - x;
	  },
	      sortedSize = (0, _quickSort2.default)(connect, desc, true),
	      pre = -1;

	  return [connect.length, sortedSize.slice(0, 100), sortedSize.filter(function (x) {
	    var same = x === pre;
	    pre = x;
	    return !same;
	  }).slice(0, 100)];
	};

/***/ }
/******/ ]);