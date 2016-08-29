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

	var _sorting = __webpack_require__(19);

	var _sorting2 = _interopRequireDefault(_sorting);

	var _linear = __webpack_require__(10);

	var _linear2 = _interopRequireDefault(_linear);

	var _math = __webpack_require__(15);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  type: _type2.default,
	  sorting: _sorting2.default,
	  linear: _linear2.default,
	  math: _math2.default
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
	  Queue: _Queue2.default,
	  Stack: _Stack2.default,
	  MinHeap: _Heap.MinHeap,
	  MaxHeap: _Heap.MaxHeap,
	  BinarySearchTree: _Tree.BinarySearchTree,
	  QuickFind: _UnionFind.QuickFind,
	  WeightedQuickUnion: _UnionFind.WeightedQuickUnion
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

	  function MinHeap() {
	    _classCallCheck(this, MinHeap);

	    return _possibleConstructorReturn(this, (MinHeap.__proto__ || Object.getPrototypeOf(MinHeap)).call(this, function (x, y) {
	      return x - y;
	    }));
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

	var _heapSort = __webpack_require__(20);

	var _heapSort2 = _interopRequireDefault(_heapSort);

	var _quickSort = __webpack_require__(12);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	var _mergeSort = __webpack_require__(21);

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
/* 20 */
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
/* 21 */
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

/***/ }
/******/ ]);