import { chunk } from "lodash-es";
import player from "./player";

/**
 *
 * @class playerManager
 */
const playerManager = new (class {
	/** @type {Array} */
	static players = [];
	/** @type {object} */
	static myPlayer = {};

	/**
	 *
	 * @name My Player;
	 * @description Retrieves your player.
	 * @memberof playerManager
	 * @returns player
	 */
	get myPlayer() {
		return this.constructor.myPlayer;
	}

	/**
	 *
	 * @name All Players;
	 * @description Retrieves all players in memory.
	 * @memberof playerManager
	 * @returns player[]
	 */
	get allPlayers() {
		return this.constructor.players;
	}

	/**
	 *
	 * @name Get Player by SID.
	 * @description Retrieves a player through it's Session I.D.
	 * @param {number} sid - Session I.D. of the player.
	 * @memberof playerManager
	 * @returns player
	 */
	getPlayerBySid(sid) {
		return this.constructor.players.find((player) => player.sid === sid);
	}

	/**
	 *
	 * @name Get Player by SID.
	 * @description Retrieves a player through it's session i.d.
	 * @param {Array} data - Data of the new player.
	 * @param {boolean} isYou - Is the player you.
	 * @memberof playerManager
	 * @returns player
	 */
	add(data, isYou) {
		/** @type {object} */
		const tmpPlayer = new player(data[1]);
		tmpPlayer.setData(data);

		if (isYou) {
			this.constructor.myPlayer = tmpPlayer;
		}

		this.constructor.players.push(tmpPlayer);
	}

	/**
	 *
	 * @name Remove Player by SID.
	 * @description Removes a player through it's session i.d.
	 * @param {number} sid - Session I.D. of the player.
	 * @memberof playerManager
	 */
	removePlayerBySid(sid) {
		this.constructor.players.splice(
			this.constructor.players.find((player) => player.sid === sid),
			1,
		);
	}

	/**
	 *
	 * @name Update Players.
	 * @description Updates the player's information.
	 * @param {Array} data - Session I.D. of the player.
	 * @memberof playerManager
	 */
	update(data) {
		/** @type {Array} */
		const chunkedData = chunk(data, 13);

		for (const chunk of chunkedData) {
			/** @type {object} */
			const player = this.getPlayerBySid(chunk[0]);

			if (!player) continue; // skip

			/** @type {Array} */
			const [
				sid,
				x2,
				y2,
				d2,
				buildIndex,
				weaponIndex,
				weaponVariant,
				team,
				isLeader,
				skinIndex,
				tailIndex,
				iconIndex,
				zIndex,
			] = data;

			Object.assign(player, {
				sid,
				x2,
				y2,
				d2,
				buildIndex,
				weaponIndex,
				weaponVariant,
				team,
				isLeader,
				skinIndex,
				tailIndex,
				iconIndex,
				zIndex,
			});

			// extra stuff
			player.x1 = player.x;
			player.y1 = player.y;
			player.d1 = player.d2;
			player.dt = 0;
			player.t1 = player.t2 === undefined ? Date.now() : player.t2;
			player.t2 = Date.now();
		}
	}
})();

export default playerManager;
