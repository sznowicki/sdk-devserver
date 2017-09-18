/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Tests if the prop is an string.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isString = prop =>
  (typeof prop === 'string')
;

/**
 * Tests if the prop is an object.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isObject = prop =>
  (typeof prop === 'object') && (prop !== null)
;

/**
 * Tests if something is an array.
 * @type {boolean}
 */
const isArray = Array.isArray;

/**
 * Tests if the prop is a number.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isNumber = prop =>
  (typeof prop === 'number') && isFinite(prop)
;

/**
 * Tests if the prop is an integer.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isInteger = prop =>
  isNumber(prop) && prop % 1 === 0
;

/**
 * Tests if the prop is boolean.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isBoolean = prop =>
  typeof prop === 'boolean'
;

/**
 * Tests if the prop is function.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isFunction = prop =>
  typeof prop === 'function'
;

/**
 * Tests if the prop is a promise.
 * @param {any} prop The property to test.
 * @return {boolean}
 */
const isPromise = prop =>
  prop !== null &&
   (typeof prop === 'object' || typeof prop === 'function') &&
    typeof prop.then === 'function'
;

module.exports = {
  isString,
  isObject,
  isArray,
  isNumber,
  isInteger,
  isBoolean,
  isFunction,
  isPromise,
};
