import React, { Component  } from 'react';
// import { connect } from 'react-redux';
import './RightPartDetail.css';

class RightPartDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="rightPart"
            >
                <p className="p1">Giá từ</p>
                <p className="p2">đ 515.000</p>
                <div className="row">
                <button 
                className="rightPartBtn">
                    Tìm vé
                </button>
                <button onclick={this.handleClick}>Click</button>
                </div>

                <div 
                style={{marginBottom: "10px"}}
                className="row no-gutters">
                    <div className="col-1">
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 1V5" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 1V5" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 9H19" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="col">
                        <p className="p3">
                            Vé theo ngày cố định
                        </p>
                    </div>
                </div>

                <div 
                style={{marginBottom: "10px"}}
                className="row no-gutters">
                    <div className="col-1">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 5V11L15 13" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="col">
                        <p className="p4">
                            Giờ mở cửa: 5:00 A.M - 21:00 P.M(Thứ 2 đến Chủ nhật)
                        </p>
                    </div>
                </div>

                <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />

                <div 
                style={{marginBottom: "10px"}}
                className="row no-gutters">
                    <div className="col-1">
                        <svg 
                        className="rightPartIcon"
                        width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 1.875V21.125" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.875 5.375H4.3125C3.50027 5.375 2.72132 5.69766 2.14699 6.27199C1.57266 6.84632 1.25 7.62527 1.25 8.4375C1.25 9.24973 1.57266 10.0287 2.14699 10.603C2.72132 11.1773 3.50027 11.5 4.3125 11.5H8.6875C9.49973 11.5 10.2787 11.8227 10.853 12.397C11.4273 12.9713 11.75 13.7503 11.75 14.5625C11.75 15.3747 11.4273 16.1537 10.853 16.728C10.2787 17.3023 9.49973 17.625 8.6875 17.625H1.25" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="col">
                        <p className="p5">
                            Không hoàn hủy vé
                        </p>
                    </div>
                </div>

                <div 
                style={{marginBottom: "10px"}}
                className="row no-gutters">
                    <div className="col-1">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 8V1H17V8" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V10C1 9.46957 1.21071 8.96086 1.58579 8.58579C1.96086 8.21071 2.46957 8 3 8H19C19.5304 8 20.0391 8.21071 20.4142 8.58579C20.7893 8.96086 21 9.46957 21 10V15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H17" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 13H5V21H17V13Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="col">
                        <p className="p6">
                            Xuất trình vé điện tử hoặc in voucher
                        </p>
                    </div>
                </div>

              
            </div>
        );
    }

}

export default RightPartDetail;
