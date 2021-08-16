import React, { Component } from 'react';
import { connect } from 'react-redux';
// import testImg from '../../../img/Detailpic.png';
// import callApi from '../../../config/utils/apiCaller';
import TopOrders from '../TopOrders/TopOrders';
import { Link } from 'react-router-dom';
import { showLoader, hideLoader } from '../../../actions/index';
import { Collapse } from 'react-bootstrap';

class UserInformation extends Component {

    formatter = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric'
    });

    constructor(props) {
        super(props);
        this.state = {
            topOrders: [],
            open: true,
            open2: true,
        }
    }

  
    render() {
        const { loggedUser } = this.props;
        
        return (
           
            <div
                className="col">
                <div className="rightBoxUserDetail">
                    <div
                        style={{ padding: "30px" }} >
                        <div
                        //  onClick={() => this.setState({ open: !this.state.open })}
                         aria-controls="example-collapse-text"
                         aria-expanded={this.state.open}
                        className="labelPointer row">
                            <div
                                className="col-8">
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Thông tin tài khoản </div>
                                </div>
                            </div>

                            <div className="col-4">
                                <div onClick={this.triggerUpdateUserPart} className="UpdateDetail1" >
                                    <Link className="UpdateDetail1" to="/userProfile/ediProfile">Chỉnh sửa</Link>
                                </div>
                            </div>
                        </div>
                        <Collapse in={this.state.open}>
                            <div
                                id="example-collapse-text">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <span className="detail1">Họ tên:
                                        </span>
                                            </div>
                                            <div className="detailFlow col">
                                                <span className="detail2">
                                                    {loggedUser.firstName} {loggedUser.lastName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <span className="detail1">Email:

                                        </span>
                                            </div>
                                            <div className="detailFlow col">
                                                <span className="detail2">
                                                    {loggedUser.mail}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <span className="detail1">Điện thoại:
                                        </span>
                                            </div>
                                            <div className="detailFlow col">
                                                <span className="detail2">
                                                    {loggedUser.phoneNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>

                {/* item */}

                <div style={{ marginTop: "30px" }} className="rightBoxUserDetail2">
                    <div
                        style={{ padding: "30px" }} >
                        <div 
                        // onClick={() => this.setState({ open2: !this.state.open2 })}
                        aria-controls="example-collapse-text2"
                        aria-expanded={this.state.open2}
                        className="labelPointer row">
                            <div className="col-8">
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Đặt chỗ gần đây</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="UpdateDetail1" ><Link className="UpdateDetail1" to="/userProfile/myOrders">Xem tất cả</Link></div>
                            </div>
                        </div>
                        <Collapse in={this.state.open2}>
                            <div id="example-collapse-text2">
                                <TopOrders />
                            </div>
                        </Collapse>
                    </div>
                </div>
                {/* end */}
            </div>

        );
    }

}

// export default UserInformation;
const mapStateToProps = state => {
    return {
        loggedUser: state.User
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);