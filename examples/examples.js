import ReverseIterableSet from '../dist/reverse-iterable-set.js'

Object.defineProperty(window, 'ReverseIterableSet', { value: ReverseIterableSet })

/**
 * Recursive algorithm to stringify arrays and their content in order to print them like dev tools.
 *
 * ```js
 * stringify(['1', '2', '3'])
 * //> [ "1", "2", "3" ]
 *
 * stringify([1, '2', undefined, '3', [4, 5, 6]])
 * //> [ 1, "2", undefined, "3", [ 4, 5, 6 ] ]
 * ```
 *
 * @param {any} input
 * @returns {string}
 */
function stringify(input) {
	if (Array.isArray(input)) {
		const stringArray = []
		for (const element of input) {
			stringArray.push(stringify(element))
		}

		return `[ ${stringArray.join(', ')} ]`
	} else if (typeof input === 'string') {
		return `"${input}"`
	}

	return String(input)
}

/**
 * @param {string} command
 */
function printCommand(command) {
	printCodeBlock(command, 'command')
}

/**
 * @param {any[]} args
 */
function printOutput(...args) {
	const output = args.map(arg => stringify(arg))
	printCodeBlock(output.join(' '), 'output')
}

/**
 * @param {any[]} args
 */
function printLog(...args) {
	const output = args.map(arg => Array.isArray(arg) ? stringify(arg) : String(arg))
	printCodeBlock(output.join(' '), 'log')
}

/**
 * @param {string} content
 * @param {string[]} classNames
 */
function printCodeBlock(content, ...classNames) {
	let concatenatedLines = ''
	for (const line of content.trim().split('\n')) {
		concatenatedLines += `<code>${line}</code>\n`
	}

	document.body.insertAdjacentHTML(
		'beforeend',
		`<pre class="${classNames.join(' ')}">${concatenatedLines}</pre>`
	)
}

function printExamples() {
	printCommand('const set = new ReverseIterableSet(["1", "2", "3"])')
	const set = new ReverseIterableSet(['1', '2', '3'])
	printOutput(set)

	printCommand(`
for (const value of set) {
	console.log(value)
}
	`)

	for (const value of set) {
		printLog(value)
	}

	printCommand(`
for (const value of set.reverseIterator()) {
	console.log(value)
}
	`)
	for (const value of set.reverseIterator()) {
		printLog(value)
	}

	printCommand(`
for (const value of set.values()) {
	console.log(value)
}
	`)
	for (const value of set.values()) {
		printLog(value)
	}

	printCommand(`
for (const value of set.values().reverseIterator()) {
	console.log(value)
}
	`)
	for (const value of set.values().reverseIterator()) {
		printLog(value)
	}

	printCommand(`
for (const [value1, value2] of set.entries()) {
	console.log(value1, ":", value2)
}
	`)
	for (const [value1, value2] of set.entries()) {
		printLog(value1, ':', value2)
	}

	printCommand(`
for (const [value1, value2] of set.entries().reverseIterator()) {
	console.log(value1, ":", value2)
}
	`)
	for (const [value1, value2] of set.entries().reverseIterator()) {
		printLog(value1, ':', value2)
	}

	printCommand('[...set]')
	printOutput([...set])

	printCommand('[...set.reverseIterator()]')
	printOutput([...set.reverseIterator()])

	printCommand('[...set.values()]')
	printOutput([...set.values()])

	printCommand('[...set.values().reverseIterator()]')
	printOutput([...set.values().reverseIterator()])

	printCommand('[...set.entries()]')
	printOutput([...set.entries()])

	printCommand('[...set.entries().reverseIterator()]')
	printOutput([...set.entries().reverseIterator()])

	printCommand('set.size')
	printOutput(set.size)

	printCommand('set.delete("2")')
	printOutput(set.delete('2'))

	printCommand('set.size')
	printOutput(set.size)

	printCommand(`
set
	.add("2")
	.add("4")
	.addFirst("37")
	.add("5")
	`)
	set
		.add('2')
		.add('4')
		.addFirst('37')
		.add('5')

	printCommand('[...set.values()]')
	printOutput([...set.values()])

	printCommand('set.size')
	printOutput(set.size)

	printCommand('const it = set.iteratorFor("3").reverseIterator()')
	const it = set.iteratorFor('3').reverseIterator()
	printOutput(it)

	printCommand('it.next().value')
	printOutput(it.next().value)
	printCommand('it.next().value')
	printOutput(it.next().value)
	printCommand('it.next().value')
	printOutput(it.next().value)
	printCommand('it.next().value')
	printOutput(it.next().value)

	printCommand(`
set.forEach(value => {
	console.log(value)
})
	`)
	set.forEach(value => {
		printLog(value)
	})

	printCommand(`
set.forEachReverse(value => {
	console.log(value)
})
	`)
	set.forEachReverse(value => {
		printLog(value)
	})

	printCommand('set.toString()')
	printOutput(set.toString())

	document.body.insertAdjacentHTML('beforeend', '<hr>')

	printCommand('const set2 = new ReverseIterableSet([..."hello"])')
	const set2 = new ReverseIterableSet([...'hello'])
	printOutput(set2)

	printCommand('[...set2]')
	printOutput([...set2])

	printCommand('const it2 = set2.iteratorFor("l")')
	const it2 = set2.iteratorFor('l')
	printOutput(it2)

	printCommand('it2.next().value')
	printOutput(it2.next().value)
	printCommand('it2.next().value')
	printOutput(it2.next().value)
	printCommand('it2.next().value')
	printOutput(it2.next().value)
}

printExamples()
