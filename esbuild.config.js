const esbuild = require("esbuild");
const fs = require("node:fs");
const path = require("node:path");
const { default: log } = require("./src/libs/log");

const metadataFile = "tampermonkeyMetadata.txt";
const versionFile = "version.json";

function incrementVersion(version) {
	const parts = version.split(".").map(Number);
	parts[2] += 1;
	if (parts[2] >= 10) {
		parts[2] = 0;
		parts[1] += 1;
	}
	return parts.join(".");
}

let versionData;
if (fs.existsSync(versionFile)) {
	versionData = JSON.parse(fs.readFileSync(versionFile, "utf8"));
	versionData.version = incrementVersion(versionData.version);
} else {
	versionData = { version: "0.0.1" };
}
fs.writeFileSync(versionFile, JSON.stringify(versionData, null, 2));

let metadata = fs.readFileSync(metadataFile, "utf8");
metadata = metadata.replace(
	/@version\s+\d+\.\d+\.\d+/g,
	`@version      ${versionData.version}`,
);

fs.writeFileSync(metadataFile, metadata);

esbuild
	.build({
		entryPoints: ["src/index.js"],
		bundle: true,
		outfile: "dist/bundle.js",
		minify: false,
		sourcemap: true,
		target: ["es2020"],
		loader: { ".js": "jsx" },
		banner: {
			js: metadata,
		},
	})
	.then(() =>
		log.add(
			`successfully built version: ${versionData.version}, clearing console...`,
		),
	)
	.catch((error) => {
		log.error(`esbuild failed ${error}`);
		process.exit(1);
	});
