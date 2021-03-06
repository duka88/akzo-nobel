const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'global': './src/js/global.js'
	},
	output: {
		path: path.join(__dirname, './dist/js/'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: require.resolve('jquery'),
				loader: 'expose-loader',
				options: {
					exposes: ['$', 'jQuery'],
				},
			},
			{
				test: path.join(__dirname),
				loader: 'babel-loader'
			}
		]
	},
	mode: 'development',
	resolve: {
		alias: {
			core: path.join(__dirname, 'core'),
		},
	},
	optimization: {
		usedExports: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};
