import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

class App extends Component {

    componentDidMount() {
        this.props.onInit();
    }

    render() {
        const { inited } = this.props;

        return (
            <div className={b_('app')}>
                {inited ? 'App was initiated.' : 'App is initiating.'}
            </div>
        );
    }
}

App.propTypes = {
    inited: PropTypes.bool,
    onInit: PropTypes.func
};

App.defaultProps = {
    onInit: () => {}
};

export default App;
