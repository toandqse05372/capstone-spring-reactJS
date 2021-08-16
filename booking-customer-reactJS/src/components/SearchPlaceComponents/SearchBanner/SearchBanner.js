import React, { Component } from 'react';
import { connect } from 'react-redux';
import Flip from 'react-reveal/Flip';
import './SearchBanner.css'

const classes = 'masthead2 mg-10'

class SearchBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { loader } = this.props;
        var layer = loader.loading;
        return (
            <header className={classes}>
                <div
                className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <Flip when={layer === false ? true : false} duration={700} top cascade>
                                <h1 className="introduction">
                                    Tự do khám phá trải nghiệm du lịch
                                    </h1>
                                <p className="des">Khám phá và đặt trước các hoạt động du lịch đặc sắc với giá độc quyền</p>
                            </Flip>
                            <div className="block-17">
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

}

// export default Banner;

const mapStateToProps = state => {
    return {
        loader: state.Loader,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBanner);
