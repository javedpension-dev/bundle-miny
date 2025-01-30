import playerManager from "../../../entities/player/playerManager.js";
import { itemList } from "../../../utils/items.js";
import util from "../../../utils/util.js";
import place from "../place";

/** @type {object} */
/** @namespace */
export const automill = {
	do: false,
	last: {
		x: 0,
		y: 0,
	},
	angleapart: (Math.PI / 50) * 20,
};

/**
 *
 * @name Auto Mill.
 * @description Attempts to place windmills in the most optimal way possible
 * @memberof automill
 * @example
 * tryAutoMill();
 */
export default function tryAutoMill() {
	if (!automill.do) return;

	/** @type {object} */
	const myplayer = playerManager.myPlayer;

	if (
		util.getDistance(
			[myplayer.x2, myplayer.y2],
			[automill.last.x, automill.last.y],
		) >= util.getSquared(itemList[myplayer.items[3]].scale * 2)
	) {
		/** @type {number} */
		const directionToPlace = util.getDirection(
			automill.last.x,
			automill.last.y,
			myplayer.x2,
			myplayer.y2,
		);

		/*for (
      let i = directionToPlace - automill.angleapart;
      i <= directionToPlace + automill.angleapart;
      i += automill.angleapart
    ) {*/
		place(myplayer.items[3], directionToPlace);
		place(myplayer.items[3], directionToPlace - automill.angleapart);
		place(myplayer.items[3], directionToPlace + automill.angleapart);

		automill.last.x = myplayer.x2;
		automill.last.y = myplayer.y2;
	}
}
