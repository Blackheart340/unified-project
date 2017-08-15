import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';

import state from './state';

import * as reducers from '../reducers/index';
import { rootSaga } from '../saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware
];

const enhancers = [
    applyMiddleware(...middlewares)
];
const reducer = combineReducers({ ...reducers });

const enhancer = compose(...enhancers);
const store = createStore(reducer, state, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
