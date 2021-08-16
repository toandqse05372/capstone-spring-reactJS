import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserOrderDetail.css';
import callApi from '../../../config/utils/apiCaller';
import { Link } from 'react-router-dom';
// import { fetchVisitor2, fetchVisitor } from '../../../actions/index';
import { showLoader, hideLoader } from '../../../actions/index';

class UserOrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderDetail: [],
        }
    }


    componentDidMount = async () => {
        const { match, loggedUser } = this.props;
        var id = match.params.id;
        const userId = loggedUser.id;
        let data = new FormData();
        data.append('uid', userId);
        await callApi(`order/${id}`, 'POST', data)
            .then(res => {
                this.setState({
                    orderDetail: res.data
                })
            }).catch(function (error) {
                if (error.response) {
                }
            });
    }

    formatter = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",

    });

    convertCurrecyToVnd = (currency) => {
        if (currency !== undefined)
            return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    convertDateToLocalVN = (date) => {
        if (date !== undefined)
            return this.formatter.format(Date.parse(date));
    }

    showQtyxType = (VisitorTypeArr) => {
        var result = null;
        if (VisitorTypeArr.length > 0) {
            result = VisitorTypeArr.map((item, index) => {
                return (
                    <span key={index} className="typeDetail2">{item.quantity}x {item.visitorTypeName}<br></br></span>
                )
            });
        }
        return result;
    }

    fetchOrders = () => {
        const { orderDetail } = this.state;
        const { fetchVisitor } = this.props;
        fetchVisitor(orderDetail.orderItems);
    }
    storeTokenPaymentInLocal = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    createTokenOrder=()=>{
        const paymentToken = this.storeTokenPaymentInLocal(5);
        localStorage.setItem('tokenPayment', JSON.stringify(paymentToken));
    }

    showOrderByStatus = (orderDetail) => {
        const orderStatus = orderDetail.status;
        var date = new Date(orderDetail.redemptionDate);
        if (orderStatus === "PAID") {
            return (
                <div style={{ padding: "20px" }}>
                    <div id="inline">
                        <div className="bulletListCustome"></div>
                        <div className="content">Mã đơn hàng: #{orderDetail.orderCode} </div>
                        <div className="content2"><p>Số tiền thanh toán:<i>{this.convertCurrecyToVnd(orderDetail.totalPayment)}</i></p></div>
                    </div>
                    <p className="orderTime">Thanh toán: {this.convertDateToLocalVN(orderDetail.purchaseDay)}</p>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-4" >

                        </div>
                        <div className="col-4" >
                            <svg className="svgLG" width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="55" fill="#197ACF" />
                                <path d="M75.9336 45.4092H78.9919C82.2364 45.4092 85.348 46.6981 87.6423 48.9923C89.9365 51.2865 91.2253 54.3981 91.2253 57.6426C91.2253 60.8871 89.9365 63.9987 87.6423 66.2929C85.348 68.5871 82.2364 69.876 78.9919 69.876H75.9336" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M27 45.4092H75.9336V72.9343C75.9336 76.1788 74.6447 79.2904 72.3505 81.5846C70.0563 83.8788 66.9447 85.1677 63.7002 85.1677H39.2334C35.9889 85.1677 32.8773 83.8788 30.5831 81.5846C28.2889 79.2904 27 76.1788 27 72.9343V45.4092Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M39.2344 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M51.4668 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M63.6992 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="col-4" >

                        </div>
                        <div
                            style={{ textAlign: "center" }}
                            className="col-12">
                            <p className="mp3"> Đang xử lý đăt chỗ</p>
                            <p className="mp1">Vé của bạn sẽ được gửi về địa chỉ email dưới đây trong vòng ít giờ tới</p>
                            <p className="mp2">{orderDetail.mail}</p>
                        </div>

                        <div className="col-12"
                        >
                            <div
                                className="detailTicketHeaderBox row">
                                <div className="leftHeader col-4">
                                    <span >Chi tiết đơn hàng</span>
                                </div>
                                <div className="col-4">

                                </div>
                                <div
                                    style={{ textAlign: "right" }}
                                    className="rightHeader col-4">
                                    <Link to="/aboutUs/FAQ">
                                        <span className="noDecoration" style={{ color: "#FF7062" }}><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95L13.9381 5ZM13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94L13.9381 1ZM20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> &nbsp;Hỗ trợ</span>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="detailTicketBox row">
                                <div
                                    className="detailTicketBox2 col-12">
                                    <h3>{orderDetail.place.name}</h3>
                                    <div className="row no-gutters">
                                        <div
                                            className="col-3">
                                            <img className="detailImg" src={orderDetail.place.imageLink} alt="FAIL TO LOAD" />
                                        </div>
                                        <div
                                            style={{ marginLeft: "20px" }}
                                            className="col-7">

                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Loại vé: </span></div>
                                                <div className="col"><span className="typeDetail2">{orderDetail.ticketTypeName}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Thời gian: </span></div>
                                                <div className="col"> <span className="typeDetail2">{this.convertDateToLocalVN(orderDetail.redemptionDate)}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Số lượng: </span></div>
                                                <div className="col">{this.showQtyxType(orderDetail.orderItems)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        if (orderStatus === "UNPAID") {
            return (
                <div style={{ padding: "20px" }}>
                    <div id="inline">
                        <div className="bulletListCustome"></div>
                        <div className="content">Mã đơn hàng: #{orderDetail.orderCode} </div>
                        <div className="content2"><p>Số tiền thanh toán:<i>{this.convertCurrecyToVnd(orderDetail.totalPayment)}</i></p></div>
                    </div>
                    <p className="orderTime">Thanh toán: {this.convertDateToLocalVN(orderDetail.purchaseDay)}</p>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-4" >

                        </div>
                        <div className="col-4" >
                            <svg className="svgLG" width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="55" fill="#FF7062" />
                                <path d="M55 87C72.6731 87 87 72.6731 87 55C87 37.3269 72.6731 23 55 23C37.3269 23 23 37.3269 23 55C23 72.6731 37.3269 87 55 87Z" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M55 36V54.75L68 61" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                        <div className="col-4" >

                        </div>
                        <div
                            style={{ textAlign: "center" }}
                            className="col-12">
                            <p className="mp3"> Chờ thanh toán</p>
                            <p className="mp1">Bạn cần thanh toán trong vòng 2 giờ kể từ khi hoàn thành thông tin đơn hàng</p>
                            <br></br>
                            <Link
                                onClick={this.createTokenOrder}
                                className="btnRequestPayment"
                                to={{
                                    pathname: "/payment",
                                    state: {
                                        ticketTypeID: orderDetail.ticketTypeId,
                                        ticketName: orderDetail.ticketTypeName,
                                        totalPayment: orderDetail.totalPayment,
                                        redemptionDate: date,
                                        orderStatus: orderDetail.status,
                                        orderId: orderDetail.id,
                                        placeId: orderDetail.placeId,
                                        imageLink: orderDetail.place.imageLink
                                    }
                                }} >
                                Thanh toán ngay
                            </Link>
                        </div>

                        <div className="col-12"
                        >
                            <div
                                className="detailTicketHeaderBox row">
                                <div className="leftHeader col-4">
                                    <span >Chi tiết đơn hàng</span>
                                </div>
                                <div className="col-4">

                                </div>
                                <div
                                    style={{ textAlign: "right" }}
                                    className="rightHeader col-4">
                                    <Link to="/aboutUs/FAQ">
                                        <span className="noDecoration" style={{ color: "#FF7062" }}><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95L13.9381 5ZM13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94L13.9381 1ZM20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> &nbsp;Hỗ trợ</span>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="detailTicketBox row">
                                <div
                                    className="detailTicketBox2 col-12">
                                    <h3>{orderDetail.place.name}</h3>
                                    <div className="row no-gutters">
                                        <div
                                            className="col-3">
                                            <img className="detailImg" src={orderDetail.place.imageLink} alt="FAIL TO LOAD" />
                                        </div>
                                        <div
                                            style={{ marginLeft: "20px" }}
                                            className="col-7">

                                            <div className="row ">
                                                <div className="col-4"><span className="typeDetail">Loại vé: </span></div>
                                                <div className="col"><span className="typeDetail2">{orderDetail.ticketTypeName}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Thời gian: </span></div>
                                                <div className="col"> <span className="typeDetail2">{this.convertDateToLocalVN(orderDetail.redemptionDate)}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Số lượng: </span></div>
                                                <div className="col">{this.showQtyxType(orderDetail.orderItems)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        if (orderStatus === "SENT") {

            return (
                <div style={{ padding: "20px" }}>
                    <div id="inline">
                        <div className="bulletListCustome"></div>
                        <div className="content">Mã đơn hàng: #{orderDetail.orderCode} </div>
                        <div className="content2"><p>Số tiền thanh toán:<i>{this.convertCurrecyToVnd(orderDetail.totalPayment)}</i></p></div>
                    </div>
                    <p className="orderTime">Thanh toán: {this.convertDateToLocalVN(orderDetail.purchaseDay)}</p>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-4" >

                        </div>
                        <div className="col-4" >
                            <svg className="svgLG" width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="55" fill="#19CF78" />
                                <path d="M90.1965 34.375L44.2984 80.2732L23.4355 59.4104" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="col-4" >

                        </div>
                        <div
                            style={{ textAlign: "center" }}
                            className="col-12">
                            <p className="mp3">Đặt chỗ thành công</p>
                            <span className="mp1">Vé đã được gửi về email </span><span className="mailSENT">{orderDetail.mail}</span>
                            <p className="mp4">Chưa nhận được vé?&nbsp;<button className="reSentBtn">Gửi lại</button></p>
                        </div>

                        <div className="col-12"
                        >
                            <div
                                className="detailTicketHeaderBox row">
                                <div className="leftHeader col-4">
                                    <span >Chi tiết đơn hàng</span>
                                </div>
                                <div className="col-4">

                                </div>
                                <div
                                    style={{ textAlign: "right" }}
                                    className="rightHeader col-4">
                                    <Link to="/aboutUs/FAQ">
                                        <span className="noDecoration" style={{ color: "#FF7062" }}><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95L13.9381 5ZM13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94L13.9381 1ZM20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> &nbsp;Hỗ trợ</span>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="detailTicketBox row">
                                <div
                                    className="detailTicketBox2 col-12">
                                    <h3>{orderDetail.place.name}</h3>
                                    <div className="row no-gutters">
                                        <div
                                            className="col-3">
                                            <img className="detailImg" src={orderDetail.place.imageLink} alt="FAIL TO LOAD" />
                                        </div>
                                        <div
                                            style={{ marginLeft: "20px" }}
                                            className="col-7">

                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Loại vé: </span></div>
                                                <div className="col"><span className="typeDetail2">{orderDetail.ticketTypeName}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Thời gian: </span></div>
                                                <div className="col"> <span className="typeDetail2">{this.convertDateToLocalVN(orderDetail.redemptionDate)}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4"><span className="typeDetail">Số lượng: </span></div>
                                                <div className="col">{this.showQtyxType(orderDetail.orderItems)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )

        }

        if (orderStatus === "EXPIRED") {

            return (
                <div style={{ padding: "20px" }}>
                    <div id="inline">
                        <div className="bulletListCustome"></div>
                        <div className="content">Mã đơn hàng: #{orderDetail.orderCode} </div>
                        <div className="content2"><p>Số tiền thanh toán:<i>{this.convertCurrecyToVnd(orderDetail.totalPayment)}</i></p></div>
                    </div>
                    <p className="orderTime">Thanh toán: {this.convertDateToLocalVN(orderDetail.purchaseDay)}</p>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-4" >

                        </div>
                        <div className="col-4" >
                            <svg className="svgLG" style={{ visibility: orderDetail.status === "EXPIRED" ? "visible" : "hidden" }} width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="55" fill="#E3E3E3" />
                                <path d="M54.8145 85.6289C71.8328 85.6289 85.6289 71.8328 85.6289 54.8145C85.6289 37.7961 71.8328 24 54.8145 24C37.7961 24 24 37.7961 24 54.8145C24 71.8328 37.7961 85.6289 54.8145 85.6289Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M42.4883 64.0586H67.1398" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M45.5703 45.5703H45.6018" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M64.0586 45.5703H64.0901" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="col-4" >

                        </div>
                        <div
                            style={{ textAlign: "center" }}
                            className="col-12">
                            <p className="mp3">Vé đã hết hạn</p>
                            <span className="mp1">Vé của bạn đã hết hạn, hoặc quá thời gian thanh toán </span>
                            {/* <span className="mailSENT">{orderDetail.mail}</span> */}
                            {/* <p className="mp4">Chưa nhận được vé?&nbsp;<button className="reSentBtn">Gửi lại</button></p> */}
                        </div>

                        <div className="col-12"
                        >
                            <div
                                className="detailTicketHeaderBox row">
                                <div className="leftHeader col-4">
                                    <span >Chi tiết đơn hàng</span>
                                </div>
                                <div className="col-4">

                                </div>
                                <div
                                    style={{ textAlign: "right" }}
                                    className="rightHeader col-4">
                                    <Link to="/aboutUs/FAQ">
                                        <span className="noDecoration" style={{ color: "#FF7062" }}><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95L13.9381 5ZM13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94L13.9381 1ZM20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> &nbsp;Hỗ trợ</span>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="detailTicketBox row">
                                <div
                                    className="detailTicketBox2 col-12">
                                    <h3>{orderDetail.place.name}</h3>
                                    <div className="row no-gutters">
                                        <div
                                            className="col-3">
                                            <img className="detailImg" src={orderDetail.place.imageLink} alt="FAIL TO LOAD" />
                                        </div>
                                        <div
                                            style={{ marginLeft: "10px" }}
                                            className="col-7">
                                            <div className="row">
                                                <div className="col-3"><span className="typeDetail">Loại vé: </span></div>
                                                <div className="col"><span className="typeDetail2">{orderDetail.ticketTypeName}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3"><span className="typeDetail">Thời gian: </span></div>
                                                <div className="col"> <span className="typeDetail2">{this.convertDateToLocalVN(orderDetail.redemptionDate)}</span></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3"><span className="typeDetail">Số lượng: </span></div>
                                                <div className="col">{this.showQtyxType(orderDetail.orderItems)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

    }

    render() {
        const { orderDetail } = this.state;
        // console.log(orderDetail);
        // console.log(orderDetail.redemptionDate);
        return (
            <div
                className="borderBox2 col-12">
                {this.showOrderByStatus(orderDetail)}
            </div>

        );
    }

}

// export default UserOrderDetail;
const mapStateToProps = state => {
    return {
        visitorType: state.Ticket,
        loggedUser: state.User,

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

// export default MyCounter;
export default connect(mapStateToProps, mapDispatchToProps)(UserOrderDetail);