# reverse-iterable-set

The `ReverseIterableSet` object is a reverse-iterable set implementation based on the built-in [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.

Links:

- [**npmjs.com**/package/reverse-iterable-set](https://www.npmjs.com/package/reverse-iterable-set)
- [**github.com**/kleinfreund/reverse-iterable-set](https://github.com/kleinfreund/reverse-iterable-set)

See also:


- `ReverseIterableMap`: [reverse-iterable-map](https://www.npmjs.com/package/reverse-iterable-map)
- `ReverseIterableArray`: [reverse-iterable-array](https://www.npmjs.com/package/reverse-iterable-array)



## Table of Contents


- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Tests](#tests)
- [Documentation](#documentation)
  - [Constructor](#constructor)
  - [`size`](#size)
  - [`[Symbol.toStringTag]`](#symboltostringtag)
  - [`add()`](#add)
  - [`addFirst()`](#addFirst)
  - [`clear()`](#clear)
  - [`delete()`](#delete)
  - [`entries()`](#entries)
  - [`forEach()`](#foreach)
  - [`forEachReverse()`](#foreachreverse)
  - [`has()`](#has)
  - [`iteratorFor()`](#iteratorfor)
  - [`reverseIterator()`](#reverseiterator)
  - [`values()`](#values)
  - [`[Symbol.iterator]()`](#symboliterator)



## Installation

```sh
npm install reverse-iterable-set
```



## Usage

```js
import ReverseIterableSet from 'reverse-iterable-set';

const set = new ReverseIterableSet();
```



## Examples

For some live usage examples, clone the repository and run the following:

```sh
npm install
npm start
```

Then, open [localhost:8080/examples](http://127.0.0.1:8080/examples) in a browser.



## Tests

In order to run the tests, clone the repository and run the following:

```sh
npm install
npm test
```



## Documentation

A `ReverseIterableSet` object iterates its elements in insertion or reverse-insertion order — a [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop returns the values for each iteration.



### Constructor

#### Syntax

```
new ReverseIterableSet([iterable])
```

**Parameters**:

- `iterable`: An [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 3]);

for (const value of set.reverseIterator()) {
  console.log(value);
}

[...set.reverseIterator()]
```



### `size`

The `size` accessor property returns the number of values in a `ReverseIterableSet` object.

#### Syntax

```
set.size
```

#### Usage

```js
const set = new ReverseIterableSet(['a', 'b', 'c']);

set.size
//> 3
```



### `[Symbol.toStringTag]`

The `ReverseIterableSet[@@toStringTag]` property has an initial value of “ReverseIterableSet”.



### `add()`

#### Syntax

```
set.add(value);
```

**Parameters**:

- **value**: Required. The value to add to the `ReverseIterableSet` object.

**Return value**:

- The `ReverseIterableSet` object.

#### Usage

```js
const set = new ReverseIterableSet();

set.add('hey');
//> ReverseIterableSet [ "hey" ]

set.add('beauty');
//> ReverseIterableSet [ "hey", "beauty" ]

set.add('hey');
//> ReverseIterableSet [ "hey", "beauty" ]
```

The `add()` method returns a reference to the set object. This makes the `add()` operation chainable.

```js
const set = new ReverseIterableSet()
  .add('key … is spelled like tea')
  .add('hey … somehow ney');
//> ReverseIterableSet [ "key … is spelled like tea", "hey … somehow ney" ]
```



### `clear()`

#### Syntax

```
set.clear();
```

**Return value**:

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Usage

```js
// Clears the underlying map object (yes, this is correct)
// Sets the first and last node references to null
set.clear();
//> undefined
```

### `delete()`

#### Syntax

```
set.delete(value);
```

**Parameters**:

- **value**: Required. The value to remove from the `ReverseIterableSet` object.

**Return value**:

- **Boolean**: Returns `true` if the value existed in the `ReverseIterableSet` object and has been removed, or `false` if the value did not exist.

#### Usage

```js
const set = new ReverseIterableSet(['1', '2']);

set.delete('1');
//> true

set.delete('2');
//> true

set.delete('2');
//> false
```



### `entries()`

Returns an iterator containing the `[value, value]` pairs for each value in the `ReverseIterableSet` object in insertion order.

An iterator containing the same pairs in reverse-insertion order can be obtained with `entries().reverseIterator()`.

#### Syntax

```
set.entries();
```

**Return value**:

A new `ReverseIterableSet` iterator object.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 4]);

const iterator = set.entries();

iterator.next().value;
//> [1, 1]

iterator.next().value;
//> [2, 2]

iterator.next().value;
//> [4, 4]

iterator.next().value;
//> undefined
```



### `forEach()`

The `forEach()` method executes a provided function once for each value in the `ReverseIterableSet` object, in insertion order.

#### Syntax

```
set.forEach(callback[, thisArg]);
```

**Parameters**:

- **callback**: Function to execute for each element.
- **thisArg**: Value to use as `this` when executing `callback`.

**Return value**:

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Usage

```js
const set = new ReverseIterableSet(['a', 'b', 'c']);

set.forEach(value => {
  console.log(value);
});
//> a
//> b
//> c

set.forEach(function (value1, value2, setReference) {
  console.log(value1, value2, setReference.size);
});
//> a a 3
//> b b 3
//> c c 3
```



### `forEachReverse()`

The `forEachReverse()` method executes a provided function for each value in the `ReverseIterableSet` object, in reverse-insertion order.

#### Syntax

```
set.forEachReverse(callback[, thisArg]);
```

**Parameters**:

- **callback**: Function to execute for each element.
- **thisArg**: Value to use as `this` when executing `callback`.

**Return value**:

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Usage

```js
const set = new ReverseIterableSet(['a', 'b', 'c']);

set.forEachReverse(value => {
  console.log(value);
});
//> c
//> b
//> a

set.forEachReverse(function (value1, value2, setReference) {
  console.log(value1, value2, setReference.size);
});
//> c c 3
//> b b 3
//> a a 3
```



### `has()`

#### Syntax

```
set.has(value);
```

**Parameters**:

- **value**: Required. The value to test for presence in the `ReverseIterableSet` object.

**Return value**:

- **Boolean**: Returns `true` if the value exists in the `ReverseIterableSet` object; otherwise `false`.

#### Usage

```js
const set = new ReverseIterableSet(['hey', 'beauty']);

set.has('hey');
//> true

set.has('beauty');
//> true

set.has('beast');
//> false
```



### `iteratorFor()`

Returns an iterator containing the values in the `ReverseIterableSet` object in insertion order **starting with the value specified by the `value` parameter**.

This allows starting iteration at a specific value in the `ReverseIterableSet` object.

An iterator containing the same values in reverse-insertion order can be obtained with `iteratorFor().reverseIterator()`.

#### Syntax

```
set.iteratorFor(value);
```

**Parameters**:

- **value**: Required. The value to start iterating from.

**Return value**:

A new `ReverseIterableSet` iterator object.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 4]);

// Iterator, starting at the element with key 1.
const iterator = set.iteratorFor(2);

iterator.next().value;
//> 2

iterator.next().value;
//> 4

iterator.next().value;
//> undefined

// Reverse-iterator, starting at the element with key 1.
const reverseIterator = set.iteratorFor(2).reverseIterator();

reverseIterator.next().value;
//> 2

reverseIterator.next().value;
//> 1

reverseIterator.next().value;
//> undefined
```



### `reverseIterator()`

In theory, following the semantics of `[Symbol.iterator]()`, this should be `[Symbol.reverseIterator]()`. However, as a developer, I cannot define a well-known symbol myself and make use of it. For the time being, the `reverseIterator()` function serves the same purpose.

#### Syntax

```
set.reverseIterator();
```

**Return value**:

The set **reverse-iterator** function, which is the `values().reverseIterator()` function by default.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 4]);

const iterator = set.reverseIterator();

iterator.next().value;
//> 4

iterator.next().value;
//> 2

iterator.next().value;
//> 1

iterator.next().value;
//> undefined
```



### `values()`

Returns an iterator containing the values in the `ReverseIterableSet` object in insertion order.

An iterator containing the same values in reverse-insertion order can be obtained with `values().reverseIterator()`.

#### Syntax

```
set.values();
```

**Return value**:

A new `ReverseIterableSet` iterator object.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 4]);

const iterator = set.values();

iterator.next().value;
//> 1

iterator.next().value;
//> 2

iterator.next().value;
//> 4

iterator.next().value;
//> undefined
```



### `[Symbol.iterator]()`

Returns the set iterator function. By default, this is the `values()` function.

#### Syntax

```
set[Symbol.iterator]();
```

**Return value**:

The set **iterator** function, which is the `values()` function by default.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 4]);

const iterator = set[Symbol.iterator]();

iterator.next().value;
//> 1

iterator.next().value;
//> 2

iterator.next().value;
//> 4

iterator.next().value;
//> undefined
```
