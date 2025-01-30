export default class object {
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

	getTrueScale(sM, ig) {
		return (
			this.scale *
			(this.isItem || this.type === 2 || this.type === 3 || this.type === 4
				? 1
				: 0.6 * sM) *
			(ig ? 1 : this.colDiv)
		);
	}

	changeHealth(value) {
		this.health += value;

		if (this.health < 0) this.alive = false;
	}
}
