import { Howl } from "howler";

const SoundManager = new (class {
	constructor() {
		this.sounds = {};
		this.active = true;
	}

	// PLAY SOUND:
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

	// TOGGLE MUTE:
	toggleMute(id, mute) {
		const tmpSound = this.sounds[id];
		if (tmpSound) {
			tmpSound.mute(mute);
		}
	}

	// STOP SOUND:
	stop(id) {
		const tmpSound = this.sounds[id];
		if (tmpSound) {
			tmpSound.stop();
		}
	}
})();

export default SoundManager;
