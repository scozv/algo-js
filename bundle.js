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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  type: _type2.default
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
	  "__x__": __x__,

	  LinkedList: _LinkedList2.default,
	  Queue: _Queue2.default,
	  Stack: _Stack2.default
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

/***/ }
/******/ ]);