import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserOrder.css';
import callApi from '../../../config/utils/apiCaller';
// import TopOrders from '../TopOrders/TopOrders';
import { Link } from 'react-router-dom';
import { showLoader, hideLoader } from '../../../actions/index';
// import { Collapse } from 'react-bootstrap';
import Pagination from "react-js-pagination";

class UserOrders extends Component {
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
            open: true,
            open2: true,
            arrowAnimation: false,
            limit: 5,
            activePage: 1,
            totalPage: 1,
            totalItems: 0,
            userId: null
        }
    }
    //Handle changing when user click in button paging "1 2 3 4 ..."
    handlePageChange = async (pageNumber) => {
        if (pageNumber !== this.state.activePage) {
            this.setState({
                activePage: pageNumber
            }
                , () => {
                    this.getAllOrder(this.state.userId)
                }
            )
        }
    }
    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    getAllOrder = async (id) => {
        window.scrollTo(0, 0)
        const { showLoader, hideLoader, loggedUser } = this.props;
        const { activePage, limit } = this.state;
        showLoader();
        const userId = loggedUser.id;
        let data = new FormData();
        data.append('uid', userId);
        data.append('limit', limit);
        data.append('page', activePage);
        await callApi(`order/user/${id}`, 'POST', data)
            .then(res => {
                this.setState({
                    totalItems: res.data.totalItems,
                    totalPage: res.data.totalPage,
                    UserOrders: res.data.listResult,
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
                    this.setState({
                        userId: res.data.id
                    })
                    this.getAllOrder(res.data.id);
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
            myStatus = "??ang x??? l??";
        }
        if (status === 'UNPAID') {
            myStatus = "Ch??? thanh to??n";
        }
        if (status === 'SENT') {
            myStatus = "Th??nh c??ng";
        }
        if (status === 'EXPIRED') {
            myStatus = "H???t h???n";
        }
        return myStatus;
    }

    toggleArrow = () => {
        this.setState({
            arrowAnimation: true
        })
    }

    showOrders = (topOrders) => {
        // const topOrd = topOrders.orderItems
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
                                        <p style={{ fontSize: "12px" }}>M?? ????n h??ng: #{item.orderCode} </p>
                                    </div>
                                    <div className="col-4">
                                        <p style={{ visibility: item.status === "UNPAID" ? "hidden" : "visible", fontSize: "12px" }}>Thanh to??n: &nbsp;
                                            {/* {item.purchaseDay} */}
                                            {this.formatter.format(Date.parse(item.purchaseDay))}
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p className="pushRight">{this.showStatus(item.status)}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p>S??? ti???n thanh to??n: {this.convertCurrecyToVnd(item.totalPayment)}</p>
                                    </div>
                                    <div className="col-6">
                                        <Link to={{
                                            pathname: `/userProfile/myOrder/${item.id}`
                                        }}>
                                            <p className="pushRight2">
                                                Xem chi ti???t
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: "20px 30px 20px 30px" }} className="row no-gutters">
                                <div
                                    className="col-3">
                                    <img className="detailImg"
                                        src={item.place.imageLink}
                                        alt="FAIL TO LOAD" />
                                </div>
                                <div
                                    style={{ marginLeft: "10px" }}
                                    className="col">
                                    <div className="row">
                                        <div className="col"><h1 className="nameDetail">V?? {item.place.name}</h1></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3"><span className="ticketTypeDetail">Lo???i v??: </span></div>
                                        <div className="col"><span className="ticketTypeDetail">{item.ticketTypeName}</span></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <span className="redemDetail">
                                                Th???i gian:
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
                <p style={{ visibility: this.props.loader.loading === false ? "visible" : "hidden" }}>
                   <div>
                        <p className="notFoundOrderh1">Kh??ng t??m th???y ?????t ch???</p>
                        <p className="notFoundOrder">Hi???n b???n ch??a c?? b???t k??? ?????t ch??? n??o, h??y ?????t tr??n trang ch??? ngay!</p>
                    </div>
                </p>
            );
        }
        return result;
    }

    render() {
        const { UserOrders } = this.state;
        return (
            <div className="col">
                <div className="rightBoxUserDetail2">
                    <div
                        style={{ padding: "30px" }} >
                        <div
                            onClick={() => this.setState({ open2: !this.state.open2 })}
                            aria-controls="example-collapse-text2"
                            aria-expanded={this.state.open2}
                            className="labelPointer row">
                            <div className="col-12">
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">L???ch s??? ?????t ch???</div>
                                </div>
                            </div>
                        </div>
                        <div id="example-collapse-text2">
                            {this.showOrders(UserOrders)}
                        </div>
                        <div style={{visibility: this.props.loader.loading===false?"visible":"hidden"}}>
                            <Pagination
                                hideNavigation
                                hideFirstLastPages
                                //What number is selected
                                activePage={this.state.activePage}
                                //The number of items each page
                                itemsCountPerPage={this.state.limit}
                                //Total of items in list
                                totalItemsCount={this.state.totalItems}
                                //Set Css of boostrap 4
                                itemClass="page-item"
                                //Set Css of boostrap 4
                                linkClass="page-link"
                                //Trigger handle page change
                                onChange={this.handlePageChange.bind(this)}

                            />
                        </div>
                        {/* </Collapse> */}
                    </div>
                </div>
            </div>

        );

    }

}

// export default UserOrders;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);