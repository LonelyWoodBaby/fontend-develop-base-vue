const path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
	entry:{
		main:"./src/main"
	},
	output:{
		path:path.join(__dirname,"./dist"),
		publicPath:"/dist/",
		filename:"main.js"
	},
	module:{
		rules:[
			...(config.dev.useEslint? [{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src'), resolve('test')],
				options: {
					formatter: require('eslint-friendly-formatter'),
					emitWarning: !config.dev.showEslintErrorsInOverlay
				}
			}] : []),
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					loaders:{
						css:ExtractTextPlugin.extract({
							use:'css-loader',
							fallback:"vue-style-loader"
						})
					}
				}
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					use:'css-loader',
					fallback:"style-loader"
				})
			},
			{
				test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader:"url-loader?|limit=1024"
			}
		]
	},
	plugins:[
		new ExtractTextPlugin("main.css")
	]
}
module.exports = config;