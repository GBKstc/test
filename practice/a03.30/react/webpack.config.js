/**
 * Created by Administrator on 2017/3/30.
 */
var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'app/app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath:'/assets/'
	},
	module:{
		loaders:[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:{
					presets:['es2015','react']
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	}
}