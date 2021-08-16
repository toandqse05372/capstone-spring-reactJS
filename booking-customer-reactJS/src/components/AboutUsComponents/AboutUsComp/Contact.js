import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div className="contactBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">Liên Hệ</div>
                </div>
                <div>
                    <h1>Going Booking - GOBOKI</h1>
                    <br></br>
                    <div className="row">
                        <div className="col-2">
                            <span>Email:</span>
                        </div>
                        <div className="col">
                            <p>goboki.cs@gmail.com. </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <span>Hotline:</span>
                        </div>
                        <div className="col">
                            <p>0888 662 369 - 0983 450 322. </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <span>Address:</span>
                        </div>
                        <div className="col">
                            <p>Trường Đại học FPT, Km29 Thạch Hòa, Thạch Thất, Hà Nội. </p>
                        </div>
                    </div>


                </div>
                <FullPageLoader />
            </div>
        );
    }

}

// export default HomePage;

const mapStateToProps = state => {
    return {
        loader: state.Loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserDetail: (user) => {
            dispatch(getUserLogin(user))
        },
        fetchAllCity: (listCity) => {
            dispatch(fetchAllCity(listCity))
        },
        fetchAllCategory: (listCategory) => {
            dispatch(fetchAllCategory(listCategory))
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
