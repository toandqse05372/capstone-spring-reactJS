import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Banner from '../../components/HomepageComponents/HeaderBanner/Banner';
import './PaymentSucess.css';
import Footer2 from '../../components/Footer/Footer2/Footer2';
import Menu from '../Menu/Menu';
import { ProgressBar, Step } from "react-step-progress-bar";
import testImg from '../../img/Detailpic.png'
import { Link } from 'react-router-dom';
// import UserOrderDetail from '../UserProfileComponents/UserOrderDetail/UserOrderDetail';
import NotLogin from '../../pages/NotLogin/NotLogin';
import { removeVisitorType } from '../../actions/index';

//Home page
class PaymentSucess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myPercen: 100,
        }
    }
    componentDidMount=()=>{
        window.scrollTo(0, 0)
    }
    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    showVisitorTypeNameChoosed = (type) => {
        const { visitorType } = this.props;
        var result = null;
        var VisitorTypeArr = visitorType
        if (VisitorTypeArr.length > 0) {
            result = VisitorTypeArr.map((item, index) => {
                if (type === 1) {
                    return (
                        <p key={index} >{item.visitorTypeName}: {item.quantity}</p>
                    )
                } else if (type === 2) {
                    return (
                        <span key={index} className="typeDetail2">{item.quantity}x {item.visitorTypeName}<br></br></span>
                    )
                } else {
                    return (
                        null
                    )
                }
            });
        }
        return result;
    }
    formatter = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",

    });
    convertDateToLocalVN = (date) => {
        return this.formatter.format(Date.parse(date));
    }

    render() {
        const { location, loggedUser } = this.props;
        if (location.state === undefined || loggedUser.id === undefined) {
            return (
                <NotLogin to="/" />
            )
        } else {
            var dateType = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            };
            var prnDt = '';
            var ticketName = '';
            var totalPayment = '';
            const userEmail = loggedUser.mail;
            const status = location.state.orderDetail.status;
            var orderPicture = "";
            if (status === "UNPAID") {
                console.log(location.state.orderDetail);
                // console.log(this.convertDateToLocalVN(location.state.orderDetail.redemptionDate))
                orderPicture = location.state.orderDetail.place.imageLink;
                prnDt = this.convertDateToLocalVN(location.state.orderDetail.redemptionDate);
                ticketName = location.state.orderDetail.ticketTypeName;
                totalPayment = location.state.orderDetail.totalPayment;
            } else {
                console.log(location.state.orderDetail);
                if (location.state.orderDetail.state.place === undefined) {
                    orderPicture = location.state.orderDetail.state.imageLink;
                } else {
                    orderPicture = location.state.orderDetail.state.place.placeImageLink[0];
                }
                ticketName = location.state.orderDetail.state.ticketName;
                totalPayment = location.state.orderDetail.state.totalPayment;
                prnDt = location.state.orderDetail.state.redemptionDate.toLocaleDateString('vi', dateType);
            }
            return (
                <div
                    style={{ backgroundColor: "#F2F2F2", fontFamily: "Inter" }}
                >
                    <Menu />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div
                        style={{
                            fontFamily: "Inter"
                        }}
                        className="container">
                        <div
                            className="row">
                            <div
                                style={{
                                    height: "auto"
                                }}
                                className="col-8 no-gutters">
                                {/* process bar */}
                                <div className="row no-gutter">
                                    <div
                                        style={{
                                            padding: "0rem 7rem 0rem 7rem"
                                        }}
                                        className="progressbar col-12">
                                        <ProgressBar
                                            percent={this.state.myPercen}
                                            filledBackground="linear-gradient(to right, #fefb72, #FF7062)"
                                        >
                                            <Step transition="scale">
                                                {({ accomplished }) => (
                                                    <div onClick={this.scrollToStep1}>
                                                        <div

                                                            style={{
                                                                filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                                                border: "1px solid",
                                                                borderRadius: "50%",
                                                                width: "30px",
                                                                height: "30px",
                                                                background: "#FF7062",
                                                                textAlign: "center",
                                                                color: "white",
                                                                display: "table"
                                                            }}
                                                        >
                                                            <p style={{
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                display: "table-cell"
                                                            }}>1</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Step>
                                            <Step transition="scale">
                                                {({ accomplished }) => (
                                                    <div onClick={this.scrollToStep2}>
                                                        <div

                                                            style={{
                                                                filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                                                border: "1px solid",
                                                                borderRadius: "50%",
                                                                width: "30px",
                                                                height: "30px",
                                                                background: "#FF7062",
                                                                textAlign: "center",
                                                                color: "white",
                                                                display: "table"
                                                            }}
                                                        >
                                                            <p style={{
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                display: "table-cell"
                                                            }}>2</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Step>
                                            <Step transition="scale">
                                                {({ accomplished }) => (
                                                    <div>
                                                        <div

                                                            style={{
                                                                filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                                                border: "1px solid",
                                                                borderRadius: "50%",
                                                                width: "30px",
                                                                height: "30px",
                                                                background: "#FF7062",
                                                                textAlign: "center",
                                                                color: "white",
                                                                display: "table"
                                                            }}
                                                        >
                                                            <p style={{
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                display: "table-cell"
                                                            }}>3</p>
                                                        </div>

                                                    </div>
                                                )}
                                            </Step>
                                        </ProgressBar>

                                    </div>
                                    <br></br>
                                    <div className="textProgressbar col"
                                        style={{ color: this.state.myPercen === 0 ? "#FF7062" : "#FF7062", paddingLeft: "5rem", textAlign: "left" }} >
                                        <span>?????t ch???</span>
                                    </div>
                                    <div className="textProgressbar col"
                                        style={{ color: this.state.myPercen === 50 ? "#FF7062" : "#FF7062", textAlign: "center" }} >
                                        <span>Thanh to??n</span>
                                    </div>
                                    <div className="textProgressbar col"
                                        style={{ color: this.state.myPercen === 100 ? "#FF7062" : "#FF7062", paddingRight: "4.5rem", textAlign: "right" }}>
                                        <span>??ang x??? l??</span>
                                    </div>
                                </div>

                                {/* Step 1 */}
                                {/* <form> */}
                                <div
                                    className="borderBox col-12">
                                    <div className="col-12">
                                        <h1 className="step1h">B?????c 3: X??? l?? ?????t ch???</h1>
                                    </div>
                                    <hr style={{ border: "1.2px solid #E3E3E3", borderRadius: "2px" }} />
                                    <div className="row">
                                        <div className="col-12 labelPaymentSucess">
                                            <span>{status === "UNPAID" ? "Ch??? thanh to??n" : "??ang x??? l?? ?????t ch???"}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4" >
                                            <div className="circleCoffee">
                                            </div>
                                        </div>
                                        <div className="col-4" >
                                            {status === "UNPAID"
                                                ?
                                                <svg className="svgLG" width="150" height="150" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="55" cy="55" r="55" fill="#FF7062" />
                                                    <path d="M55 87C72.6731 87 87 72.6731 87 55C87 37.3269 72.6731 23 55 23C37.3269 23 23 37.3269 23 55C23 72.6731 37.3269 87 55 87Z" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M55 36V54.75L68 61" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                :
                                                <svg className="svgLG" width="150" height="150" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="55" cy="55" r="55" fill="#197ACF" />
                                                    <path d="M75.9336 45.4092H78.9919C82.2364 45.4092 85.348 46.6981 87.6423 48.9923C89.9365 51.2865 91.2253 54.3981 91.2253 57.6426C91.2253 60.8871 89.9365 63.9987 87.6423 66.2929C85.348 68.5871 82.2364 69.876 78.9919 69.876H75.9336" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M27 45.4092H75.9336V72.9343C75.9336 76.1788 74.6447 79.2904 72.3505 81.5846C70.0563 83.8788 66.9447 85.1677 63.7002 85.1677H39.2334C35.9889 85.1677 32.8773 83.8788 30.5831 81.5846C28.2889 79.2904 27 76.1788 27 72.9343V45.4092Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M39.2344 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M51.4668 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M63.6992 24V33.175" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                        </div>
                                        <div className="col-4" >
                                            <div className="circleCoffee">
                                            </div>
                                        </div>
                                        <div
                                            style={{ textAlign: "center" }}
                                            className="col-12">
                                            <p className="mrt-30 mp1">
                                                {status === "UNPAID"
                                                    ? "B???n c???n thanh to??n trong v??ng 2 gi??? k??? t??? khi ho??n th??nh th??ng tin ????n h??ng"
                                                    : "V?? c???a b???n s??? ???????c g???i v??? ?????a ch??? email d?????i ????y trong v??ng ??t gi??? t???i"}
                                            </p>
                                            <p className="mp2">{status === "UNPAID" ? "" : userEmail}</p>
                                        </div>
                                        <div className="col-12"
                                        >
                                            <div
                                                className="detailTicketHeaderBox row">
                                                <div className="leftHeader col-4">
                                                    <span >Chi ti???t ????n h??ng</span>
                                                </div>
                                                <div className="col-4">
                                                </div>
                                                <div
                                                    style={{ textAlign: "right" }}
                                                    className="rightHeader col-4">
                                                    <Link to="/aboutUs/FAQ">
                                                        <span className="noDecoration" style={{ color: "#FF7062" }}><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95L13.9381 5ZM13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94L13.9381 1ZM20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg> &nbsp;H??? tr???</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div
                                                className="detailTicketBox3 row">
                                                <div
                                                    className="detailTicketBox2 col-12">
                                                    <h3>{ticketName}</h3>
                                                    <div className="row no-gutters">
                                                        <div
                                                            className="col-3">
                                                            {/* <img className="detailImg" src={testImg} alt="FAIL TO LOAD" /> */}
                                                            <img className="detailImg" src={orderPicture} alt="FAIL TO LOAD" />

                                                        </div>
                                                        <div
                                                            style={{ marginLeft: "20px" }}
                                                            className="col-7">

                                                            <div className="row">
                                                                <div className="col-4"><span className="typeDetail">Thanh to??n: </span></div>
                                                                <div className="col"><span className="typeDetail2">{this.convertCurrecyToVnd(totalPayment)}</span></div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-4"><span className="typeDetail">Th???i gian: </span></div>
                                                                <div className="col"> <span className="typeDetail2">{prnDt}</span></div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-4"><span className="typeDetail">S??? l?????ng: </span></div>
                                                                <div className="col">{this.showVisitorTypeNameChoosed(2)}</div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div style={{ padding: "0rem 8rem 0rem 7rem" }} className="row">
                                        <div className="boxSusscess col-5">
                                            <Link to="/userProfile/myOrders" type="button" className="toMyOrder"> ?????t ch??? c???a t??i </Link>
                                        </div>
                                        <div className="boxSusscessBackHome col-5">
                                            <Link to="/" type="button" className="toHome"> Trang Ch??? </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* </form> */}
                            </div>

                            {/* Right part */}
                            <div className="col">
                                <div
                                    className="rightPartPayment">
                                    <h1>{ticketName}</h1>
                                    <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />
                                    <div className="row no-gutters">
                                        <div style={{ marginRight: "-15px" }} className="col">
                                            <p>Ng??y tham quan: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <p>{prnDt}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <p>??p d???ng cho: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            {this.showVisitorTypeNameChoosed(1)}
                                        </div>
                                    </div>

                                    <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />
                                    <div className="row no-gutters">
                                        <div className="col-5">
                                            <p>T???ng: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <p> {this.convertCurrecyToVnd(totalPayment)}</p>
                                        </div>
                                    </div>
                                    {/* <div className="row no-gutters">
                                        <div className="col-5">
                                            <p>Gi???m gi??: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <p>0 ??</p>
                                        </div>
                                    </div> */}
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <p>S??? ti???n thanh to??n: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <span className="totalPaymentRightPart">
                                                {this.convertCurrecyToVnd(totalPayment)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer2 />
                </div >

            );
        }
    }

}

// export default PaymentSucess;
const mapStateToProps = state => {
    return {
        loggedUser: state.User,
        visitorType: state.Ticket

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeVisitorType: () => {
            dispatch(removeVisitorType())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSucess);