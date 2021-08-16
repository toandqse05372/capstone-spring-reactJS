import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';


class HowItWorks extends Component {

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
            <div className="howItWorksBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">Quy chế hoạt động</div>
                </div>
                <div>
                    <ol className="roman">
                        <li>QUY ĐỊNH CHUNG</li>
                        <ol>
                            <li>
                                Nguyên tắc hoạt động:
                                <ul>
                                    <li>Trang Web Goboki có loại hình cung cấp dịch vụ là sàn giao dịch thương mại điện tử và khuyến mại trực tuyến. Trang Web Goboki cung cấp các dịch vụ đặt vé trực tuyến thuộc các du lịch, giải trí (sau đây gọi tắt là “Dịch Vụ”)</li>
                                    <li>Theo đó, Goboki không trực tiếp cung cấp dịch vụ tới Khách hàng mà chỉ là trung gian giữa Khách hàng và người bán, giữa các doanh nghiệp với người tiêu dùng, giúp kết nối Khách hàng và người bán lại với nhau một cách nhanh chóng, tiện lợi và vô cùng hiệu quả. Goboki bán các gói sử dụng dịch vụ trực tuyến với giá phải chăng và/hoặc kèm những lợi ích khác để Khách hàng được sử dụng dịch vụ có giá tốt nhất.
                                    </li>
                                    <li>Nhà cung cấp muốn tham gia Trang Web Goboki phải đáp ứng đầy đủ các quy định của pháp luật có liên quan, không thuộc các trường hợp cấm kinh doanh, cấm quảng cáo theo quy định của pháp luật.
                                    </li>
                                    <li>Trang Web Goboki đóng vai trò quảng cáo, là địa chỉ trung gian cho các doanh nghiệp, cá nhân giao thương với người tiêu dùng. Doanh nghiệp, cá nhân tham gia giao dịch tại Trang Web Goboki tự do thỏa thuận trên cơ sở tôn trọng quyền và lợi ích hợp pháp của các bên.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Mục đích thành lập:
                                <ul>
                                    <li>Tại Việt Nam, xu hướng công nghệ hóa ngày càng phát triển mạnh mẽ, lan rộng tới tất cả các lĩnh vực kinh doanh và đời sống, trong đó, mua sắm online đang là một xu thế phát triển tất yếu trong thời kỳ hội nhập. Chỉ với máy tính hoặc thiết bị di động cầm tay có kết nối mạng, người tiêu dùng hoàn toàn có thể vào tìm kiếm, tham khảo và lựa chọn các hàng hóa, dịch vụ mà mình đang cần, tiết kiệm thời gian và chi phí.
                                    </li>
                                    <li>Nhận thấy nhu cầu đó, Trang Web Goboki được thiết lập ra để cung cấp sàn giao dịch thương mại điện tử nhằm mục đích tạo một môi trường kinh doanh, trao đổi, cung ứng dịch vụ và đáp ứng nhu cầu một cách nhanh chóng, thuận tiện, an toàn, tiết kiệm chi phí, ưu việt và phù hợp với thuần phong mỹ tục, xu thế hội nhập công nghiệp hóa, hiện đại hóa và các quy định của pháp luật cho các thương nhân, cá nhân và tổ chức trong hoạt động thương mại, là hệ thống bán đối với các tour du lịch, đặt phòng khách sạn và vé máy bay với chi phí ưu đãi. Trang Web Goboki cũng cung cấp toàn diện và chuyên nghiệp cho khách hàng sử dụng hàng hóa, dịch vụ online, giúp khách hàng tiết kiệm được chi phí để từ đó có thể tập trung và nâng cao việc bán và chăm sóc khách hàng; đồng thời, người tiêu dùng – Khách hàng cũng là những đối tượng được hưởng những giá trị tốt nhất và tiện ích nhất từ sản phẩm và dịch vụ mà các doanh nghiệp cung cấp.
                                    </li>
                                </ul>
                            </li>
                        </ol>

                        <li>QUY TRÌNH GIAO DỊCH</li>
                        <ol>
                            <li>
                                Quy trình dành cho Người sử dụng dịch vụ/Khách hàng:
                                <ul>
                                    <li>Trang Web Goboki cho phép Khách hàng tạo một tài khoản Khách hàng bằng việc đăng ký thành viên của Trang Web Goboki, dựa trên các dữ liệu/thông tin Khách hàng cung cấp.
                                    </li>
                                    <li>Hơn nữa, Khách hàng đồng ý rằng Goboki không chịu trách nhiệm đối với bất kỳ tổn thất hoặc thiệt hại mà Khách hàng hay bất kỳ bên thứ ba nào phải gánh chịu trong trường hợp sự tổn thất hoặc thiệt hại đó là do thông tin không chính xác hoặc không đầy đủ mà Khách hàng cung cấp. Sau khi đăng ký, Khách hàng sẽ nhận được một mật khẩu và thông tin nhận dạng Người Dùng (“Tên Đăng Nhập”). Khách hàng sẽ chịu trách nhiệm cho việc duy trì tính bảo mật của mật khẩu và Tên Đăng Nhập, và Khách hàng hoàn toàn chịu trách nhiệm cho tất cả các hoạt động liên quan đến mật khẩu và Tên Đăng Nhập. Khách hàng chỉ có thể sử dụng một Tên Đăng Nhập và mật khẩu tại một thời điểm và không được phép sử dụng nhiều hơn một Tên Đăng Nhập. Mật khẩu của Khách hàng bị hạn chế nghiêm ngặt chỉ cho việc sử dụng cá nhân của chính Khách hàng, và Khách hàng phải đồng ý bảo mật mật khẩu của Khách hàng. Khách hàng đồng ý thông báo ngay lập tức cho Goboki về việc sử dụng trái phép tài khoản của Khách hàng hoặc bất kỳ sự vi phạm về an ninh nào. Để bảo mật tốt hơn, hãy đảm bảo rằng Khách hàng đăng xuất hoặc thoát khỏi tài khoản của Khách hàng sau mỗi lần sử dụng Trang Web Goboki. Khách hàng phải đồng ý rằng Goboki sẽ không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào mà Khách hàng hoặc các bên thứ ba phải gánh chịu phát sinh từ việc Khách hàng không tuân thủ các điều khoản này.
                                    </li>
                                </ul>
                            </li>
                        </ol>

                        <li>QUẢN LÝ THÔNG TIN XẤU</li>
                        <ol>
                            <li>
                                Quy trình dành cho Người sử dụng dịch vụ/Khách hàng:
                                <ul>
                                    <li> Doanh nghiệp sẽ cung cấp danh sách các sản phẩm cấm giao dịch để thành viên sử dụng được biết, trên cơ sở đó để tránh những vi phạm trong việc đăng tải sản phẩm. Khách hàng/Nhà cung cấp sử dụng Trang Web Goboki không được quảng cáo những hàng hóa, dịch vụ là: Hàng hóa, dịch vụ cấm kinh doanh theo quy định của pháp luật; Thuốc lá; Rượu các loại; Sản phẩm sữa thay thế sữa mẹ dùng cho trẻ dưới 24 tháng tuổi; Sản phẩm dinh dưỡng bổ sung dùng cho trẻ dưới 06 tháng tuổi; bình bú và vú ngậm nhân tạo; Thuốc kê đơn; thuốc không kê đơn nhưng được cơ quan nhà nước có thẩm quyền khuyến cáo hạn chế sử dụng hoặc sử dụng có sự giám sát của thầy thuốc; Các loại sản phẩm, hàng hóa có tính chất kích dục; Súng săn và đạn súng săn, vũ khí thể thao và các loại sản phẩm, hàng hóa có tính chất kích động bạo lực; Các sản phẩm, hàng hóa, dịch vụ cấm quảng cáo khác do Chính phủ quy định khi có phát sinh trên thực tế.</li>
                                    <li>Goboki thiết lập website để bán các dịch vụ thuộc danh mục dịch vụ kinh doanh có điều kiện cấp Giấy chứng nhận đủ điều kiện kinh doanh phải công bố trên website của mình số, ngày cấp và nơi cấp Giấy chứng nhận đủ điều kiện kinh doanh đối với dịch vụ đó.
                                    </li>
                                    <li>HNêu rõ trách nhiệm của thành viên sử dụng dịch vụ của Goboki: ví dụ các quy định cấm liên quan đến việc đăng tải sản phẩm/dịch vụ (cần cung cấp danh sách các sản phẩm cấm giao dịch), quy định về sử dụng dịch vụ, quy định về việc cung cấp thông tin chính xác.
                                    </li>
                                    <li>Nêu rõ trách nhiệm của thành viên sử dụng dịch vụ của Goboki: ví dụ các quy định cấm liên quan đến việc đăng tải sản phẩm/dịch vụ (cần cung cấp danh sách các sản phẩm cấm giao dịch), quy định về sử dụng dịch vụ, quy định về việc cung cấp thông tin chính xác.</li>
                                    <li>Cơ chế rà soát, kiểm soát thông tin về sản phẩm/dịch vụ của Goboki đối với sản phẩm/dịch vụ đăng tải trên Trang Web Goboki.
                                    </li>
                                    <li>Khi có phát sinh lỗi từ kỹ thuật, lỗi đường truyền, phần mềm. Goboki có trách nhiệm bảo trì, bảo dưỡng, khôi phục, khắc phục mọi sự cố xảy ra đối với Trang Web Goboki trong thời gian nhanh nhất.
                                    </li>
                                </ul>
                            </li>
                        </ol>

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

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
