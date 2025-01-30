const log = new (class {
	static logColor = "lightgreen";
	static warnColor = "yellow";
	static errorColor = "red";

	add(message) {
		console.log(
			`[%c*%c] ${message}`,
			`color: ${this.constructor.logColor};`,
			"color: inherit;",
		);
	}

	warn(message) {
		console.log(
			`[%c?%c] ${message}`,
			`color: ${this.constructor.warnColor};`,
			"color: inherit;",
		);
	}

	error(message) {
		console.log(
			`[%c!%c] ${message}`,
			`color: ${this.constructor.errorColor};`,
			"color: inherit;",
		);
	}
})();

export default log;
