module.exports = {
	entry: ['babel-polyfill', './js/app.js'],
	output: { filename: "./js/out.js" },
	watch: true,
	module: {
        loaders: [
            {
                test: /\.js$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015','stage-2'] }
            },
            {
            	test: /\.scss$/,
            	loader: ['style-loader', 'css-loader' , 'sass-loader' ]
            },
						{
						  test: /\.(jpg|png|svg)$/,
						  loader: 'url-loader',
						  options: {
						  limit: 250000,
						 	}
						}
        ]
    }
}
