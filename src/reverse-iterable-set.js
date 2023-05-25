/**
 * @template V
 * @typedef {import('../types/index.d.js').ReverseIterableIterator<V>} ReverseIterableIterator
 */
/**
 * @template V
 * @typedef {import('../types/index.d.js').ReverseIterableSetNode<V>} ReverseIterableSetNode
 */

/**
 * A reverse-iterable set implementation based on the built-in [`Set`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. Like `Set`, the order of `ReverseIterableSet` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *
 * @template V
 */
export default class ReverseIterableSet {
	/** @type {Map<V, ReverseIterableSetNode<V>>} */ _setMap
	/** @type {ReverseIterableSetNode<V> | null} */ _firstNode
	/** @type {ReverseIterableSetNode<V> | null} */ _lastNode

	/**
	 * An [iterable][1] object that accepts any value as elements.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
	 *
	 * @param {Iterable<V>} [iterable]
	 */
	constructor(iterable) {
		this._setMap = new Map()
		this._firstNode = null
		this._lastNode = null

		if (iterable !== undefined) {
			for (const element of iterable) {
				this.add(element)
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
	get [Symbol.toStringTag]() {
		return 'ReverseIterableSet'
	}

	/**
	 * The `size` accessor property returns the number of elements in a `ReverseIterableSet` object.
	 *
	 * @returns the size of the `ReverseIterableSet` object.
	 */
	get size() {
		return this._setMap.size
	}

	/**
	 * The `clear()` method removes all elements from a `ReverseIterableSet` object.
	 */
	clear() {
		this._setMap.clear()
		this._firstNode = null
		this._lastNode = null
	}

	/**
	 * The `has()` method returns a boolean indicating whether `value` exists in the set.
	 *
	 * @param {V} value
	 * @returns {boolean} `true` if an element with the specified key exists in a
	 * `ReverseIterableSet` object otherwise `false`.
	 */
	has(value) {
		return this._setMap.has(value)
	}

	/**
	 * The `add()` method adds a new value to a `ReverseIterableSet` object in insertion order.
	 *
	 * @param {V} value The value to add to the `ReverseIterableSet` object.
	 * @returns the `ReverseIterableSet` object.
	 */
	add(value) {
		if (this.has(value)) {
			return this
		}

		/** @type {ReverseIterableSetNode<V>} */ const node = {
			value: value,
			nextNode: null,
			prevNode: null,
		}
		this._setMap.set(value, node)

		// If there is already a last node it needs to be linked with the new node.
		if (this._lastNode !== null) {
			node.prevNode = this._lastNode
			this._lastNode.nextNode = node
		}

		// If there is only one entry in the map, set the first node reference.
		if (this._firstNode === null) {
			this._firstNode = node
		}

		this._lastNode = node

		return this
	}

	/**
	 * The `addFirst()` method adds a new value to a `ReverseIterableSet` object in
	 * reverse insertion order or updates the value of an existing value.
	 *
	 * @param {V} value The value to add to the `ReverseIterableSet` object.
	 * @returns {this} the `ReverseIterableSet` object.
	 */
	addFirst(value) {
		if (this.has(value)) {
			return this
		}

		/** @type {ReverseIterableSetNode<V>} */ const node = {
			value: value,
			nextNode: null,
			prevNode: null,
		}
		this._setMap.set(value, node)

		// If there is already a first node it needs to be linked with the new node.
		if (this._firstNode !== null) {
			node.nextNode = this._firstNode
			this._firstNode.prevNode = node
		}

		// If there is only one entry in the map, set the last node reference.
		if (this._lastNode === null) {
			this._lastNode = node
		}

		this._firstNode = node

		return this
	}

	/**
	 * The `delete()` method removes the specified value from a `ReverseIterableSet` object.
	 *
	 * @param {V} value The value to remove from the `ReverseIterableSet` object.
	 * @returns {boolean} `true` if a value in the `ReverseIterableSet` object existed and has been
	 * removed or `false` if the value did not exist.
	 */
	delete(value) {
		const node = this._setMap.get(value)

		if (node === undefined) {
			return false
		}

		if (node.prevNode !== null && node.nextNode !== null) {
			// `node` is in the middle.
			node.prevNode.nextNode = node.nextNode
			node.nextNode.prevNode = node.prevNode
		}
		else if (node.prevNode !== null) {
			// `node` is the last node a new last node needs to be linked.
			node.prevNode.nextNode = null
			this._lastNode = node.prevNode
		}
		else if (node.nextNode !== null) {
			// `node` is the first node a new first node needs to linked.
			node.nextNode.prevNode = null
			this._firstNode = node.nextNode
		}
		else {
			// `node` is the first and last node.
			// Both first and last node reference need to be unset.
			this._firstNode = null
			this._lastNode = null
		}

		return this._setMap.delete(value)
	}

	/**
	 * The `forEach()` method executes a provided function once per each value/value pair in the
	 * `ReverseIterableSet` object, in insertion order. For reference, see
	 * [`Set.prototype.forEach`][1].
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
	 *
	 * @param {(value2: V, value1: V, set: ReverseIterableSet<V>) => void} callbackfn
	 * @param {any} [thisArg]
	 */
	forEach(callbackfn, thisArg) {
		for (const [value1, value2] of this.entries()) {
			callbackfn.call(thisArg, value2, value1, this)
		}
	}

	/**
	 * The `forEachReverse()` method executes a provided function once per each value/value pair in
	 * the `ReverseIterableSet` object, in reverse insertion order.
	 *
	 * @param {(value2: V, value1: V, set: ReverseIterableSet<V>) => void} callbackfn
	 * @param {any} [thisArg]
	 */
	forEachReverse(callbackfn, thisArg) {
		for (const [value1, value2] of this.entries().reverseIterator()) {
			callbackfn.call(thisArg, value2, value1, this)
		}
	}

	/**
	 * The initial value of the [@@iterator][1] property is the same function object as the initial
	 * value of the `values` property.
	 *
	 * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
	 *
	 * @returns {ReverseIterableIterator<V>} an iterable iterator for the `ReverseIterableSet` object.
	 */
	[Symbol.iterator]() {
		return this.values()
	}

	/**
	 * Allows using the [iteration protocols][1] for reverse iteration.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
	 *
	 *  @returns {IterableIterator<V>} a reverse iterable iterator for the `ReverseIterableSet` object.
	 */
	reverseIterator() {
		return this.values().reverseIterator()
	}

	/**
	 * The `entries()` method returns a new [Iterator][1] object that contains the `[value, value]`
	 * pairs for each value in a `ReverseIterableSet` object in insertion order.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @returns {ReverseIterableIterator<[V, V]>} an iterable iterator for the `ReverseIterableSet` object.
	 */
	entries() {
		const getIteratorValue = /** @type {(node: ReverseIterableSetNode<V>) => [V, V]} */ (node) => [node.value, node.value]

		return this._iterableIterator(getIteratorValue)
	}

	/**
	 * The `values()` method returns a new [Iterator][1] object that contains the values in a
	 * `ReverseIterableSet` object in insertion order.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @returns {ReverseIterableIterator<V>} an iterable iterator for the `ReverseIterableSet` object.
	 */
	values() {
		const getIteratorValue = /** @type {(node: ReverseIterableSetNode<V>) => V} */ (node) => node.value

		return this._iterableIterator(getIteratorValue)
	}

	/**
	 * The `iteratorFor()` method returns a new [Iterator][1] object that contains the
	 * `[value, value]` pairs for each element in a `ReverseIterableSet` object in insertion order
	 *  **starting with the pair specified by the `value` parameter**.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @param {V} value The value to start iterating from.
	 * @returns {ReverseIterableIterator<V>} an iterable iterator for the `ReverseIterableSet` object.
	 */
	iteratorFor(value) {
		let startNode = this._setMap.get(value)
		const getIteratorValue = /** @type {(node: ReverseIterableSetNode<V>) => V} */ (node) => node.value

		return this._iterableIterator(getIteratorValue, startNode)
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
	 * @param {(node: ReverseIterableSetNode<V>) => [V, V] | V} getIteratorValue
	 * @param {ReverseIterableSetNode<V>} [startNode] Node to start iterating from
	 * @returns {ReverseIterableIterator<any>} a reverse-iterable iterator
	 */
	_iterableIterator(getIteratorValue, startNode) {
		// Store the this.last node because inside the `reverseIterator()` method, `this` will be
		// bound to the `iterableIterator` method, not the `ReverseIterableSet` object.
		const lastNode = this._lastNode
		let currentNode = startNode !== undefined ? startNode : this._firstNode
		let forwards = true

		return {
			reverseIterator() {
				currentNode = startNode !== undefined ? startNode : lastNode
				forwards = false

				// Return the iterable itself.
				return this
			},

			[Symbol.iterator]() {
				// Return the iterable itself.
				return this
			},

			next() {
				let value

				if (currentNode) {
					value = getIteratorValue(currentNode)
					currentNode = forwards ? currentNode.nextNode : currentNode.prevNode
				}

				return {
					value: value,
					done: value === undefined,
				}
			}
		}
	}
}
