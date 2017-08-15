const argv = require('yargs').argv;
const isProduction = process.env.NODE_ENV === 'production' || argv.p;

module.exports = isProduction ?
    require('./webpack/production') :
    require('./webpack/development');
