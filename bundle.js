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

	var _LinkedList = __webpack_require__(2);

	var _LinkedList2 = _interopRequireDefault(_LinkedList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var error = {
	  INVALID_EMPTY_COL_ACTION: 'invalid action on an empty collection',
	  INVALID_NUMERIC_VALUE: 'invalid numeric value has been passed',
	  INVALID_GRAPH_ACTION: 'invalid action on this graph, check it is directed or not'
	};

	var traversal = {
	  PRE_ORDER: 0,
	  IN_ORDER: 1,
	  POST_ORDER: 2
	};

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
	  ERROR: error,
	  TRAVERSAL: traversal,
	  "__x__": __x__,

	  LinkedList: _LinkedList2.default
	};

/***/ },
/* 2 */
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

/***/ }
/******/ ]);