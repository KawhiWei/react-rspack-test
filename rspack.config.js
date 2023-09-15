
const path = require("path");
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	builtins: {
		html: [
			{
				template: "./index.html"
			}
		]
	},
	module: {
		rules: [
			// {
			// 	test: /\.less$/i,
			// 	use: [
			// 		// compiles Less to CSS
			// 		"style-loader",
			// 		"css-loader",
			// 		"less-loader",
			// 	],
			// },
			{
				test: /\.svg$/,
				type: "asset"
			}
		]
	},
	resolve: {
		"@": path.resolve(__dirname, 'src'),
	}
};
