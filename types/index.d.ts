/**
 * Custom `IterableIterator` interface including a `reverseIterator` function. Should reverse-iteration make it into ECMAScript, this function would probably be named `[Symbol.reverseIterator]`.
 */
export interface ReverseIterableIterator<V> extends IterableIterator<V> {
	reverseIterator(): IterableIterator<V>
}

/**
 * The `ReverseIterableSetNode` object represents a value in a `ReverseIterableSet` object. Its main purpose is storing the value. Additionally, it keeps references to the `ReverseIterableSetNode` objects appearing before and after itself in a `ReverseIterableSet` object.
 */
export interface ReverseIterableSetNode<V> {
	value: V
	nextNode: ReverseIterableSetNode<V> | null
	prevNode: ReverseIterableSetNode<V> | null
}
