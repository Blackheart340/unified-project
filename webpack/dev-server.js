const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils');

const CWD = path.join(__dirname, '..');
const webpackConfig = require(path.join(CWD, 'webpack.config'));
const packageConfig = require(path.join(CWD, 'package.json')).webpack || {};

const cert = utils.getCert(packageConfig);
const compiler = webpack(webpackConfig);

compiler.apply(new DashboardPlugin({ port: 9000 }));
compiler.apply(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    openAnalyzer: false
}));

new WebpackDevServer(compiler, Object.assign({}, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    https: cert && {
        key: cert,
        cert
    },
    disableHostCheck: true
}, packageConfig.server)).listen(packageConfig.port || utils.DEFAULTS.port, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    if (!process.env.NO_BROWSER) {
        utils.openBrowser(utils.getFullUrl(packageConfig.host, packageConfig.port));
    }
});
