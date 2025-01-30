import client from "../../core/index.js";
import playerManager from "../../entities/player/playerManager.js";

// optimization neeeed: if going to switch weapon anywyas just do thathere
/**
 *
 * @description the default function used to place ingame items.
 * @param {object} type - type of the object.
 * @param {number} dir - direction to place the object (radians).
 * @example
 * place(myPlayer.items[2], 0); // places "spike" type at direction 0.
 */
export default function place(type, dir) {
	const oldWeapon = playerManager.myPlayer.weaponIndex;

	client.send(["z", [type]]);
	client.send(["F", [true, dir]]);
	client.send(["z", [oldWeapon, true]]);
}
