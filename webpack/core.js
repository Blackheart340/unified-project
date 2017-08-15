'use strict';

const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// flags
const CWD = path.join(__dirname, '..');

const srcPath = path.join(CWD, 'src');
const packageFile = require(path.join(CWD, 'package.json'));

const corePath = path.join(CWD, 'core');
const buildPath = path.join(CWD, 'build');
const babelrc = path.join(CWD, '.babelrc');

const config = {
    entry: {
        main: [ path.join(srcPath, 'index') ],
        vendor: [ 'react' ]
    },
    output: {
        path: buildPath,
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.json' ]
    },
    resolveLoader: {
        moduleExtensions: [ '-loader' ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                use: 'eslint',
                include: [ srcPath, corePath ]
            },
            {
                enforce: 'pre',
                test: /\/src\/.+\.jsx?$/,
                use: 'baggage?style.css&[file].css&style.less&[file].less',
                include: [ srcPath, corePath ]
            },
            {
                test: /\.css/,
                use: [ 'style', 'css' ]
            },
            {
                test: /\.jsx?$/,
                include: [ srcPath, corePath ],
                use: 'babel?' + JSON.stringify(Object.assign({
                    babelrc,
                    cacheDirectory: true
                },
                packageFile.babel || {}))
            },
            {
                test: /\.(jpg|png|gif|eot|ttf|otf|woff|woff2)$/,
                use: 'file'
            },
            {
                test: /\.svg$/,
                use: 'svg-url'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'public',
                to: 'public'
            }
        ]),
        new LodashModuleReplacementPlugin({
            collections: true,
            shorthands: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[hash].js'
        }),
        new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
        }),
        new webpack.DefinePlugin({
            UI_VERSION: '"' + packageFile.version + '"'
        })
    ]
};

module.exports = config;
