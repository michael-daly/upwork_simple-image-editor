const path    = require ('path');
const webpack = require ('webpack');

const MinifyPlugin      = require ('babel-minify-webpack-plugin');
const CompressionPlugin = require ('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';


module.exports =
{
	entry: './js/main.js',

	output:
	{
		filename: 'bundle.js',
		path: path.join (__dirname + '/dist')
	},

	mode: isProduction ? 'production' : 'development',

	// plugins: [new MinifyPlugin (), new CompressionPlugin ()],

	module:
	{
		rules:
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options:
				{
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			}
		]
	},

	resolve:
	{
		alias:
		{
			'~/App':             path.resolve (__dirname, './js/App/'),
			'~/Toolbar':         path.resolve (__dirname, './js/Toolbar/'),
			'~/ToolbarDropdown': path.resolve (__dirname, './js/Toolbar/dropdown/'),
			'~/canvas':          path.resolve (__dirname, './js/canvas/'),
			'~/shapes':          path.resolve (__dirname, './js/canvas/shapes'),
			'~/MainCanvas':      path.resolve (__dirname, './js/canvas/MainCanvas/'),
			'~/TempCanvas':      path.resolve (__dirname, './js/canvas/TempCanvas/'),
			'~/util':            path.resolve (__dirname, './js/util/'),
			'~':                 path.resolve (__dirname, './js/'),
		}
	},
};
