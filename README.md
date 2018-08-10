# reverse-iterable-set

A reverse-iterable set implementation based on the built-in [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.



## Table of Contents

* [Install](#install)
  * [ES Module](#es-module)
  * [Node.js package](#nodejs-package)
* [Usage](#usage)
* [Tests](#tests)
* [Documentation](#documentation)
  * [Constructor](#constructor)
  * [`add()`](#add)
  * [`clear()`](#clear)
  * [`delete()`](#delete)
  * [`entries()`](#entries)
  * [`forEach()`](#foreach)
  * [`forEachReverse()`](#foreachreverse)
  * [`has()`](#has)
  * [`iteratorFor()`](#iteratorfor)
  * [`reverseIterator()`](#reverseiterator)
  * [`values()`](#values)
  * [`[Symbol.iterator]()`](#symboliterator)



## Install

### ES Module

Download only the ES module file:

```shell
curl -O https://raw.githubusercontent.com/kleinfreund/reverse-iterable-set/master/src/reverse-iterable-set.mjs
```

### Node.js package

*(Requires Node version 8.5 or higher for ES module support)*

Installs the node package as a dependency. It doesn’t have any dependencies itself.

```shell
npm install --save reverse-iterable-set
```

Note, that Node.js version 8.5 or higher is required, as it comes with experimental support for ES modules. If you don’t want to use it as an ES module, you will need to transpile the package yourself.

## Usage

```js
import { ReverseIterableSet } from './src/reverse-iterable-set.mjs';

const set = new ReverseIterableSet();
```

For more usage examples, have a look at [kleinfreund.github.io/reverse-iterable-set](https://kleinfreund.github.io/reverse-iterable-set).

You can also run the examples locally after cloning the repository:

```shell
npm install && npm run examples
```



## Tests

**… with Node’s experimental ES module feature**:

```shell
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

* `iterable`: An [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

#### Usage

```js
const set = new ReverseIterableSet([1, 2, 3]);

for (const value of set.reverseIterator()) {
  console.log(value);
}

[...set.reverseIterator()]
```



### `add()`

#### Syntax

```
set.add(value);
```

**Parameters**:

* **value**: Required. The value to add to the `ReverseIterableSet` object.

**Return value**:

* The `ReverseIterableSet` object.

#### Usage

```js
const set = new ReverseIterableSet();

set.add('hey');
//> set

set.add('beauty');
//> set
```

The `add()` method returns a reference to the set object. This makes the `add()` operation chainable.

```js
const set = new ReverseIterableSet()
  .add('key … is spelled like tea')
  .add('hey … somehow ney');
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
```

### `delete()`

#### Syntax

```
set.delete(value);
```

**Parameters**:

* **value**: Required. The value to remove from the `ReverseIterableSet` object.

**Return value**:

* **Boolean**: Returns `true` if the value existed in the `ReverseIterableSet` object and has been removed, or `false` if the value did not exist.

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



### `forEach()`

The `forEach()` method executes a provided function once for each value in the `ReverseIterableSet` object, in insertion order.

#### Syntax

```
set.forEach(callback[, thisArg]);
```

**Parameters**:

* **callback**: Function to execute for each element.
* **thisArg**: Value to use as `this` when executing `callback`.

**Return value**:

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).



### `forEachReverse()`

The `forEachReverse()` method executes a provided function for each value in the `ReverseIterableSet` object, in reverse-insertion order.

#### Syntax

```
set.forEachReverse(callback[, thisArg]);
```

**Parameters**:

* **callback**: Function to execute for each element.
* **thisArg**: Value to use as `this` when executing `callback`.

**Return value**:

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).



### `has()`

#### Syntax

```
set.has(value);
```

**Parameters**:

* **value**: Required. The value to test for presence in the `ReverseIterableSet` object.

**Return value**:

* **Boolean**: Returns `true` if the value exists in the `ReverseIterableSet` object; otherwise `false`.

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

* **value**: Required. The value to start iterating from.

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

const reverseIterator = set.reverseIterator();

reverseIterator.next().value;
//> 4

reverseIterator.next().value;
//> 2

reverseIterator.next().value;
//> 1

reverseIterator.next().value;
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
