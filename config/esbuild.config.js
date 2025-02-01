const esbuild = require("esbuild");
const fs = require("node:fs");
const path = require("node:path");
const { default: log } = require("../src/utils/log");

esbuild
	.build({
		entryPoints: ["src/core/index.js"],
		bundle: true,
		outfile: "dist/bundle.js",
		minify: true,
		sourcemap: true,
		target: ["es2020"],
		loader: { ".js": "jsx" },
	})
	// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
	.then(() => log.add(`successfully built version: BETA, clearing console...`))
	.catch((error) => {
		log.error(`esbuild failed ${error}`);
		process.exit(1);
	});
