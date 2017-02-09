var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, '/app'),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./application.js",
    output: {
        path: __dirname,/* + "/js",*/
        filename: "bundle.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    module: {
        loaders: [
            {
                test: /\.js(x){0,}?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            { 
                test: /\.css$/, 
                exclude: /(node_modules|bower_components)/,
                loader: "style-loader!css-loader" 
            }
        ]
    },
};