'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const coreConfig = require('./core');

const CWD = path.join(__dirname, '..');
const srcPath = path.join(CWD, 'src');
const corePath = path.join(CWD, 'core');
const indexHtmlPath = path.join(CWD, 'index.html');
const faviconPath = path.join(CWD, 'favicon.png');

coreConfig.bail = false;

coreConfig.devtool = 'eval';

coreConfig.entry.main.push(
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-dev-server/client'),
    require.resolve('webpack/hot/dev-server')
);

coreConfig.output = Object.assign({}, coreConfig.output, {
    pathinfo: true,
    filename: 'bundle.js'
});

coreConfig.module.rules.push({
    test: /\.(css|less)$/,
    include: [ srcPath, corePath ],
    loader: 'style!css!csso!less'
});

coreConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        IS_DEVELOP: true
    }),
    new HtmlWebpackPlugin({
        inject: true,
        template: indexHtmlPath,
        favicon: faviconPath
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

module.exports = coreConfig;
