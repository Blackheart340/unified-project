import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';

const root = document.getElementById('root');
const renderApp = Application => {
    ReactDOM.render(
        <Provider store={store}>
            <Application />
        </Provider>,
    root);
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        renderApp(NextApp);
    });
}
