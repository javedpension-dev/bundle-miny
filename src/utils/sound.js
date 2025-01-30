import { Howl } from "howler";

/**
 *
 * @class SoundManager
 */
const SoundManager = new (class {
	constructor() {
		this.sounds = {};
		this.active = true;
	}

	/**
	 *
	 * @name Play Song.
	 * @description Starts playing a song.
	 * @memberof SoundManager
	 * @param {string} id - Name of the song (corresponds to the file name).
	 * @param {number} volume - Volume of the sound (0-1).
	 * @param {boolean} loop - If the song should repeat.
	 */
	play(id, volume = 1, loop = true) {
		if (!this.active || volume <= 0) return;

		let tmpSound = this.sounds[id];

		if (!tmpSound) {
			tmpSound = new Howl({
				src: [`.././sound/${id}.mp3`],
				volume,
				loop,
			});
			this.sounds[id] = tmpSound;
		} else {
			tmpSound.volume(volume);
			tmpSound.loop(loop);
		}

		if (!tmpSound.playing()) {
			tmpSound.play();
		}
	}

	/**
	 *
	 * @name Toggle Song Mute.
	 * @description Toggles if the specified song should be muted or not.
	 * @memberof SoundManager
	 * @param {string} id - Name of the song (corresponds to the file name).
	 * @param {boolean} mute - If the song should be muted.
	 */
	toggleMute(id, mute) {
		const tmpSound = this.sounds[id];
		if (tmpSound) {
			tmpSound.mute(mute);
		}
	}

	/**
	 *
	 * @name Stop Song Playing.
	 * @description Stops playing a song.
	 * @memberof SoundManager
	 * @param {string} id - Name of the song (corresponds to the file name).
	 */
	stop(id) {
		const tmpSound = this.sounds[id];
		if (tmpSound) {
			tmpSound.stop();
		}
	}
})();

export default SoundManager;
