(function (type, undefined) {
  type.Queue = function () {
    this.__innerList__ = new T.LinkedList();
  };

  type.Queue.prototype = {
    isEmpty: function () {
      return this.__innerList__.isEmpty();
    },

    enqueue: function (item) {
      this.__innerList__.push(item);
    },

    peek: function () {
      if (this.__innerList__.isEmpty()) {
        throw new Error(T.ERROR.INVALID_EMPTY_COL_ACTION);
      }

      return this.__innerList__.__header__.next.elem;
    },

    dequeue: function () {
      var item = this.peek(),
        _lst = this.__innerList__;
      _lst.__removeNext__(_lst.__header__);
      return item;
    },

    size: function () {
      return this.__innerList__.size();
    },

    forEach: function (fn) {
      this.__innerList__.forEach(fn);
    },

    map: function (fn) {
      return this.__innerList__.map(fn);
    },

    toArray: function () {
      return this.__innerList__.toArray();
    }
  };
}(window.T = window.T || {}));