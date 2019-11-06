const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin")

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output:{
        filename: 'bunder.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'development',
    module: {
        rules:[
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: [/\.svg$/, /\.png$/, /\.ico$/],
                loader: 'url-loader',
                options: {
                    limit: 50 
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: [/\.json$/],
                loader: 'file-loader'
            }
        ]
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".css", ".js", ".jsx", ".html", ".json"]
    },
    plugins: [
        new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
            PUBLIC_URL: "./public"
        }),
        new HtmlWebPackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer:{
        compress: true,
        port: 9000,
        hot: true
    }
}
