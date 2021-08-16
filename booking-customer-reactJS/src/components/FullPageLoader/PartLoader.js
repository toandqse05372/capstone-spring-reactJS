import React, { Component } from 'react';
import { connect } from 'react-redux';
// import loadingLG from '../../img/Ellipsis-1.9s-200px.gif';

import loadingLG from '../../img/Loading Goboki.gif';

import './FullPageLoader.css';

class PartLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { loaderPart } = this.props;
        // console.log(loader.loading);
        if (!loaderPart.loading) return null

        return (
            // <div className="loader2-container">
            //     <div className="loader2">
            //         <img src={loadingLG} alt="FALT TO LOAD"/>
            //     </div>
            // </div>
            <div>

            </div>
        );
    }

}

// export default HomePage;

const mapStateToProps = state => {
    return {
        loaderPart: state.LoaderPart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

// export default MyCounter;
export default connect(mapStateToProps, mapDispatchToProps)(PartLoader);
