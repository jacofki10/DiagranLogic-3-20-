const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimazeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
        mode: 'production',
        output: {
                filename: 'js/[name].[contentHash].js',
                path: path.resolve(__dirname, 'dist/common'),
                publicPath: './common/',
        },
        plugins: [
                new HtmlWebpackPlugin({
                        title: '',
                        filename: '../index.html',
                        template: './src/index.html',
                        chunks: ['main'],
                        hash: false,
                        minify: {
                                removeAttributeQuotes: true,
                                collapseWhitespace: true,
                                removeComments: true,
                        },
                }),
                new HtmlWebpackPlugin({
                        title: '',
                        filename: '../result.html',
                        template: './src/result.html',
                        chunks: ['result'],
                        hash: false,
                        minify: {
                                removeAttributeQuotes: true,
                                collapseWhitespace: true,
                                removeComments: true,
                        },
                }),
                new MiniCssExtractPlugin({
                        filename: 'css/[name].[contentHash].css',
                }),
                new CleanWebpackPlugin(),
                new CssUrlRelativePlugin(/* options */),
        ],
        optimization: {
                minimizer: [
                        new OptimazeCssAssetsPlugin(),
                        new TerserPlugin({
                                extractComments: true,
                                cache: true,
                                parallel: true,
                                sourceMap: false, // Must be set to true if using source-maps in production
                                terserOptions: {
                                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                                        extractComments: 'all',
                                        compress: {
                                                drop_console: true,
                                        },
                                },
                        }),
                ],
        },
        module: {
                rules: [
                        {
                                test: /\.js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                        loader: 'babel-loader',
                                        options: {
                                                presets: ['@babel/preset-env'],
                                        },
                                },
                        },
                        {
                                test: /\.scss$/,
                                use: [
                                        {
                                                loader: MiniCssExtractPlugin.loader,
                                                options: {
                                                        publicPathRelativeToSource: true,
                                                },
                                        },
                                        {
                                                loader: 'css-loader',
                                                options: {
                                                        sourceMap: false,
                                                        importLoaders: 2,
                                                },
                                        },
                                        {
                                                loader: 'sass-loader',
                                                options: {
                                                        sourceMap: false,
                                                },
                                        },
                                ],
                        },
                        {
                                test: /\.(png|svg|jpg|gif)$/,
                                use: {
                                        loader: 'file-loader',
                                        query: {
                                                name: 'images/[name].[ext]',
                                        },
                                },
                        },
                        {
                                test: /\.(ttf)$/,
                                use: {
                                        loader: 'file-loader',
                                        query: {
                                                name: 'fonts/[name].[ext]',
                                        },
                                },
                        },
                ],
        },
});
