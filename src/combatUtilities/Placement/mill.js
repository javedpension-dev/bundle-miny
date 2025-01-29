import playerManager from "../../classes/playerManager.js";
import client from "../../index.js";
import { itemList } from "../../libs/items.js";
import util from "../../libs/util.js";
import place from "../place";

export const automill = {
	do: false,
	last: {
		x: 0,
		y: 0,
	},
	angleapart: (Math.PI / 50) * 20,
};

export default function tryAutoMill() {
	if (!automill.do) return;
	const myplayer = playerManager.myPlayer;

	if (
		util.getDistance(
			[myplayer.x2, myplayer.y2],
			[automill.last.x, automill.last.y],
		) >= util.getSquared(itemList[myplayer.items[3]].scale * 2)
	) {
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
