'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode : 'production',//'development',//
	entry: './webpack/main.js',
	module : {
		rules : [
			{
				test : /\.vue$/,
				loader : 'vue-loader',
				exclude : /node_modules/,
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	/*
	output : {
		filename : '[name].[ext]',
	},
	output : {
		filename : 'vue-wp-[name].js'
	},
	*/
};