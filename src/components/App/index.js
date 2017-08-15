import { connect } from 'react-redux';
import * as actions from '../../actions/app';

import App from './App';

export default connect(mapStateToProps, mapDispatchToProps)(App);

function mapStateToProps(state) {
    const inited = state.getIn([ 'app', 'inited' ]);

    return {
        inited
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onInit: payload => dispatch(actions.init(payload))
    };
}
