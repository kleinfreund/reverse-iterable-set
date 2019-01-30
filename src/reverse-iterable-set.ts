/**
 * A reverse-iterable set implementation based on the built-in [`Set`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. Like `Set`, the order of `ReverseIterableSet` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
export default class ReverseIterableSet<V> {
  private _setMap: Map<V, ReverseIterableSetNode<V>>;
  private _firstNode: ReverseIterableSetNode<V> | null;
  private _lastNode: ReverseIterableSetNode<V> | null;
  /**
   * An [iterable][1] object that accepts any value as elements.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
   */
  constructor(iterable?: Iterable<V> | any[]) {
    this._setMap = new Map();
    this._firstNode = null;
    this._lastNode = null;

    if (iterable !== undefined) {
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
   * @returns the string tag of the `ReverseIterableSet` class.
   */
  get [Symbol.toStringTag](): string {
    return 'ReverseIterableSet';
  }

  /**
   * The `size` accessor property returns the number of elements in a `ReverseIterableSet` object.
   *
   * @returns the size of the `ReverseIterableSet` object.
   */
  get size(): number {
    return this._setMap.size;
  }

  /**
   * The `clear()` method removes all elements from a `ReverseIterableSet` object.
   */
  clear(): void {
    this._setMap.clear();
    this._firstNode = null;
    this._lastNode = null;
  }

  /**
   * The `has()` method returns a boolean indicating whether `value` exists in the set.
   *
   * @returns `true` if an element with the specified key exists in a
   * `ReverseIterableSet` object; otherwise `false`.
   */
  has(value: V): boolean {
    return this._setMap.has(value);
  }

  /**
   * The `add()` method adds a new value to a `ReverseIterableSet` object in insertion order.
   *
   * @param value The value to add to the `ReverseIterableSet` object.
   * @returns the `ReverseIterableSet` object.
   */
  add(value: V): this {
    if (this.has(value)) {
      return this;
    }

    const node = new ReverseIterableSetNode(value);
    this._setMap.set(value, node);

    // If there is already a last node it needs to be linked with the new node.
    if (this._lastNode !== null) {
      node.prevNode = this._lastNode;
      this._lastNode.nextNode = node;
    }

    // If there is only one entry in the map, set the first node reference.
    if (this._firstNode === null) {
      this._firstNode = node;
    }

    this._lastNode = node;

    return this;
  }

  /**
   * The `addFirst()` method adds a new value to a `ReverseIterableSet` object in
   * reverse insertion order or updates the value of an existing value.
   *
   * @param value The value to add to the `ReverseIterableSet` object.
   * @returns the `ReverseIterableSet` object.
   */
  addFirst(value: V): this {
    if (this.has(value)) {
      return this;
    }

    const node = new ReverseIterableSetNode(value);
    this._setMap.set(value, node);

    // If there is already a first node it needs to be linked with the new node.
    if (this._firstNode !== null) {
      node.nextNode = this._firstNode;
      this._firstNode.prevNode = node;
    }

    // If there is only one entry in the map, set the last node reference.
    if (this._lastNode === null) {
      this._lastNode = node;
    }

    this._firstNode = node;

    return this;
  }

  /**
   * The `delete()` method removes the specified value from a `ReverseIterableSet` object.
   *
   * @param value The value to remove from the `ReverseIterableSet` object.
   * @returns `true` if a value in the `ReverseIterableSet` object existed and has been
   * removed or `false` if the value did not exist.
   */
  delete(value: V): boolean {
    const node = this._setMap.get(value);

    if (node === undefined) {
      return false;
    }

    if (node.prevNode !== null && node.nextNode !== null) {
      // `node` is in the middle.
      node.prevNode.nextNode = node.nextNode;
      node.nextNode.prevNode = node.prevNode;
    }
    else if (node.prevNode !== null) {
      // `node` is the last node; a new last node needs to be linked.
      node.prevNode.nextNode = null;
      this._lastNode = node.prevNode;
    }
    else if (node.nextNode !== null) {
      // `node` is the first node; a new first node needs to linked.
      node.nextNode.prevNode = null;
      this._firstNode = node.nextNode;
    }
    else {
      // `node` is the first and last node.
      // Both first and last node reference need to be unset.
      this._firstNode = null;
      this._lastNode = null;
    }

    return this._setMap.delete(value);
  }

  /**
   * The `forEach()` method executes a provided function once per each value/value pair in the
   * `ReverseIterableSet` object, in insertion order. For reference, see
   * [`Set.prototype.forEach`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
   */
  forEach(
    callbackfn: (value2: V, value1: V, set: ReverseIterableSet<V>) => void,
    thisArg?: any
  ): void {
    for (const [value1, value2] of this.entries()) {
      callbackfn.call(thisArg, value2, value1, this);
    }
  }

  /**
   * The `forEachReverse()` method executes a provided function once per each value/value pair in
   * the `ReverseIterableSet` object, in reverse insertion order.
   */
  forEachReverse(
    callbackfn: (value2: V, value1: V, set: ReverseIterableSet<V>) => void,
    thisArg?: any
  ): void {
    for (const [value1, value2] of this.entries().reverseIterator()) {
      callbackfn.call(thisArg, value2, value1, this);
    }
  }

  /**
   * The initial value of the [@@iterator][1] property is the same function object as the initial
   * value of the `values` property.
   *
   * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
   *
   * @returns an iterable iterator for the `ReverseIterableSet` object.
   */
  [Symbol.iterator](): ReverseIterableIterator<V> {
    return this.values();
  }

  /**
   * Allows using the [iteration protocols][1] for reverse iteration.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   *  @returns a reverse iterable iterator for the `ReverseIterableSet` object.
   */
  reverseIterator(): IterableIterator<V> {
    return this.values().reverseIterator();
  }

  /**
   * The `entries()` method returns a new [Iterator][1] object that contains the `[value, value]`
   * pairs for each value in a `ReverseIterableSet` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns an iterable iterator for the `ReverseIterableSet` object.
   */
  entries(): ReverseIterableIterator<[V, V]> {
    const getIteratorValue = (node: ReverseIterableSetNode<V>): [V, V] => [node.value, node.value];

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * The `values()` method returns a new [Iterator][1] object that contains the values in a
   * `ReverseIterableSet` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns an iterable iterator for the `ReverseIterableSet` object.
   */
  values(): ReverseIterableIterator<V> {
    const getIteratorValue = (node: ReverseIterableSetNode<V>): V => node.value;

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
   * @returns an iterable iterator for the `ReverseIterableSet` object.
   */
  iteratorFor(value: V): ReverseIterableIterator<V> {
    let startNode = this._setMap.get(value);
    const getIteratorValue = (node: ReverseIterableSetNode<V>): V => node.value;

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
   * @param getIteratorValue
   * @param [startNode] Node to start iterating from
   * @returns a reverse-iterable iterator
   * @private
   */
  private _iterableIterator(
    getIteratorValue: (node: ReverseIterableSetNode<V>) => [V, V] | V,
    startNode?: ReverseIterableSetNode<V>
  ): ReverseIterableIterator<any> {
    // Store the this.last node because inside the `reverseIterator()` method, `this` will be
    // bound to the `iterableIterator` method, not the `ReverseIterableSet` object.
    const lastNode = this._lastNode;
    let currentNode = startNode !== undefined ? startNode : this._firstNode;
    let forwards = true;

    return {
      reverseIterator() {
        currentNode = startNode !== undefined ? startNode : lastNode;
        forwards = false;

        // Return the iterable itself.
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
          currentNode = forwards ? currentNode.nextNode : currentNode.prevNode;
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
 */
class ReverseIterableSetNode<V> {
  value: V;
  nextNode: ReverseIterableSetNode<V> | null;
  prevNode: ReverseIterableSetNode<V> | null;
  /**
   * A value that is part of a `ReverseIterableSet` object.
   */
  constructor(value: V) {
    this.value = value;
    this.nextNode = null;
    this.prevNode = null;
  }
}

/**
 * Returns an `IteratorResult` object as per the following rules:
 *
 * - If `value` is not `undefined`, `done` is `false`.
 * - If `value` is `undefined`, `done` is `true`. In this case, `value` may be omitted.
 */
function iteratorResult<T>(value: T): IteratorResult<T> {
  return {
    value: value,
    done: value === undefined
  };
}

/**
 * Custom `IterableIterator` interface including a `reverseIterator` function.
 * Should reverse-iteration make it into ECMAScript, this function would probably be named
 * `[Symbol.reverseIterator]`.
 */
interface ReverseIterableIterator<T> extends IterableIterator<T> {
  reverseIterator(): IterableIterator<T>;
}
