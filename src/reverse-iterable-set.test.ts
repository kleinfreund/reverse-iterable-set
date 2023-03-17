import ReverseIterableSet from './reverse-iterable-set';

describe('ReverseIterableSet', () => {
	test('Construct set without argument', () => {
		const set = new ReverseIterableSet();

		expect(set.size).toBe(0);
	});

	test('Construct set with another set', () => {
		const set = new Set(
			['Hello?', 'Are you still there?', 'I see you']
		);
		const set2 = new ReverseIterableSet(set);

		expect(set instanceof Set).toBe(true);
		expect(set2 instanceof ReverseIterableSet).toBe(true);

		expect(set2.size).toBe(3);
	});

	test('Construct set with iterable', () => {
		const iterable = ['a', 'b', 'c'].values();
		const set = new ReverseIterableSet(iterable);

		expect(set.size).toBe(3);
	});

	test('Construct set with array', () => {
		const array = ['a', 'b', 'c'];
		const set = new ReverseIterableSet(array);

		expect(set.size).toBe(3);
	});

	test('Construct set with array (readonly)', () => {
		/** @type {ReadonlyArray<string>} */
		const array = ['a', 'b', 'c'];
		const set = new ReverseIterableSet(array);

		expect(set.size).toBe(3);
	});

	test('set.clear()', () => {
		const iterable = ['a', 'b', 'c'].values();
		const set = new ReverseIterableSet(iterable);

		expect(set.size).toBe(3);
		set.clear();
		expect(set.size).toBe(0);
	});

	test('set.has()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 1]);

		expect(set.has('a')).toBe(true);
		expect(set.has('b')).toBe(true);
		expect(set.has('c')).toBe(true);
		expect(set.has(1)).toBe(true);
		expect(set.has('d')).toBe(false);
	});

	test('set.add()', () => {
		const set = new ReverseIterableSet()
			.add(0)
			.add(1)
			.add(2);

		expect(set.add(0)).toBe(set);

		expect(set.has(0)).toBe(true);
		expect(set.has(1)).toBe(true);
		expect(set.has(2)).toBe(true);
		expect(set.has(3)).toBe(false);
	});

	test('set.add() on set with single element', () => {
		const set = new ReverseIterableSet()
			.add(1)
			.add(2);

		expect([...set.values()]).toEqual([1, 2]);
	});

	test('set.addFirst()', () => {
		const set = new ReverseIterableSet()
			.add(0)
			.add(1)
			.add(2)
			.addFirst(-1)
			.addFirst(-2)
			.addFirst(-3)
			.addFirst(-4);

		expect(set.add(0)).toBe(set);

		expect([...set.values()]).toEqual([-4, -3, -2, -1, 0, 1, 2]);
	});

	test('set.addFirst() on set with single element', () => {
		const set = new ReverseIterableSet()
			.addFirst(2)
			.addFirst(1);

		expect([...set.values()]).toEqual([1, 2]);
	});

	test('set.add() first node with existing value', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		expect(set.add('a')).toBe(set);

		expect([...set.values()]).toEqual(['a', 'b', 'c']);
	});

	test('set.add() last node with existing value', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		expect(set.add('c')).toBe(set);

		expect([...set.values()]).toEqual(['a', 'b', 'c']);
	});

	test('set.addFirst() first node with existing value', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		expect(set.addFirst('a')).toBe(set);

		expect([...set.values()]).toEqual(['a', 'b', 'c']);
	});

	test('set.addFirst() last node with existing value', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		expect(set.addFirst('c')).toBe(set);

		expect([...set.values()]).toEqual(['a', 'b', 'c']);
	});

	test('set.delete() node at the start', () => {
		const set = new ReverseIterableSet([1, 2, 3]);

		expect(set.size).toBe(3);
		expect([...set.values()]).toEqual([1, 2, 3]);

		expect(set.delete(1)).toBe(true);

		expect(set.size).toBe(2);
		expect([...set.values()]).toEqual([2, 3]);
	});

	test('set.delete() node in the middle', () => {
		const set = new ReverseIterableSet([1, 2, 3]);

		expect(set.size).toBe(3);
		expect([...set.values()]).toEqual([1, 2, 3]);

		expect(set.delete(2)).toBe(true);

		expect(set.size).toBe(2);
		expect([...set.values()]).toEqual([1, 3]);
	});

	test('set.delete() node at the end', () => {
		const set = new ReverseIterableSet([1, 2, 3]);

		expect(set.size).toBe(3);
		expect([...set.values()]).toEqual([1, 2, 3]);

		expect(set.delete(3)).toBe(true);

		expect(set.size).toBe(2);
		expect([...set.values()]).toEqual([1, 2]);
	});

	test('set.delete() with a single entry', () => {
		const set = new ReverseIterableSet([1]);

		expect(set.size).toBe(1);

		expect(set.delete(1)).toBe(true);

		expect(set.size).toBe(0);
	});

	test('set.delete() non-existing value', () => {
		const set = new ReverseIterableSet([1]);

		expect(set.size).toBe(1);

		expect(set.delete(137)).toBe(false);

		expect(set.size).toBe(1);
	});

	test('Set[Symbol.toStringTag]()', () => {
		const set = new ReverseIterableSet();

		expect(set.toString()).toBe('[object ReverseIterableSet]');
	});

	test('set.forEach() with one-argument-callback', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

		function callbackFn(this: any, value: any) {
			expect(this).toBe(set);
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint));

			lowerCaseCodePoint++;
		}

		set.forEach(callbackFn, set);
	});

	test('set.forEach() with two-argument-callback', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

		set.forEach(function (value1, value2) {
			expect(value1).toBe(String.fromCodePoint(lowerCaseCodePoint));
			expect(value2).toBe(value1);

			lowerCaseCodePoint++;
		});
	});

	test('set.forEach() with three-argument-callback', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

		function callbackFn(value1: any, value2: any, setReference: any) {
			expect(value1).toBe(String.fromCodePoint(lowerCaseCodePoint));
			expect(value2).toBe(value1);
			expect(setReference).toBe(set);

			lowerCaseCodePoint++;
		}
		set.forEach(callbackFn);
	});

	test('set.forEach() with thisArg', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		const obj = {};

		function callbackFn(this: any) {
			expect(this).toBe(obj);
		}
		set.forEach(callbackFn, obj);
	});

	test('set.forEachReverse() with three-argument-callback and thisArg', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		let lowerCaseCodePoint = 99; // 99 → "c", etc.
		const obj = {};

		function callbackFn(this: any, value1: any, value2: any, setReference: any) {
			expect(value1).toBe(String.fromCodePoint(lowerCaseCodePoint));
			expect(value2).toBe(value1);
			expect(setReference).toBe(set);
			expect(this).toBe(obj);

			lowerCaseCodePoint--;
		}
		set.forEachReverse(callbackFn, obj);
	});

	test('Set[Symbol.iterator]()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		expect(ReverseIterableSet.prototype.hasOwnProperty(Symbol.iterator)).toBe(true);

		const iterator = set[Symbol.iterator]();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.reverseIterator()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		const iterator = set.reverseIterator();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.entries()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		const iterator = set.entries();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);
		expect(Array.isArray(iteratorResult.value)).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('a');
		expect(iteratorResult.value[1]).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('b');
		expect(iteratorResult.value[1]).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('c');
		expect(iteratorResult.value[1]).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.values()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		const iterator = set.values();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.entries().reverseIterator()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c']);

		const iterator = set.entries().reverseIterator();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);
		expect(Array.isArray(iteratorResult.value)).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('c');
		expect(iteratorResult.value[1]).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('b');
		expect(iteratorResult.value[1]).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value[0]).toBe('a');
		expect(iteratorResult.value[1]).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.iteratorFor()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		const iterator = set.iteratorFor('c');
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('d');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('e');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('set.iteratorFor().reverseIterator()', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		const iterator = set.iteratorFor('c').reverseIterator();
		expect(iterator.hasOwnProperty('next')).toBe(true);

		let iteratorResult = iterator.next();

		expect(iteratorResult.hasOwnProperty('done')).toBe(true);
		expect(iteratorResult.hasOwnProperty('value')).toBe(true);

		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('c');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('b');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(false);
		expect(iteratorResult.value).toBe('a');

		iteratorResult = iterator.next();
		expect(iteratorResult.done).toBe(true);
		expect(iteratorResult.value).toBe(undefined);
	});

	test('Spread operator: [...set]', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		expect([...set]).toEqual(['a', 'b', 'c', 'd', 'e']);
	});

	test('Spread operator: [...set.reverseIterator()]', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		expect([...set.reverseIterator()]).toEqual(['e', 'd', 'c', 'b', 'a']);
	});

	test('Spread operator: [...set.entries()]', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		expect([...set.entries()]).toEqual([
			['a', 'a'],
			['b', 'b'],
			['c', 'c'],
			['d', 'd'],
			['e', 'e']
		]);
	});

	test('Spread operator: [...set.values()]', () => {
		const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

		expect([...set.values()]).toEqual(['a', 'b', 'c', 'd', 'e']);
	});
});
