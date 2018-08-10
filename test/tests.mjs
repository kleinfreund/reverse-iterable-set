import { ReverseIterableSet } from '../src/reverse-iterable-set.mjs';
import { TestRunner } from './test-runner.mjs';

function tests() {
  const testRunner = new TestRunner();
  console.group('Tests');
  console.info('Running tests …');

  console.group('ReverseIterableSet constructor');
  const set = new ReverseIterableSet(['1', '2', '3']);
  console.info('> const set = new ReverseIterableSet(["1", "2", "3"])');
  testRunner.assertEqual('set.size', 3, set.size);
  testRunner.assertEqual('set.has("1")', true, set.has('1'));
  testRunner.assertEqual('set.has("2")', true, set.has('2'));
  testRunner.assertEqual('set.has("3")', true, set.has('3'));
  testRunner.assertEqual('set.has("")', false, set.has(''));
  console.groupEnd();

  console.group('ReverseIterableSet.prototype.delete()');
  testRunner.assertEqual('set.delete("2")', true, set.delete('2'));
  testRunner.assertEqual('set.size', 2, set.size);
  testRunner.assertEqual('set.delete("1")', true, set.delete('1'));
  testRunner.assertEqual('set.size', 1, set.size);
  testRunner.assertEqual('set.delete("2")', false, set.delete('2'));
  testRunner.assertEqual('set.delete("3")', true, set.delete('3'));
  testRunner.assertEqual('set.size', 0, set.size);
  console.groupEnd();

  console.group('ReverseIterableSet.prototype.clear()');
  set.add(1).add(2).add(3);
  console.info('> set.add(1).add(2).add(3)');
  testRunner.assertEqual('set.size', 3, set.size);
  set.clear();
  console.info('> set.clear()');
  testRunner.assertEqual('set.size', 0, set.size);
  testRunner.assertEqual('set.has(1)', false, set.has(1));
  testRunner.assertEqual('set.has(2)', false, set.has(2));
  testRunner.assertEqual('set.has(3)', false, set.has(3));
  console.groupEnd();

  console.group('ReverseIterableSet.prototype[Symbol.iterator]()');
  set.add('a').add('b').add('c');
  console.info('> set.add("a").add("b").add("c")');

  testRunner.assertHasOwnProperty('ReverseIterableSet.prototype', Symbol.iterator, ReverseIterableSet.prototype);

  const iterator = set[Symbol.iterator]();
  console.info('> const values = set.values();');
  testRunner.assertHasOwnProperty('iterator', 'next', iterator);
  testRunner.assertHasOwnProperty('iterator', Symbol.iterator, iterator);

  let iteratorNext = iterator.next();
  console.info('> let iteratorNext = values.next();');
  testRunner.assertHasOwnProperty('iteratorNext', 'done', iteratorNext);
  testRunner.assertHasOwnProperty('iteratorNext', 'value', iteratorNext);
  testRunner.assertEqual('iteratorNext.value', 'a', iteratorNext.value);
  testRunner.assertEqual('iteratorNext.done', false, iteratorNext.done);

  iteratorNext = iterator.next();
  console.info('> iteratorNext = iterator.next();');
  testRunner.assertHasOwnProperty('iteratorNext', 'done', iteratorNext);
  testRunner.assertHasOwnProperty('iteratorNext', 'value', iteratorNext);
  testRunner.assertEqual('iteratorNext.value', 'b', iteratorNext.value);
  testRunner.assertEqual('iteratorNext.done', false, iteratorNext.done);

  iteratorNext = iterator.next();
  console.info('> iteratorNext = iterator.next();');
  testRunner.assertHasOwnProperty('iteratorNext', 'done', iteratorNext);
  testRunner.assertHasOwnProperty('iteratorNext', 'value', iteratorNext);
  testRunner.assertEqual('iteratorNext.value', 'c', iteratorNext.value);
  testRunner.assertEqual('iteratorNext.done', false, iteratorNext.done);

  iteratorNext = iterator.next();
  console.info('> iteratorNext = iterator.next();');
  testRunner.assertHasOwnProperty('iteratorNext', 'done', iteratorNext);
  testRunner.assertEqual('iteratorNext.done', true, iteratorNext.done);
  console.groupEnd();

  console.group('ReverseIterableSet.prototype.entries()');
  const entries = set.entries();
  console.info('> const entries = set.entries();');
  testRunner.assertHasOwnProperty('entries', 'next', entries);
  testRunner.assertHasOwnProperty('entries', Symbol.iterator, entries);

  let entriesNext = entries.next();
  console.info('> let entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'a', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', 'a', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'b', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', 'b', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'c', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', 'c', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertEqual('entriesNext.done', true, entriesNext.done);
  console.groupEnd();

  console.group('ReverseIterableSet.prototype.values()');
  const values = set.values();
  console.info('> const values = set.values();');
  testRunner.assertHasOwnProperty('values', 'next', values);
  testRunner.assertHasOwnProperty('values', Symbol.iterator, values);

  let valuesNext = values.next();
  console.info('> let valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', 'a', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', 'b', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', 'c', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertEqual('valuesNext.done', true, valuesNext.done);
  console.groupEnd();

  console.group('ReverseIterableSet.prototype.entries().reverseIterator()');
  const entriesReverse = set.entries().reverseIterator();
  console.info('> const entriesReverse = set.entries().reverseIterator();');
  testRunner.assertHasOwnProperty('entriesReverse', 'next', entriesReverse);
  testRunner.assertHasOwnProperty('entriesReverse', Symbol.iterator, entriesReverse);

  let entriesReverseNext = entriesReverse.next();
  console.info('> let entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'c', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', 'c', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'b', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', 'b', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'a', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', 'a', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', true, entriesReverseNext.done);
  console.groupEnd();

  testRunner.assertEqual('set.toString()', '[object ReverseIterableSet]', set.toString());

  testRunner.printResults();
  console.groupEnd();
}

tests();
