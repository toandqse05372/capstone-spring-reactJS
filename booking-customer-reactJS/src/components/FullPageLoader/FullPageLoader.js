import React, { Component } from 'react';
import { connect } from 'react-redux';
// import loadingLG from '../../img/Ellipsis-1.9s-200px.gif';

import loadingLG from '../../img/Loading Goboki.gif';

import './FullPageLoader.css';

class FullPageLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { loader } = this.props;
        if (!loader.loading) return null

        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={loadingLG} alt="FALT TO LOAD"/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loader: state.Loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPageLoader);
