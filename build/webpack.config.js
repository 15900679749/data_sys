process.noDeprecation = true /// remove deprecation warning of webpack loader,see https://github.com/webpack/loader-utils/issues/56
let shell = require('shelljs')
let path = require('path')
let webpack = require('webpack')
let config = require('./config')
let assist = require('./assist')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpackHelper = require('./vuecssloader')
const NODE_ENV = process.env.NODE_ENV
config = config[NODE_ENV]
module.exports = {
	entry: ['./build/polyfill.js', './src/main.js'],
	output: {
		path: assist.assetConfig.assertRoot,
		publicPath: NODE_ENV !== 'development' ? './' : '',
		filename: '[name].js'
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: webpackHelper.cssLoaders({
						publicPath: assist.assetConfig.publicPath
					})
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules|NIM_Web_Chatroom_v4.2.0.*\.js|NIM_Web_SDK_v4.2.0.*\.js/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: assist.assetPath(`/images/[name].[ext]?${NODE_ENV !== 'development' && '[hash]'}`)
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader'
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'components': path.join(__dirname, '../src/components'),//components
			'javascripts': path.join(__dirname, '../src/statics/javascripts'),
			'scss': path.join(__dirname, '../src/statics/scss'),
			'statics': path.join(__dirname, '../src/statics'),
			'view':path.join(__dirname, '../src/view'),//view
		},
		extensions: ['.js', '.vue']
	},
	devServer: {
		historyApiFallback: true,
		disableHostCheck: true,
		stats: 'minimal',
		noInfo: false,
		compress: true
	},
	devtool: '#cheap-eval-source-map',
	performance: {
		hints: false
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config
		})
	]
};

[].push.apply(module.exports.module.rules, webpackHelper.styleLoaders({
	publicPath: assist.assetConfig.publicPath
}))
switch(NODE_ENV) {
	case 'development':
		[].push.apply(module.exports.plugins, [
			/// This plugin will cause the relative path of the module to be displayed when HMR is enabled.
			new webpack.NamedModulesPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				inject: true
			})
		])
		break
	case 'devTest':
		module.exports.devtool = '#source-map'
		break
	case 'production':
	case 'pre':
		// http://vue-loader.vuejs.org/en/workflow/production.html
		module.exports.devtool = false
		break
}
if(NODE_ENV !== 'development') {
	module.exports.output.filename = assist.assetPath('javascript/[name].[chunkhash].js')
	module.exports.output.chunkFilename = assist.assetPath('javascript/[name].[chunkhash].js')
	module.exports.plugins = (module.exports.plugins || []).concat(assist.generate.productionPlugins())
	module.exports.module.rules.push({
		test: /\.(png|jpg|gif|svg)$/,
		loader: 'image-webpack-loader'
	})
	shell.rm('-rf', assist.assetConfig.assertRoot)
}