import { watchAppAsync } from './app.js';

export function* rootSaga() {
    yield [
        watchAppAsync()
    ];
}
