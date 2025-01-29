import client from "..";
import playerManager from "../classes/playerManager";

// optimization neeeed: if going to switch weapon anywyas just do thathere
export default function place(type, dir) {
	const oldWeapon = playerManager.myPlayer.weaponIndex;

	client.send(["z", [type]]);
	client.send(["F", [true, dir]]);
	client.send(["z", [oldWeapon, true]]);
}
