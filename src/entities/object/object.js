/**
 * @class object
 */
export default class object {
	/**
	 *
	 * @param {number} sid - Session identification, used to identify the building.
	 * @param {number} x - x coordinate on cartesian plane.
	 * @param {number} y - y coordinate on cartesian plane.
	 * @param {number} dir - Direction (radians).
	 * @param {number} scale - Size in game units.
	 * @param {number} type - Type.
	 * @param {object} rawData - Information about the building.
	 * @param {boolean} setSID - Whether or not to overwrite sid.
	 * @param {number} ownerSID - Session i.d. of the person who placed this building (null if its naturally spawning).
	 * @constructor
	 * @memberof object
	 * @this object
	 */
	constructor(sid, x, y, dir, scale, type, rawData, setSID, ownerSID) {
		const data = rawData || {};

		this.x = x;
		this.y = y;
		this.dir = dir;
		this.scale = scale;
		this.type = type;
		this.data = data;
		this.ownerSID = ownerSID;

		this.alive = true;
		this.id = data.id;
		this.name = data.name;
		this.isItem = this.id !== undefined;
		this.health = data.health;
		this.spike = data.dmg;
		this.trap = data.trap;
		this.blocker = data.blocker;
		this.teleport = data.teleport;
		this.req = data.req;
		this.healCol = data.healCol;
		this.boostSpeed = data.boostSpeed;
		this.projectile = data.projectile;
		this.shootRange = data.shootRange;
		this.shootRate = data.shootRate;
		this.shootCount = this.shootRate;
		this.spawnPoint = data.spawnPoint;
	}

	/**
	 *
	 * @description Returns the true scale of an object's hitbox.
	 * @param sM
	 * @param ig
	 * @returns {number} - Real scale of the object hitbox.
	 * @memberof object
	 * @this object
	 */
	getTrueScale(sM, ig) {
		return (
			this.scale *
			(this.isItem || this.type === 2 || this.type === 3 || this.type === 4
				? 1
				: 0.6 * sM) *
			(ig ? 1 : this.colDiv)
		);
	}

	/**
	 *
	 * @description Changes the health of the object by the desired amount.
	 * @param {number} value - The amount to change the health by, needs to be absolute (e.g. -25, 30, -60).
	 * @memberof object
	 * @this object
	 * @returns {void}
	 * @example
	 * <object>.changeHealth(-20);
	 */
	changeHealth(value) {
		this.health += value;

		if (this.health < 0) this.alive = false;
	}
}
