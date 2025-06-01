const esbuild = require("esbuild");

esbuild
	.build({
		entryPoints: ["src/extension.ts"],
		bundle: true,
		platform: "node",
		outfile: "out/extension.js",
		external: ["vscode"], // vscode is provided by environment
		sourcemap: true,
		minify: false,
	})
	.catch(() => process.exit(1));
