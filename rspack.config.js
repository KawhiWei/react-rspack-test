
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
			{
				test: /.less$/,
				use: ["less-loader"],
				type: "css"
			},
			{
				test: /\.svg$/,
				type: "asset"
			}
		]
	},
	resolve: {
		alias:{
			"@": path.resolve(__dirname, 'src'),
		}
		
	}
};
