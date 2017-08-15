'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const coreConfig = require('./core');

const CWD = path.join(__dirname, '..');
const srcPath = path.join(CWD, 'src');
const corePath = path.join(CWD, 'core');
const indexHtmlPath = path.join(CWD, 'index.html');
const faviconPath = path.join(CWD, 'favicon.png');

coreConfig.bail = true;

coreConfig.devtool = 'source-map';

coreConfig.output = Object.assign({}, coreConfig.output, {
    pathinfo: false,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
});

coreConfig.module.rules.push({
    test: /\.(css|less)$/,
    include: [ srcPath, corePath ],
    use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: 'css!csso!less'
    })
});

coreConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        IS_DEVELOP: false
    }),
    new HtmlWebpackPlugin({
        inject: true,
        template: indexHtmlPath,
        favicon: faviconPath,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    new ExtractTextPlugin('[name].[hash].css')
);

module.exports = coreConfig;
