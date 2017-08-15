require('babel-register')();
require('browser-env')(['window', 'document', 'navigator', 'location']);

var MockWebStorage = require('mock-webstorage');
global.localStorage = new MockWebStorage();
global.IS_DEVELOP = true;
