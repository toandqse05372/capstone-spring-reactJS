import React, { Component } from 'react';
import { connect } from 'react-redux';
// import testImg from '../../../img/Detailpic.png'
import callApi from '../../../config/utils/apiCaller';
import { Link } from 'react-router-dom';
import { showLoader, hideLoader } from '../../../actions/index';
// import { Collapse } from 'react-bootstrap';

class TopOrders extends Component {
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
            UserOrders: [],
            topOrders: [],
            open: true,
        }
    }

    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    getTopThreeOrders = async (id) => {
        const { showLoader, hideLoader, loggedUser } = this.props;
        showLoader();
        const userId = loggedUser.id;
        let data = new FormData();
        data.append('uid', userId);
        await callApi(`order/top3/${id}`, 'POST', data)
            .then(res => {
                this.setState({
                    topOrders: res.data
                })
                hideLoader();
            }).catch(function (error) {
                if (error.response) {
                    hideLoader();
                }
            });
    }

    componentDidMount = () => {
        var jwtDecode = require('jwt-decode');
        var tokenLogin = JSON.parse(localStorage.getItem('tokenLogin'));
        if (tokenLogin) {
            var decoded = jwtDecode(tokenLogin);
            const id = decoded.user.userId;
            callApi(`userClient/${id}`, 'GET', null)
                .then(res => {
                    this.getTopThreeOrders(res.data.id);
                }).catch(function (error) {
                    if (error.response) {
                    }
                });
        }
    }

    showStatus = (status) => {
        /* PAID, UNPAID, SENT, EXPIRED */
        var myStatus = "";
        if (status === "PAID") {
            myStatus = "Đang xử lý";
        }
        if (status === 'UNPAID') {
            myStatus = "Chờ thanh toán";
        }
        if (status === 'SENT') {
            myStatus = "Thành công";
        }
        if (status === 'EXPIRED') {
            myStatus = "Hết hạn";
        }
        return myStatus;
    }

    showOrders = (topOrders) => {
        if (topOrders !== undefined) {
            var result = null;
            if (topOrders.length > 0) {
                result = topOrders.map((item, index) => {
                    return (
                        <div key={index}
                            className="detailTicketBoxDetail row no-gutters">
                            <div
                                className="detailTicketBox2Detail col-12">
                                <div className={`detailTicketChild${item.status} col-12`}>
                                    <div className="row no-gutters">
                                        <div className="col-4">
                                            <p style={{ fontSize: "12px" }}>Mã đơn hàng: #{item.orderCode} </p>
                                        </div>
                                        <div className="col-4">
                                            <p style={{ visibility: item.status === "UNPAID" ? "hidden" : "visible", fontSize: "12px" }}>Thanh toán: &nbsp;
                                                {this.formatter.format(Date.parse(item.purchaseDay))}
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p className="pushRight">{this.showStatus(item.status)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Số tiền thanh toán: {this.convertCurrecyToVnd(item.totalPayment)}</p>
                                        </div>
                                        <div className="col-6">
                                            <Link to={{
                                                pathname: `/userProfile/myOrder/${item.id}`
                                            }}>
                                                <p className="pushRight2">
                                                    Xem chi tiết
                                            </p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ margin: "20px 30px 20px 30px" }} className="row no-gutters">
                                    <div className="col-3">
                                        <img className="detailImg"
                                            src={item.place.imageLink}
                                            alt="FAIL TO LOAD" />
                                    </div>
                                    <div
                                        style={{ paddingLeft: "10px" }}
                                        className="col-9">
                                        <div className="row">
                                            <div className="col"><h1 className="nameDetail">Vé {item.place.name}</h1></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3"><span className="ticketTypeDetail">Loại vé: </span></div>
                                            <div className="col"><span className="ticketTypeDetail">{item.ticketTypeName}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <span className="redemDetail">
                                                    Thời gian:
                                        </span>
                                            </div>
                                            <div className="col">
                                                <span className="redemDetail">
                                                    {this.formatter.format(Date.parse(item.redemptionDate))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                });

            }

            else if (topOrders.length === 0) {
                return (
                    <div style={{ visibility: this.props.loader.loading === false ? "visible" : "hidden" }}>
                   <div>
                        <p className="notFoundOrderh1">Không tìm thấy đặt chỗ</p>
                        <p className="notFoundOrder">Hiện bạn chưa có bất kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!</p>
                    </div>
                </div>
                );
            }

            return result;
        }
    }

    render() {
        const { topOrders } = this.state;
        return (
            <div>
                {/* PAID, UNPAID, SENT, EXPIRED */}
                {this.showOrders(topOrders)}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loggedUser: state.User,
        loader: state.Loader
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

export default connect(mapStateToProps, mapDispatchToProps)(TopOrders);