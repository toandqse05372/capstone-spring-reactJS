import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

class AboutUsComp extends Component {

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
            <div className="abUsBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">Về chúng tôi</div>
                </div>
                <div>
                    <p>Goboki đem đến cho bạn giải pháp thật đơn giản để khám phá các điểm tham quan và hoạt động du lịch, dù là người đi du lịch theo tour trọn gói hay là người đi du lịch tự túc. Tất cả đều có thể dễ dàng tìm kiếm các thông tin liên quan đến chuyến đi, cũng như rất tiện lợi trong việc đặt các dịch vụ du lịch liên quan; mọi thứ giúp du khách tiết kiệm được thời gian, tiết kiệm được tiền bạc.
                    Khám phá và đặt vé tại điểm đến với giá tốt nhất. Với vài cú nhấp chuột, bạn có thể cùng gia đình và bạn bè tham gia vui chơi thỏa thích tại những khu vui chơi mình mong muốn.
                    </p>
                    <br></br>
                    <br></br>
                    <label className="abUsLabel">SỨ MỆNH</label>
                    <h3>Tận hưởng những ngày nghỉ tuyệt vời chưa bao giờ đơn giản đến như vậy</h3>
                    <p>
                        Du lịch là tận hưởng! Goboki giúp cho mọi người đi du lịch dễ dàng hơn. Rất nhiều hoạt động du lịch đang chờ bạn khám phá, mục tiêu của Goboki luôn là kết nối du khách với những trải nghiệm du lịch thú vị.
                    </p>
                    <br></br>
                    <label className="abUsLabel">CAM KẾT</label>
                    <h3>Luôn cam kết giá tốt nhất</h3>
                    <p>
                        Là đối tác chính thức của các điểm tham quan hàng đầu và các nhà cung cấp trong cả nước, Goboki luôn đảm bảo tất cả các dịch vụ sẽ mang lại trải nghiệm chất lượng với mức giá tốt nhất. Nếu bạn phát hiện mức giá thấp hơn, Goboki sẽ hoàn lại khoản chênh lệch.
                    </p>
                    <br></br>
                    <h3>Dịch vụ nhanh chóng & an toàn</h3>
                    <p>
                        Giao diện trực quan của Goboki và các biện pháp bảo mật nghiêm ngặt đảm bảo mọi người đều có trải nghiệm đặt dịch vụ an toàn và nhanh chóng.
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsComp);
