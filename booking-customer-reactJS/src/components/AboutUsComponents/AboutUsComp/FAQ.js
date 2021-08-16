import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

//Home page
class FAQ extends Component {

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
            <div className="FAQbox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">F.A.Q</div>
                </div>
                <div>
                    <p>Tôi có thể mua vé online được không? Những hình thức thanh toán nào được chấp nhận khi mua vé online?
                        <h1>Bạn hoàn toàn có thể mua vé online trên website của Goboki. Khi mua vé online, bạn có thể thanh toán bằng các loại thẻ tín dụng/ghi nợ, VISA.
                    </h1>
                    </p>
                    <p>Tôi có thể mua vé online được không? Những hình thức thanh toán nào được chấp nhận khi mua vé online?
                        <h1>Bạn hoàn toàn có thể mua vé online trên website của Goboki. Khi mua vé online, bạn có thể thanh toán bằng các loại thẻ tín dụng/ghi nợ, VISA.
                    </h1>
                    </p>
                    <p>Tôi có thể mua vé online được không? Những hình thức thanh toán nào được chấp nhận khi mua vé online?
                        <h1>Bạn hoàn toàn có thể mua vé online trên website của Goboki. Khi mua vé online, bạn có thể thanh toán bằng các loại thẻ tín dụng/ghi nợ, VISA.
                    </h1>
                    </p><p>Tôi có thể mua vé online được không? Những hình thức thanh toán nào được chấp nhận khi mua vé online?
                        <h1>Bạn hoàn toàn có thể mua vé online trên website của Goboki. Khi mua vé online, bạn có thể thanh toán bằng các loại thẻ tín dụng/ghi nợ, VISA.
                    </h1>
                    </p><p>Tôi có thể mua vé online được không? Những hình thức thanh toán nào được chấp nhận khi mua vé online?
                        <h1>Bạn hoàn toàn có thể mua vé online trên website của Goboki. Khi mua vé online, bạn có thể thanh toán bằng các loại thẻ tín dụng/ghi nợ, VISA.
                    </h1>
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
