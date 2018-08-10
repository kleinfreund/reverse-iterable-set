/**
 * Extremely basic test runner.
 */
export class TestRunner {
  constructor() {
    this.total = 0;
    this.passed = 0;
  }

  /**
   * Prints the ratio of passed to total tests.
   */
  printResults() {
    console.info(
      `Done. ${this.passed}/${this.total} tests passed. ${
        this.passed === this.total ? '🎉🎉🎉' : ''
      }`
    );
  }

  /**
   * Asserts that a certain expression evaluates to true when comparing with `===`.
   *
   * @param {String} expression
   * @param {*} exptected
   * @param {*} actual
   * @public
   */
  assertEqual(expression, exptected, actual) {
    const condition = exptected === actual;
    console.info(`${expression}: ${actual} === ${exptected}? ${status(condition)}`);

    this.assert(condition, `Expect "${expression}" to be "${exptected}" but it was "${actual}".`);
  }

  /**
   * Asserts that an object has a certain own property.
   *
   * @param {String} expression
   * @param {String|Symbol} property
   * @param {Object} object
   * @public
   */
  assertHasOwnProperty(expression, property, object) {
    const condition = object.hasOwnProperty(property);
    console.info(
      `${expression}: ${expression}.hasOwnProperty(${property.toString()})? ${status(condition)}`
    );

    this.assert(
      condition,
      `Expect "${expression}" to have a property "${property.toString()}" but it doesn’t.`
    );
  }

  /**
   * Calls the `console.assert` function and counts the correct and total assertions.
   *
   * @param {Boolean} condition
   * @param {String} message
   * @private
   */
  assert(condition, message) {
    this.total++;

    if (condition) {
      this.passed++;
    }

    console.assert(condition, message);
  }
};

/**
 * Returns the status mark for a condition.
 *
 * @param {Boolean} condition
 * @returns {'✓'|'✗'} a checkmark if `condition` is true; a ballot x otherwise.
 * @private
 */
function status(condition) {
  return condition ? '✓' : '✗';
}
