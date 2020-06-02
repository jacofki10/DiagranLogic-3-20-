const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
        mode: 'development',
        output: {
                filename: '[name].js',
                path: path.resolve(__dirname, 'dev'),
        },
        plugins: [
                new HtmlWebpackPlugin({
                        template: './src/index.html',
                        chunks: ['main'],
                }),
                new HtmlWebpackPlugin({
                        template: './src/result.html',
                        filename: 'result.html',
                        chunks: ['result'],
                }),
        ],
        module: {
                rules: [
                        {
                                test: /\.scss$/,
                                use: ['style-loader', 'css-loader', 'sass-loader'],
                        },
                        {
                                test: /\.(png|svg|jpg|gif|ttf)$/,
                                use: {
                                        loader: 'file-loader',
                                        options: {
                                                name: '[name].[hash].[ext]',
                                                outputPath: 'images',
                                                publicPath: 'images',
                                                useRelativePaths: true,
                                        },
                                },
                        },
                ],
        },
});
