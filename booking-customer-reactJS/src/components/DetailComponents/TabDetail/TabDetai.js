import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './TabDetail.css';
import Zoom from 'react-reveal/Zoom';

const LeftTab = "LeftTab";
const LeftTabItem = "LeftTabItem";
const RighTab = "RighTab";

class TabDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { place } = this.props
        return (
            <div className="row no-gutters">
                <div className={`col-3 ${LeftTab}`} >
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className={`nav-link active ${LeftTabItem}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Thông tin</a>
                        <a className={`nav-link  ${LeftTabItem}`} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Điều khoản</a>
                        <a className={`nav-link  ${LeftTabItem}`} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Hướng dẫn</a>
                    </div>
                    <div className="GobokiLogo">
                        <svg
                            width="99" height="31" viewBox="0 0 99 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4671 3.64522H17.2361C17.8457 3.64522 18.3477 3.14321 18.3477 2.53362V1.27859C18.3477 0.669004 17.8457 0.166992 17.2361 0.166992H15.4671C14.8575 0.166992 14.3555 0.669004 14.3555 1.27859V2.53362C14.3555 3.14321 14.8575 3.64522 15.4671 3.64522Z" fill="#FF7062" />
                            <path d="M17.0087 6.61049H15.8851C14.9887 6.61049 14.5345 7.10055 14.5345 7.73404V7.85357C13.7934 7.33961 12.9567 6.93321 12.0722 6.6583C11.4029 6.39534 10.5662 6.2041 9.52628 6.2041C9.45457 6.2041 9.3948 6.2041 9.32309 6.2041C9.25137 6.2041 9.17966 6.2041 9.10794 6.2041C4.06391 6.2041 0 9.87357 0 15.0252C0 20.2126 4.06391 23.8462 9.10794 23.8462C10.9845 23.8462 12.7176 23.3442 14.1759 22.4478V22.7227C14.1759 25.7228 12.0005 26.8225 9.41871 26.8225C7.86486 26.8225 6.81302 26.4878 6.02415 26.189C5.1277 25.8902 4.63764 26.1173 4.27906 26.9539L4.0161 27.707C3.65752 28.5676 3.88462 29.1293 4.74521 29.4879C5.90462 29.9899 7.78119 30.3844 9.66971 30.3844C13.8292 30.3844 18.3832 28.209 18.3832 22.4239V7.997C18.3713 7.10055 17.9051 6.61049 17.0087 6.61049ZM9.27528 20.3202C6.4664 20.3202 4.19539 17.9655 4.19539 15.061C4.19539 12.1565 6.4664 9.80186 9.27528 9.80186C9.3948 9.80186 9.51433 9.80186 9.6219 9.81381C9.63386 9.81381 9.63386 9.81381 9.63386 9.81381C9.66971 9.81381 9.70557 9.82576 9.75338 9.82576C12.3352 10.0768 14.3552 12.3239 14.3552 15.061C14.3552 17.9655 12.0842 20.3202 9.27528 20.3202Z" fill="#5B5B5B" />
                            <path d="M28.2443 6.21582C33.3601 6.21582 37.5196 9.88529 37.5196 15.0249C37.5196 20.2124 33.3601 23.8341 28.2443 23.8341C23.1286 23.8341 19.0049 20.2005 19.0049 15.0249C18.993 9.87334 23.1286 6.21582 28.2443 6.21582ZM28.2443 20.2722C30.9815 20.2722 33.2644 18.1565 33.2644 15.0249C33.2644 11.9172 30.9815 9.77772 28.2443 9.77772C25.5072 9.77772 23.2601 11.9292 23.2601 15.0249C23.2601 18.1685 25.4952 20.2722 28.2443 20.2722Z" fill="#5B5B5B" />
                            <path d="M67.6281 6.21582C72.7439 6.21582 76.9034 9.88529 76.9034 15.0249C76.9034 20.2124 72.7439 23.8341 67.6281 23.8341C62.5124 23.8341 58.3887 20.2005 58.3887 15.0249C58.3767 9.87334 62.5004 6.21582 67.6281 6.21582ZM67.6281 20.2722C70.3653 20.2722 72.6482 18.1565 72.6482 15.0249C72.6482 11.9172 70.3653 9.77772 67.6281 9.77772C64.891 9.77772 62.6439 11.9292 62.6439 15.0249C62.6319 18.1685 64.879 20.2722 67.6281 20.2722Z" fill="#5B5B5B" />
                            <path d="M48.0861 6.21539C48.0502 6.21539 48.0024 6.21539 47.9666 6.21539C47.9307 6.21539 47.8948 6.21539 47.859 6.21539C47.4885 6.21539 47.1299 6.2393 46.8071 6.29906C45.3011 6.47835 43.9146 6.99231 42.7432 7.76924C42.7432 7.68557 42.7432 7.6019 42.7432 7.51823V1.38651C42.7432 0.490059 42.2771 0 41.3567 0H39.9344C39.0379 0 38.5479 0.490059 38.5479 1.38651V22.0527C38.5479 22.973 39.0379 23.4392 39.9344 23.4392H41.0579C41.9783 23.4392 42.4444 22.973 42.4444 22.2559V22.1005C43.3528 22.7459 44.3927 23.224 45.5282 23.5229C46.1139 23.7141 46.8071 23.8456 47.596 23.8456C47.6677 23.8456 47.7514 23.8456 47.8231 23.8456C47.9068 23.8456 48.0024 23.8456 48.0861 23.8456C53.2018 23.8456 57.3614 20.212 57.3614 15.0245C57.3614 9.87291 53.2018 6.21539 48.0861 6.21539ZM47.5004 20.2478C45.0262 19.9729 43.0899 17.941 43.0899 15.0245C43.0899 12.2156 44.9306 10.1956 47.3092 9.83705C47.5602 9.80119 47.8231 9.77729 48.0861 9.77729C50.8232 9.77729 53.1062 11.9288 53.1062 15.0245C53.1062 18.1561 50.8232 20.2717 48.0861 20.2717C47.8829 20.2717 47.6916 20.2598 47.5004 20.2478Z" fill="#5B5B5B" />
                            <path d="M78.123 1.38651C78.123 0.49006 78.6131 0 79.5096 0H80.9319C81.8523 0 82.3184 0.49006 82.3184 1.38651V12.5503H84.3982L87.9003 7.53019C88.2948 6.87279 88.7968 6.60983 89.5498 6.60983H91.1276C92.2511 6.60983 92.6097 7.3748 91.9881 8.2593L87.7928 14.14V14.2117L92.7412 21.8017C93.3029 22.7579 92.9444 23.4512 91.8208 23.4512H90.0399C89.2749 23.4512 88.7848 23.1523 88.4263 22.4949L84.4938 16.0883H82.3184V22.0646C82.3184 22.985 81.8523 23.4512 80.9319 23.4512H79.5096C78.6131 23.4512 78.123 22.985 78.123 22.0646V1.38651Z" fill="#5B5B5B" />
                            <path d="M94.4023 2.37858V1.38651C94.4023 0.49006 94.8685 0 95.753 0H97.2112C98.1077 0 98.5977 0.49006 98.5977 1.38651V2.37858C98.5977 3.27503 98.1077 3.72923 97.2112 3.72923H95.753C94.8565 3.74119 94.4023 3.27503 94.4023 2.37858ZM94.4023 7.99634C94.4023 7.09989 94.8685 6.60983 95.753 6.60983H97.2112C98.1077 6.60983 98.5619 7.09989 98.5619 7.99634V22.0646C98.5619 22.985 98.0957 23.4512 97.2112 23.4512H95.753C94.8565 23.4512 94.4023 22.985 94.4023 22.0646V7.99634Z" fill="#5B5B5B" />
                        </svg>
                    </div>
                </div>
                <div className={`col ${RighTab}`}>
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            {place.detailDescription}
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">

                            Bằng cách truy cập và/hoặc sử dụng Website www.goboki.com (“Trang Web”), bạn thừa nhận rằng bạn đã đọc, hiểu và đồng ý chịu sự ràng buộc bởi các Điều Khoản Sử Dụng được quy định dưới đây và các điều khoản và điều kiện khác liên quan đến Trang Web, bao gồm nhưng không giới hạn ở các điều khoản và điều kiện về bảo mật và Các Câu Hỏi Thường Gặp, mà chúng cấu thành các thành phần không thể tách rời của các Điều Khoản Sử Dụng (“Điều Khoản”) này. Bạn phải đủ mười tám (18) tuổi trở lên để được phép sử dụng Trang Web. Xin lưu ý rằng chúng tôi có thể thay đổi, sửa đổi, bổ sung và loại bỏ các Điều Khoản này vào bất cứ thời điểm nào mà không cần thông báo trước. Bạn phải đọc các Điều Khoản này một cách định kỳ. Bằng việc tiếp tục sử dụng Trang Web này sau khi đã có những thay đổi như vậy đối với các Điều Khoản, người truy cập, người dùng hoặc Người Dùng Đã Đăng Ký (“bạn” hay “Người Dùng”) đồng ý và chấp thuận với những thay đổi đó. Nếu bạn sử dụng bất kỳ dịch vụ nào khác của chúng tôi, thì việc sử dụng của bạn được dựa trên sự chấp thuận và tuân thủ các điều khoản và điều kiện được áp dụng đối với các dịch vụ đó.
                        </div>
                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                            <div className="howToOrderBox1">
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
                        </div>
                    </div>
                </div>
            </div >

        );
    }


}

export default TabDetail;
