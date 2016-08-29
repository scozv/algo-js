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

	var _sorting = __webpack_require__(11);

	var _sorting2 = _interopRequireDefault(_sorting);

	var _linear = __webpack_require__(9);

	var _linear2 = _interopRequireDefault(_linear);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  type: _type2.default,
	  sorting: _sorting2.default,
	  linear: _linear2.default
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
	  MaxHeap: _Heap.MaxHeap
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

	var _linear = __webpack_require__(9);

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

	var _linear = __webpack_require__(9);

	var _linear2 = _interopRequireDefault(_linear);

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
	    _linear2.default.array.swap(arr, i, j);
	  }

	  return arr;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _array = __webpack_require__(10);

	var _array2 = _interopRequireDefault(_array);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  array: _array2.default
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var array = {
	  zip: function zip(arr1, arr2) {
	    var arr = [],
	        n = Math.min(arr1.length, arr2.length),
	        i;
	    for (i = 0; i < n; i++) {
	      arr.push([arr1[i], arr2[i]]);
	    }
	    return arr;
	  },
	  swap: function swap(arr, i, j) {
	    i %= arr.length;
	    j %= arr.length;

	    var swap = arr[i];
	    arr[i] = arr[j];
	    arr[j] = swap;
	  }
	};

	exports.default = array;

	// $pt.take = function (n) {
	//   var result = [];
	//   for (var i = 0; i < this.length && i < n; i++) {
	//     result.push(this[i]);
	//   }
	//
	//   return result;
	// };
	//
	// $pt.skip = function (n) {
	//   var result = [];
	//   for (var i = n; i < this.length; i++) {
	//     result.push(this[i]);
	//   }
	//
	//   return result;
	// };
	//
	// // update or insert item of array, array will be changed
	// $pt.upsert = function (item, where, how) {
	//   return this.update(item, where, how, true);
	// };
	//
	// // update item of array, array will be changed
	// $pt.update = function (item, where, how, upsert) {
	//   var itemKey = (where && where(item)) || item,
	//     updated = false;
	//   /// insert = insert && true;
	//
	//   // find the item in array by where-function
	//   for (var i = 0; i < this.length; i++) {
	//     var x = this[i];
	//     if (where(x) === itemKey) {
	//       // find it and update it
	//       updated = true;
	//       this[i] = how(x, item);
	//     }
	//   }
	//
	//   if (!updated && upsert) {
	//     this.push(item);
	//   }
	//
	//   return this;
	// };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _heapSort = __webpack_require__(12);

	var _heapSort2 = _interopRequireDefault(_heapSort);

	var _quickSort = __webpack_require__(13);

	var _quickSort2 = _interopRequireDefault(_quickSort);

	var _mergeSort = __webpack_require__(14);

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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = quickSort;

	var _internal = __webpack_require__(8);

	var _linear = __webpack_require__(9);

	var _linear2 = _interopRequireDefault(_linear);

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
	    _linear2.default.array.swap(arr, i, j);
	  }

	  _linear2.default.array.swap(arr, l, j);
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
/* 14 */
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