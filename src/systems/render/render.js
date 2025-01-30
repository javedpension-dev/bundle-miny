import config from "../../config.js";
import playerManager from "../../entities/player/playerManager.js";
import util from "../../utils/util.js";

const render = document.getElementById("gameCanvas").getContext("2d");
export default function loadRender() {
	let camX = 0;
	let camY = 0;
	let lastUpdate = Date.now();
	function updateGame() {
		const player = playerManager.myPlayer;

		// MOVE CAMERA:
		if (player) {
			const tmpDist = util.getDistance([camX, camY], [player.x, player.y]);
			const tmpDir = util.getDirection(player.x, player.y, camX, camY);
			const camSpd = Math.min(
				util.getSquared(tmpDist) * 0.01 * delta,
				util.getSquared(tmpDist),
			);
			if (util.getSquared(tmpDist) > 0.05) {
				camX += camSpd * Math.cos(tmpDir);
				camY += camSpd * Math.sin(tmpDir);
			} else {
				camX = player.x;
				camY = player.y;
			}

			// INTERPOLATE PLAYERS AND AI:
			const lastTime = lastUpdate - 1000 / config.serverUpdateRate;
			for (let i = 0; i < playerManager.allPlayers.length; ++i) {
				const tmpObj = playerManager.allPlayers[i];
				if (tmpObj) {
					const total = tmpObj.t2 - tmpObj.t1 - 1000;
					const fraction = lastTime - tmpObj.t1;
					const ratio = fraction / total;
					const rate = 170;
					tmpObj.dt += delta;
					const tmpRate = Math.min(1.7, tmpObj.dt / rate);
					let tmpDiff = tmpObj.x2 - tmpObj.x1;
					tmpObj.x = tmpObj.x1 + tmpDiff * tmpRate;
					tmpDiff = tmpObj.y2 - tmpObj.y1;
					tmpObj.y = tmpObj.y1 + tmpDiff * tmpRate;
					tmpObj.dir = Math.lerpAngle(
						tmpObj.d2,
						tmpObj.d1,
						Math.min(1.2, ratio),
					);
				}
			}

			// RENDER CORDS:
			const xOffset = camX - config.maxScreenWidth / 2;
			const yOffset = camY - config.maxScreenHeight / 2;

			for (const tmp of playerManager.allPlayers) {
				render.beginPath();
				render.fillStyle = "red";
				render.arc(tmp.x - xOffset, tmp.y - yOffset, 35, 0, Math.PI * 2);
				render.fill();
			}
		} else {
			camX = config.mapScale / 2;
			camY = config.mapScale / 2;
		}
	}

	// UPDATE & ANIMATE:
	window.requestAnimFrame = (() =>
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		((callback) => {
			window.setTimeout(callback, 1000 / 60);
		}))();

	function doUpdate() {
		const now = Date.now();
		delta = now - lastUpdate;
		lastUpdate = now;
		updateGame();
		requestAnimFrame(doUpdate);
	}

	doUpdate();
}
