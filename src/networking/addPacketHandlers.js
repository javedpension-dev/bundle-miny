import client from "../core/index.js";
import objectManager from "../entities/object/objectManager.js";
import playerManager from "../entities/player/playerManager.js";
import tryAutoMill from "../systems/combat/Placement/mill.js";
import log from "../utils/log.js";
import SoundManager from "../utils/sound.js";

/**
 *
 * @description registers all packet hooks that we need.
 */
export default function addPacketHandlers() {
	try {
		// update players
		client.registerPacketHandler("a", async (data) => {
			playerManager.update(data[0]);

			tryAutoMill();
		});

		// setup game
		client.registerPacketHandler("C", (data) => {
			SoundManager.stop("menu");
		});

		// add player
		client.registerPacketHandler("D", async (data) => {
			playerManager.add(data[0], data[1]);

			if (data[1]) {
				setTimeout(() => {
					// prepare item bars
					const itemBars = document.getElementById("actionBar").children;
					for (const item of [...itemBars]) {
						if (item.style.display === "inline-block") {
							console.log(item);
						}
					}
				}, 1);
			}
		});

		// load game object
		client.registerPacketHandler("H", async (data /** @type {Array} */) => {
			objectManager.addGameObject(data);
		});

		client.registerPacketHandler("V", (data /** @type {Array} */) => {
			if (data[0]) {
				if (data[1]) {
					playerManager.myPlayer.weapons = data[0];
				} else playerManager.myPlayer.items = data[0];
			}
		});
	} catch (error /** @type {any} */) {
		log.error(`Unable to setup packet handlers: ${error}`);
	}
}
