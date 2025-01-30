import playerManager from "../entities/player/playerManager";

/** @namespace Utilities */

/** @memberof Utilities */
const PI = Math.PI;
/** @memberof Utilities */
const PI2 = Math.PI * 2;
/** @memberof Utilities */
const ATAN2 = Math.atan2;
/** @memberof Utilities */
const HYPOT = Math.hypot;
/** @memberof Utilities */
const ABS = Math.abs;
/** @memberof Utilities */
const SIN = Math.sin;
/** @memberof Utilities */
const COS = Math.cos;
/** @memberof Utilities */
const TAN = Math.tan;
/**
 *
 * @memberof Utilities
 * @param {number} num - Number to grow exponentially.
 * @returns {number}
 */
const POW = (num) => num ** 2;
/** @memberof Utilities */
const SQRT = Math.sqrt;
/** @memberof Utilities */
const RANDOM = Math.random;
/**
 *
 * @memberof Utilities
 * @param {number} num - Number to round down.
 * @returns {number}
 */
const FLOOR = (num) => ~~num;
/** @memberof Utilities */
const CEIL = Math.ceil;

/**
 *
 * @name Max.
 * @description Returns the maximum of 2 sets of numbers.
 * @memberof Utilities
 * @param {number} a - First number to compare.
 * @param {number} b - Second number to compare.
 * @returns {number}
 */
const MAX = (a, b) => {
	if (a > b) return a;
	return b;
};

/**
 *
 * @name Min.
 * @description Returns the minimum of 2 sets of numbers.
 * @memberof Utilities
 * @param {number} a - First number to compare.
 * @param {number} b - Second number to compare.
 * @returns {number}
 */
const MIN = (a, b) => {
	if (a < b) return a;
	return b;
};

/**
 *
 * @name Random Integer.
 * @description Returns a random number, rounded down to the nearest whole number.
 * @memberof Utilities
 * @param {number} min - The smallest the number can be.
 * @param {number} max - The largest the number can be.
 * @returns {number}
 */
const randInt = (min, max) => {
	return FLOOR(RANDOM() * (max - min + 1)) + min;
};

/**
 *
 * @name Random Float.
 * @description Returns the maximum of 2 sets of numbers.
 * @memberof Utilities
 * @param {number} min - The smallest the number can be.
 * @param {number} max - The largest the number can be.
 * @returns {number}
 */
const randFloat = (min, max) => {
	return RANDOM() * (max - min + 1) + min;
};

// these 2 arent even used right now, ignore
const lerp = (value1, value2, amount) => {
	return value1 + (value2 - value1) * amount;
};

const decel = (val, cel) => {
	let result;
	if (val > 0) result = Math.max(0, val - cel);
	else if (val < 0) result = Math.min(0, val + cel);
	return result;
};

/**
 *
 * @name Get Distance.
 * @description Returns the distance between 2 points in the world in (...) distance.
 * @memberof Utilities
 * @param {number} a - First set of coordinates.
 * @param {number} b - Second set of coordinates.
 * @returns {number}
 */
const getDistance = (a, b) => {
	return (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]);
};

/**
 *
 * @name Square.
 * @description Squares a number.
 * @memberof Utilities
 * @param {number} number - Number to be squared.
 * @returns {number}
 */
const getSquared = (number) => number ** 2;

/**
 *
 * @name Get Direction.
 * @description returns the direction between 2 points in the world in radians.
 * @memberof Utilities
 * @param {number} x1 - Gonna rewrite this function later.
 * @param {number} y1 - Gonna rewrite this function later.
 * @param {number} x2 - Gonna rewrite this function later.
 * @param {number} y2 - Gonna rewrite this function later.
 * @returns {number}
 */
const getDirection = (x1, y1, x2, y2) => {
	return ATAN2(y1 - y2, x1 - x2);
};

/**
 *
 * @name Get Angle Difference.
 * @description Returns the difference of radians between 2 angles.
 * @memberof Utilities
 * @param {number} a - First angle.
 * @param {number} b - Second angle.
 * @returns {number}
 */
const getAngleDist = (a, b) => {
	const p = ABS(b - a) % (PI * 2);
	return p > PI ? PI * 2 - p : p;
};

/**
 *
 * @name Is number.
 * @description Returns if the input is a number.
 * @memberof Utilities
 * @param {number} n - Value to check.
 * @returns {boolean}
 */
const isNumber = (n) => {
	return typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n);
};

// ignore i dont give a fuck about this
const fixTo = (n, v) => {
	return Number.parseFloat(n.toFixed(v));
};

export default {
	PI,
	PI2,
	ATAN2,
	HYPOT,
	ABS,
	SIN,
	COS,
	TAN,
	POW,
	SQRT,
	RANDOM,
	FLOOR,
	CEIL,
	MAX,
	MIN,
	randInt,
	randFloat,
	lerp,
	decel,
	getDistance,
	getSquared,
	getDirection,
	getAngleDist,
	isNumber,
	fixTo,
};
