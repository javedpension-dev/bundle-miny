import playerManager from "../entities/player/playerManager";

const PI = Math.PI;
const PI2 = Math.PI * 2;
const ATAN2 = Math.atan2;
const HYPOT = Math.hypot;
const ABS = Math.abs;
const SIN = Math.sin;
const COS = Math.cos;
const TAN = Math.tan;
const POW = (num) => num ** 2;
const SQRT = Math.sqrt;
const RANDOM = Math.random;
const FLOOR = (num) => ~~num;
const CEIL = Math.ceil;

const MAX = (a, b) => {
	if (a > b) return a;
	return b;
};

const MIN = (a, b) => {
	if (a < b) return a;
	return b;
};

const randInt = (min, max) => {
	return FLOOR(RANDOM() * (max - min + 1)) + min;
};

const randFloat = (min, max) => {
	return RANDOM() * (max - min + 1) + min;
};

const lerp = (value1, value2, amount) => {
	return value1 + (value2 - value1) * amount;
};

const decel = (val, cel) => {
	let result;
	if (val > 0) result = Math.max(0, val - cel);
	else if (val < 0) result = Math.min(0, val + cel);
	return result;
};

const getDistance = (a, b) => {
	return (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]);
};

const getSquared = (number) => number ** 2;

const getDirection = (x1, y1, x2, y2) => {
	return ATAN2(y1 - y2, x1 - x2);
};

const getAngleDist = (a, b) => {
	const p = ABS(b - a) % (PI * 2);
	return p > PI ? PI * 2 - p : p;
};

const isNumber = (n) => {
	return typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n);
};

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
