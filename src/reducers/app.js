import { APP_INIT } from '../actions/actionTypes';
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

export default handleActions({
    [APP_INIT]: state => {
        return state.set('inited', true);
    }
}, fromJS({}));
