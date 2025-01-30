import config from "../../config.js";
import { hats, weapons } from "../../utils/items.js";

export default class player {
	/**
	 *
	 * @param {number} sid - session i.d. of the player, used for identification.
	 */
	constructor(sid) {
		this.sid = sid;
		this.health = config.playerHealth;
		this.maxHealth = this.health;
		this.scale = config.playerScale;
		this.dt = 0;
		this.x = 0;
		this.y = 0;
		this.x1 = 0;
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;
		this.xVel = 0;
		this.yVel = 0;
		this.weaponIndex = 0;
		this.buildIndex = 0;
		this.weapons = [0];
		this.items = [0, 3, 6, 10];
		this.dir = 0;
		this.d2 = 0;
		this.d1 = 0;
		this.name = "";
		this.weaponXP = [0, 0];
		this.reloads = {};
		this.itemCounts = {};
	}

	/**
	 *
	 * @description assigns default data to player.
	 * @param {object} data
	 */
	setData(data) {
		[
			this.id,
			this.sid,
			this.name,
			this.x,
			this.y,
			this.dir,
			this.health,
			this.maxHealth,
			this.scale,
			this.skinColor,
		] = data;

		this.x2 = this.x;
		this.y2 = this.y;
		this.x1 = this.x;
		this.y1 = this.y;
	}

	/**
	 * @description called when player hits.
	 */
	justHit() {
		this.reloads[this.weaponIndex] =
			weapons[this.weaponIndex].speed *
			(hats.find((hat) => hat.id === this.skinIndex)?.atkSpd || 1);
	}
}
