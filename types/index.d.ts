/**
 * Custom `IterableIterator` interface including a `reverseIterator` function.
 * Should reverse-iteration make it into ECMAScript, this function would probably be named
 * `[Symbol.reverseIterator]`.
 */
export interface ReverseIterableIterator<T> extends IterableIterator<T> {
	reverseIterator(): IterableIterator<T>
}
