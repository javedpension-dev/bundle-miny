/**
 *
 */
export default class object {
	/**
	 *
	 * @param {number} sid - session identification, used to identify the building.
	 * @param {number} x - x coordinate.
	 * @param {number} y - y coordinate.
	 * @param {number} dir - direction (radians).
	 * @param {number} scale - size.
	 * @param {number} type - type.
	 * @param {object} rawData - information about the building.
	 * @param {boolean} setSID - whether or not to overwrite sid.
	 * @param {number} ownerSID - session i.d. of the person who placed this building (null if its naturally spawning).
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
		this.group = data.group;
		this.health = data.health;
		this.layer = 2;
		if (this.group !== undefined) {
			this.layer = this.group.layer;
		} else if (this.type === 0) {
			this.layer = 3;
		} else if (this.type === 2) {
			this.layer = 0;
		} else if (this.type === 4) {
			this.layer = -1;
		}
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
	 * @param sM
	 * @param ig
	 * @returns {number} real scale of the object hitbox.
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
	 * @param {number} value - the amount to change the health by, needs to be absolute (e.g. -25, 30, -60).
	 */
	changeHealth(value) {
		this.health += value;

		if (this.health < 0) this.alive = false;
	}
}
