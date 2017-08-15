import { APP_INIT } from '../actions/actionTypes';
import { takeLatest } from 'redux-saga/effects';

function* appLoadAsync() {

}

export function* watchAppAsync() {
    yield takeLatest(APP_INIT, appLoadAsync);
}
