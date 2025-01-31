import { chunk } from "lodash-es";
import player from "./player";

/**
 *
 * @class playerManager
 */
const playerManager = new (class {
	static players = [];
	static myPlayer = {};

	/**
	 *
	 * @description Retrieves your player.
	 * @memberof playerManager
	 * @method
	 * @this playerManager
	 * @returns player
	 */
	get myPlayer() {
		return this.constructor.myPlayer;
	}

	/**
	 *
	 * @description Retrieves all players in memory.
	 * @memberof playerManager
	 * @method
	 * @this playerManager
	 * @returns {Array<player>}
	 * @example
	 * const players = <playerManager>.allPlayers;
	 */
	get allPlayers() {
		return this.constructor.players;
	}

	/**
	 *
	 * @description Retrieves a player through it's Session I.D.
	 * @param {number} sid - Session I.D. of the player.
	 * @memberof playerManager
	 * @member
	 * @this playerManager
	 * @returns {player | null} - Returns the player if found, otherwise NULL.
	 * @example
	 * <playerManager>.getPlayerBySid(69420);
	 */
	getPlayerBySid(sid) {
		return this.constructor.players.find((player) => player.sid === sid);
	}

	/**
	 *
	 * @description Retrieves a player through it's session i.d.
	 * @param {Array} data - Data of the new player.
	 * @param {boolean} isYou - Is the player you.
	 * @memberof playerManager
	 * @method
	 * @this playerManager
	 * @returns {player}
	 * @example
	 * <playerManager>.add([1, 2, 3, 4, 5, 6, 7, 8, 9], true);
	 */
	add(data, isYou) {
		/** @type {player} */
		const tmpPlayer = new player(data[1]);
		tmpPlayer.setData(data);

		if (isYou) {
			this.constructor.myPlayer = tmpPlayer;
		}

		this.constructor.players.push(tmpPlayer);
	}

	/**
	 *
	 * @description Removes a player through it's session i.d.
	 * @param {number} sid - Session I.D. of the player.
	 * @memberof playerManager
	 * @method
	 * @this playerManager
	 * @returns {void}
	 * @example
	 * <playerManager>.removePlayerBySid(69420);
	 */
	removePlayerBySid(sid) {
		const index = this.constructor.players.findIndex(
			(player) => player.sid === sid,
		);
		if (index !== -1) {
			this.constructor.players.splice(index, 1);
		}
	}

	/**
	 *
	 * @description Updates the player's information.
	 * @param {Array<number | string>} data - Information about each player in our update radius.
	 * @memberof playerManager
	 * @method
	 * @this playerManager
	 * @returns {void}
	 * @throws {TypeError} - Throws a TypeError if the data is in an invalid format.
	 */
	update(data) {
		/** @type {Array} */
		const chunkedData = chunk(data, 13);

		for (const chunk of chunkedData) {
			/** @type {player | undefined} */
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
