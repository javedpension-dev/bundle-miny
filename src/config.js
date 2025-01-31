/*
In case MooMoo developers change some things, it can be directly modified here for ease.
*/

export default {
	// player data
	playerHealth: 100,
	playerScale: 35,
	playerSpeed: 0.0016,
	playerDecel: 0.993,
	maxNameLength: 15,
	maxChatLength: 30,
	hitReturnRatio: 0.25,
	gatherAngle: Math.PI / 2.6,
	hitAngle: Math.PI / 2,
	serverUpdateRate: 9,

	// map data
	mapSize: 14400,
	riverWidth: 724,
	waterCurrent: 0.0011,
	snowBiomeTop: 2400,
	snowSpeed: 0.75,

	// misc
	nameY: 34,
	chatCoolDown: 500,
	chatCountDown: 3000,

	// render
	healthBarWidth: 50,
	healthBarPad: 2.5,
	iconPadding: 15,
	iconPad: 0.9,
	crownIconScale: 60,
	crownPad: 35,
	darkOutlineColor: "#3d3f42",
	outlineColor: "#525252",
	outlineWidth: 5.5,

	maxScreenWidth: 1920,
	maxScreenHeight: 1080,
};
