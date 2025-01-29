import objectManager from "./classes/objectManager.js";
import playerManager from "./classes/playerManager.js";
import tryAutoMill from "./combatUtilities/Placement/mill.js";
import client from "./index.js";
import log from "./libs/log.js";
import SoundManager from "./libs/sound.js";

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
		client.registerPacketHandler("H", async (data) => {
			objectManager.addGameObject(data);
		});

		client.registerPacketHandler("V", (data) => {
			if (data[0]) {
				if (data[1]) {
					playerManager.myPlayer.weapons = data[0];
				} else playerManager.myPlayer.items = data[0];
			}
		});
	} catch (error) {
		log.error(`Unable to setup packet handlers: ${error}`);
	}
}
