import test from 'ava';
import ReverseIterableSet from '../src/reverse-iterable-set';

test('Construct set without argument', t => {
  const set = new ReverseIterableSet();

  t.is(set.size, 0, 'Set is empty.');
});

test('Construct set with another set', t => {
  const set = new Set(
    ['Hello?', 'Are you still there?', 'I see you']
  );
  const set2 = new ReverseIterableSet(set);

  t.true(set instanceof Set);
  t.true(set2 instanceof ReverseIterableSet);

  t.is(set2.size, 3, 'Set has three elements.');
});

test('Construct set with iterable', t => {
  const iterable = ['a', 'b', 'c'].values();
  const set = new ReverseIterableSet(iterable);

  t.is(set.size, 3, 'Set has three elements.');
});

test('set.clear()', t => {
  const iterable = ['a', 'b', 'c'].values();
  const set = new ReverseIterableSet(iterable);

  t.is(set.size, 3, 'Set has three elements.');
  set.clear();
  t.is(set.size, 0, 'Set is empty.');
});

test('set.has()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 1]);

  t.true(set.has('a'));
  t.true(set.has('b'));
  t.true(set.has('c'));
  t.true(set.has(1));
  t.false(set.has('d'));
});

test('set.add()', t => {
  const set = new ReverseIterableSet()
    .add(0)
    .add(1)
    .add(2);

  t.is(set.add(0), set);

  t.true(set.has(0));
  t.true(set.has(1));
  t.true(set.has(2));
  t.false(set.has(3));
});

test('set.add() on set with single element', t => {
  const set = new ReverseIterableSet()
    .add(1)
    .add(2);

  t.deepEqual([...set.values()], [1, 2]);
});

test('set.addFirst()', t => {
  const set = new ReverseIterableSet()
    .add(0)
    .add(1)
    .add(2)
    .addFirst(-1)
    .addFirst(-2)
    .addFirst(-3)
    .addFirst(-4);

  t.is(set.add(0), set);

  t.deepEqual([...set.values()], [-4, -3, -2, -1, 0, 1, 2]);
});

test('set.addFirst() on set with single element', t => {
  const set = new ReverseIterableSet()
    .addFirst(2)
    .addFirst(1);

  t.deepEqual([...set.values()], [1, 2]);
});

test('set.add() first node with existing value', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  t.is(set.add('a'), set);

  t.deepEqual([...set.values()], ['a', 'b', 'c']);
});

test('set.add() last node with existing value', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  t.is(set.add('c'), set);

  t.deepEqual([...set.values()], ['a', 'b', 'c']);
});

test('set.addFirst() first node with existing value', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  t.is(set.addFirst('a'), set);

  t.deepEqual([...set.values()], ['a', 'b', 'c']);
});

test('set.addFirst() last node with existing value', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  t.is(set.addFirst('c'), set);

  t.deepEqual([...set.values()], ['a', 'b', 'c']);
});

test('set.delete() node at the start', t => {
  const set = new ReverseIterableSet([1, 2, 3]);

  t.is(set.size, 3);
  t.deepEqual([...set.values()], [1, 2, 3]);

  t.true(set.delete(1));

  t.is(set.size, 2);
  t.deepEqual([...set.values()], [2, 3]);
});

test('set.delete() node in the middle', t => {
  const set = new ReverseIterableSet([1, 2, 3]);

  t.is(set.size, 3);
  t.deepEqual([...set.values()], [1, 2, 3]);

  t.true(set.delete(2));

  t.is(set.size, 2);
  t.deepEqual([...set.values()], [1, 3]);
});

test('set.delete() node at the end', t => {
  const set = new ReverseIterableSet([1, 2, 3]);

  t.is(set.size, 3);
  t.deepEqual([...set.values()], [1, 2, 3]);

  t.true(set.delete(3));

  t.is(set.size, 2);
  t.deepEqual([...set.values()], [1, 2]);
});

test('set.delete() with a single entry', t => {
  const set = new ReverseIterableSet([1]);

  t.is(set.size, 1);

  t.true(set.delete(1));

  t.is(set.size, 0);
});

test('set.delete() non-existing value', t => {
  const set = new ReverseIterableSet([1]);

  t.is(set.size, 1);

  t.false(set.delete(137));

  t.is(set.size, 1);
});

test('Set[Symbol.toStringTag]()', t => {
  const set = new ReverseIterableSet();

  t.is(set.toString(), '[object ReverseIterableSet]');
});

test('set.forEach() with one-argument-callback', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

  set.forEach(function (value) {
    t.is(this, set);
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));

    lowerCaseCodePoint++;
  }, set);
});

test('set.forEach() with two-argument-callback', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

  set.forEach(function (value1, value2) {
    t.is(value1, String.fromCodePoint(lowerCaseCodePoint));
    t.is(value2, value1);

    lowerCaseCodePoint++;
  });
});

test('set.forEach() with three-argument-callback', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

  set.forEach(function (value1, value2, setReference) {
    t.is(value1, String.fromCodePoint(lowerCaseCodePoint));
    t.is(value2, value1);
    t.is(setReference, set);

    lowerCaseCodePoint++;
  });
});

test('set.forEach() with thisArg', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  const obj = {};

  set.forEach(function () {
    t.is(this, obj);
  }, obj);
});

test('set.forEachReverse() with three-argument-callback and thisArg', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  let lowerCaseCodePoint = 99; // 99 → "c", etc.
  const obj = {};

  set.forEachReverse(function (value1, value2, setReference) {
    t.is(value1, String.fromCodePoint(lowerCaseCodePoint));
    t.is(value2, value1);
    t.is(setReference, set);
    t.is(this, obj);

    lowerCaseCodePoint--;
  }, obj);
});

test('Set[Symbol.iterator]()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  t.true(ReverseIterableSet.prototype.hasOwnProperty(Symbol.iterator));

  const iterator = set[Symbol.iterator]();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'a');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'c');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.reverseIterator()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  const iterator = set.reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'a');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.entries()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  const iterator = set.entries();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'a');
  t.is(iteratorResult.value[1], 'a');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'b');
  t.is(iteratorResult.value[1], 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'c');
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.values()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  const iterator = set.values();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'a');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'c');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.entries().reverseIterator()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c']);

  const iterator = set.entries().reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'c');
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'b');
  t.is(iteratorResult.value[1], 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 'a');
  t.is(iteratorResult.value[1], 'a');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.iteratorFor()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  const iterator = set.iteratorFor('c');
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'd');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'e');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('set.iteratorFor().reverseIterator()', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  const iterator = set.iteratorFor('c').reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'a');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('Spread operator: [...set]', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  t.deepEqual([...set], ['a', 'b', 'c', 'd', 'e']);
});

test('Spread operator: [...set.reverseIterator()]', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  t.deepEqual([...set.reverseIterator()], ['e', 'd', 'c', 'b', 'a']);
});

test('Spread operator: [...set.entries()]', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  t.deepEqual([...set.entries()], [
    ['a', 'a'],
    ['b', 'b'],
    ['c', 'c'],
    ['d', 'd'],
    ['e', 'e']
  ]);
});

test('Spread operator: [...set.values()]', t => {
  const set = new ReverseIterableSet(['a', 'b', 'c', 'd', 'e']);

  t.deepEqual([...set.values()], ['a', 'b', 'c', 'd', 'e']);
});
