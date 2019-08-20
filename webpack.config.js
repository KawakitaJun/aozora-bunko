const webpack = require('webpack');
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
    })
  ],
  resolve: {
    extensions: ['.js']
  },
	output: {
//		chunkFilename: '[name].[chunkhash].js',  // ランダム名の生成。キャッシュのある状態ではこうしないと
//		filename: '[name].[chunkhash].js',       // CSSやJSが反映されるまで時間がかかる
		filename: "index.js",
		path: path.resolve(__dirname, 'docs')
	},

	mode: 'development',

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};