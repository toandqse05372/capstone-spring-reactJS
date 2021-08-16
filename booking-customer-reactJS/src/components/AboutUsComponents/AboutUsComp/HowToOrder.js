import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

class HowToOrder extends Component {

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
            <div className="howToOrderBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">Cách đặt chỗ</div>
                </div>
                <div>
                    <ol>
                        <li>
                        Tìm công viên
                          <p>Bắt đầu tìm công viên bằng cách điền thông tin điểm đến, địa danh hoặc tên công viên.</p>
                        </li>
                        <li>
                        Chọn công viên
                           <p>Trên trang kết quả tìm kiếm, bạn chọn công viên mong muốn. Nhấn tiêu đề để xem thông tin chi tiết công viên.</p>
                        </li>
                        <li>
                        Đặt vé
                          <p>Trên trang thông tin công viên, chọn loại vé và số lượng vé bạn muốn đặt. Thông tin vé (tên công viên, ngày sử dụng, giá vé, v.v.)</p>
                        </li>
                        <li>
                        Xác nhận thông tin liên lạc
                          <p>Thông tin liên hệ của khách hàng đã được hiển thị theo đúng thông tin cá nhân được đăng ký tài khoản trước đó. Hãy chắc chắn rằng tất cả thông tin đều chính xác, sau đó tiến hành thanh toán.</p>
                        </li>
                        <li>
                        Thực hiện thanh toán
                          <p>Chọn phương thức thanh toán mong muốn. Chú ý không thanh toán vượt quá thời gian quy định.</p>
                        </li>
                        <li>
                        Nhận vé
                          <p>Chúng tôi sẽ gửi vé vào email của bạn trong vòng 60 phút sau khi nhận được số tiền thanh toán.</p>
                        </li>
                    </ol>
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

export default connect(mapStateToProps, mapDispatchToProps)(HowToOrder);
