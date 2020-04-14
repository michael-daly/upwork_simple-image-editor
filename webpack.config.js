const path    = require ('path');
const webpack = require ('webpack');


module.exports =
{
	entry: './client/js/main.js',

	output:
	{
		filename: 'bundle.js',
		path: path.join (__dirname + '/client/dist')
	},

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
			'~/App':             path.resolve (__dirname, './client/js/App/'),
			'~/Toolbar':         path.resolve (__dirname, './client/js/Toolbar/'),
			'~/ToolbarDropdown': path.resolve (__dirname, './client/js/Toolbar/dropdown/'),
			'~/Popup':           path.resolve (__dirname, './client/js/Popup/'),
			'~/controls':        path.resolve (__dirname, './client/js/controls/'),
			'~/canvas':          path.resolve (__dirname, './client/js/canvas/'),
			'~/shapes':          path.resolve (__dirname, './client/js/canvas/shapes'),
			'~/MainCanvas':      path.resolve (__dirname, './client/js/canvas/MainCanvas/'),
			'~/TempCanvas':      path.resolve (__dirname, './client/js/canvas/TempCanvas/'),
			'~/util':            path.resolve (__dirname, './client/js/util/'),
			'~/misc':            path.resolve (__dirname, './client/js/misc/'),
			'~':                 path.resolve (__dirname, './client/js/'),
		}
	},
};
