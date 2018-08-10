/**
 * A reverse-iterable set implementation based on the built-in [`Set`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. Like `Set`, the order of `ReverseIterableSet` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *
 * @template V
 * @property {Map<V, ReverseIterableSetNode<V>>} _setMap
 * @property {ReverseIterableSetNode<V>} _firstNode
 * @property {ReverseIterableSetNode<V>} _lastNode
 */
export class ReverseIterableSet {
  /**
   * An [iterable][1] object that accepts any value as elements.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
   *
   * @param {Iterable?} iterable An [iterable][1] object.
   * @public
   */
  constructor(iterable = null) {
    this._setMap = new Map();
    this._firstNode = null;
    this._lastNode = null;

    if (iterable !== null) {
      for (const element of iterable) {
        this.add(element);
      }
    }
  }

  /**
   * The [`@@toStringTag`][1] property is accessed internally by `Object.prototype.toString()`.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
   *
   * @returns {String} The string tag of the `ReverseIterableSet` class.
   * @public
   */
  get [Symbol.toStringTag]() {
    return 'ReverseIterableSet';
  }

  /**
   * The `size` accessor property returns the number of elements in a `ReverseIterableSet` object.
   *
   * @returns {Number} The size of the `ReverseIterableSet` object.
   * @public
   */
  get size() {
    return this._setMap.size;
  }

  /**
   * The `clear()` method removes all elements from a `ReverseIterableSet` object.
   *
   * @public
   */
  clear() {
    this._setMap.clear();
    this._firstNode = null;
    this._lastNode = null;
  }

  /**
   * The `has()` method returns a boolean indicating whether `value` exists in the set.
   *
   * @param {V} value
   * @returns {Boolean} `true` if an element with the specified key exists in a
   * `ReverseIterableSet` object; otherwise `false`.
   * @public
   */
  has(value) {
    return this._setMap.has(value);
  }

  /**
   * The `add()` method adds a new value to a `ReverseIterableSet` object in insertion order.
   *
   * @param {V} value The value to add to the `ReverseIterableSet` object.
   * @returns {ReverseIterableSet<V>} the `ReverseIterableSet` object.
   * @public
   */
  add(value) {
    let node = this._setMap.get(value);
    if (!node) {
      node = new ReverseIterableSetNode(value);
      this._setMap.set(value, node);
    }

    if (this._firstNode === null && this._lastNode === null) {
      this._firstNode = node;
      this._lastNode = node;
    } else {
      node.prev = this._lastNode;
      this._lastNode.next = node;
      this._lastNode = node;
    }

    return this;
  }

  /**
   * The `addInFront()` method adds a new value to a `ReverseIterableSet` object in
   * reverse insertion order or updates the value of an existing value.
   *
   * @param {V} value The value to add to the `ReverseIterableSet` object.
   * @returns {ReverseIterableSet<V>} the `ReverseIterableSet` object.
   * @public
   */
  addInFront(value) {
    let node = this._setMap.get(value);
    if (!node) {
      node = new ReverseIterableSetNode(value);
      this._setMap.set(value, node);
    }

    if (this._firstNode === null && this._lastNode === null) {
      this._firstNode = node;
      this._lastNode = node;
    } else {
      node.next = this._firstNode;
      this._firstNode.prev = node;
      this._firstNode = node;
    }

    return this;
  }

  /**
   * The `delete()` method removes the specified value from a `ReverseIterableSet` object.
   *
   * @param {V} value The value to remove from the `ReverseIterableSet` object.
   * @returns {Boolean} `true` if a value in the `ReverseIterableSet` object existed and has been
   * removed or `false` if the value did not exist.
   * @public
   */
  delete(value) {
    if (this.has(value)) {
      const node = this._setMap.get(value);

      if (this._firstNode === this._lastNode) {
        this._firstNode = null;
        this._lastNode = null;
      } else if (this._firstNode === node) {
        node.next.prev = null;
        this._firstNode = node.next;
      } else if (this._lastNode === node) {
        node.prev.next = null;
        this._lastNode = node.prev;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }

      return this._setMap.delete(value);
    }

    return false;
  }

  /**
   * The `forEach()` method executes a provided function once per each value/value pair in the
   * `ReverseIterableSet` object, in insertion order. For reference, see
   * [`Set.prototype.forEach`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
   *
   * @param {Function} callback
   * @param {*?} thisArg
   * @public
   */
  forEach(callback, thisArg = undefined) {
    for (const [value1, value2] of this.entries()) {
      callback(value2, value1, thisArg ? thisArg : this);
    }
  }

  /**
   * The `forEachReverse()` method executes a provided function once per each value/value pair in
   * the `ReverseIterableSet` object, in reverse insertion order.
   *
   * @param {Function} callback
   * @param {*?} thisArg
   * @public
   */
  forEachReverse(callback, thisArg = undefined) {
    for (const [value1, value2] of this.entries().reverseIterator()) {
      callback(value2, value1, thisArg ? thisArg : this);
    }
  }

  /**
   * The initial value of the [@@iterator][1] property is the same function object as the initial
   * value of the `values` property.
   *
   * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
   *
   * @returns {IterableIterator} an iterable iterator for the `ReverseIterableSet` object.
   * @public
   */
  [Symbol.iterator]() {
    return this.values();
  }

  /**
   * Allows using the [iteration protocols][1] for reverse iteration.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * Examples:
   *
   * ```js
   * const set = new ReverseIterableSet([1, 2, 3]);
   *
   * [...set.reverseIterator()];
   *
   * for (const value of set.reverseIterator()) {
   *   console.log(value);
   * }
   * ```
   *
   * @returns {IterableIterator} a reverse iterable iterator for the `ReverseIterableSet` object.
   * @public
   */
  reverseIterator() {
    return this.values().reverseIterator();
  }

  /**
   * The `entries()` method returns a new [Iterator][1] object that contains the `[value, value]`
   * pairs for each value in a `ReverseIterableSet` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns {IterableIterator} an iterable iterator for the `ReverseIterableSet` object.
   * @public
   */
  entries() {
    const getIteratorValue = node => [node.value, node.value];

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * The `values()` method returns a new [Iterator][1] object that contains the values in a
   * `ReverseIterableSet` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns {IterableIterator} an iterable iterator for the `ReverseIterableSet` object.
   * @public
   */
  values() {
    const getIteratorValue = node => node.value;

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * The `iteratorFor()` method returns a new [Iterator][1] object that contains the
   * `[value, value]` pairs for each element in a `ReverseIterableSet` object in insertion order
   *  **starting with the pair specified by the `value` parameter**.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @param {V} value The value to start iterating from.
   * @returns {IterableIterator} an iterable iterator for the `ReverseIterableSet` object.
   * @public
   */
  iteratorFor(value) {
    let startNode = this._setMap.get(value);
    const getIteratorValue = node => node.value;

    return this._iterableIterator(getIteratorValue, startNode);
  }

  /**
   * Returns an object which is both an iterable and an iterator. It fulfills the requirements of
   * the [iteration protocols][1] and also allowing reverse-iteration (not part of the mentioned
   * protocols).
   *
   * - **Iterator requirements**: An object that implements a function `next`. This function
   *   returns an object with two properties: `value` and `done`.
   *
   * - **Iterable requirements**: An object that implements a function `[Symbol.iterator]()`. This
   *   function returns an iterator.
   *
   * - **Reverse-iterable requirements** (non-standard): An object that implements a function
   *   `reverseIterator`. This function returns an iterator with the special behavior of iterating
   *   in reverse insertion order. This is non-standard behavior.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * @param {Function} getIteratorValue
   * @param {ReverseIterableSetNode<V>?} startNode Node to start iterating from
   * @returns {IterableIterator} a reverse-iterable iterator
   * @private
   */
  _iterableIterator(getIteratorValue, startNode = undefined) {
    let currentNode = startNode ? startNode : this._firstNode;
    // Store the this.last node because inside the `reverseIterator()` method, `this` will be
    // bound to the `iterableIterator` method, not the `ReverseIterableSet` object.
    const last = this._lastNode;
    let nextProp = 'next';

    return {
      reverseIterator() {
        currentNode = startNode ? startNode : last;
        nextProp = 'prev';
        return this;
      },
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next() {
        let value;
        if (currentNode) {
          value = getIteratorValue(currentNode);
          currentNode = currentNode[nextProp];
        }
        return iteratorResult(value);
      }
    };
  }
}

/**
 * The `ReverseIterableSetNode` object represents a value in a `ReverseIterableSet` object.
 * Its main purpose is storing the value. Additionally, it keeps references to the
 * `ReverseIterableSetNode` objects appearing before and after itself in a `ReverseIterableSet`
 * object.
 *
 * @template V
 * @property {V} _value
 * @property {ReverseIterableSetNode<V>} _prev
 * @property {ReverseIterableSetNode<V>} _next
 * @protected
 */
class ReverseIterableSetNode {
  /**
   * A value that is part of a `ReverseIterableSet` object.
   *
   * @param {V} value
   */
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Returns an `IteratorResult` object as per the following rules:
 *
 * - If `value` is not `undefined`, `done` is `false`.
 * - If `value` is `undefined`, `done` is `true`. In this case, `value` may be omitted.
 *
 * @param {*|undefined} value
 * @returns {IteratorResult}
 */
function iteratorResult(value) {
  return {
    value: value,
    done: value === undefined
  };
}
