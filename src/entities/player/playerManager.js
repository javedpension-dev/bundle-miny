import { chunk } from "lodash-es";
import player from "./player";

const playerManager = new (class {
	/** @type {Array} */
	static players = [];
	/** @type {object} */
	static myPlayer = {};

	get myPlayer() {
		return this.constructor.myPlayer;
	}

	get allPlayers() {
		return this.constructor.players;
	}

	getPlayerBySid(sid /** @type {number} */) {
		return this.constructor.players.find((player) => player.sid === sid);
	}

	add(data /** @type {Array} */, isYou /** @type {boolean} */) {
		/** @type {object} */
		const tmpPlayer = new player(data[1]);
		tmpPlayer.setData(data);

		if (isYou) {
			this.constructor.myPlayer = tmpPlayer;
		}

		this.constructor.players.push(tmpPlayer);

		console.warn(this.constructor.players);
	}

	remove(sid /** @type {number} */) {
		this.constructor.players.splice(
			this.constructor.players.find((player) => player.sid === sid),
			1,
		);
	}

	update(data /** @type {Array} */) {
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
