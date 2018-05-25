const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_NUMBER = `${process.env.CIRCLE_BUILD_NUM}` || 12;

const config = {
    entry: ['babel-polyfill', SRC_DIR + "/app/index.js"],
    output: {
        path: path.join(__dirname, 'dist', 'app'),
        filename: "bundle" + BUILD_NUMBER + ".js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /.js(x)?$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.json$/, 
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.scss/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(ico|png|jpg|gif)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        // new webpack.IgnorePlugin(/canvas|jsdom/),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
            filename: "../index.html"
        })
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    }
};



config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': `"${process.env.NODE_ENV}"`,
            'BUILD_NUMBER': BUILD_NUMBER
        }
    })
);

if (process.env.NODE_ENV !== 'production') {
    config.devtool = 'cheap-module-source-map'
}
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}


module.exports = config;
