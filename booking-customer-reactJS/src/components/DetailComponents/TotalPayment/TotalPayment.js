import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TotalPayment.css';
// import { Link, Redirect } from 'react-router-dom';
// import { vi } from 'date-fns/locale';
import { removeVisitorType } from '../../../actions/index';
import callApi from '../../../config/utils/apiCaller';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showLoader, hideLoader, removeZeroQuantity } from '../../../actions';
import axios from 'axios';
import * as Config from '../../../constants/ConfigAPI';
import Shake from 'react-reveal/Shake';

class TotalPayment extends Component {
    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            discount: 0,
            checkLoginFlag: true,
            shake: false
        }
    }

    myTotal = (visitorType) => {
        var total = 0;
        if (visitorType.length >= 0) {
            for (let index = 0; index < visitorType.length; index++) {
                const qty = visitorType[index].quantity;
                const pri = visitorType[index].myPrice;
                total = total + (qty * pri);
            }
        }
        return total;
    }

    reset = () => {
        localStorage.removeItem("visitorTypeList");
        this.props.removeVisitorType();
    }

    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    checkLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // const { history } = this.props;
        const { totalPayment, ticketTypeID, ticketName, redemptionDate, place, visitorTypeFromRedux } = this.props;
        callApi('login/checkToken', 'post', null)
            .then(res => {
                if (totalPayment === 0) {
                    this.setState({
                        shake: true
                    })
                    toast.error('Vui lòng chọn ít nhất một loại vé!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (redemptionDate === null) {
                    this.setState({
                        shake: true
                    })
                    toast.error('Vui lòng chọn ngày sử dụng vé!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    var idVisitorTypeList = ""
                    for (let index = 0; index < visitorTypeFromRedux.length - 1; index++) {
                        const element = visitorTypeFromRedux[index].visitorTypeId;
                        idVisitorTypeList += element + ","
                    }
                    idVisitorTypeList += visitorTypeFromRedux[visitorTypeFromRedux.length - 1].visitorTypeId
                    this.callVisitorTypeRemainApi(idVisitorTypeList, redemptionDate, ticketTypeID, ticketName, totalPayment, place)
                    // this.props.history.push({
                    //     pathname: '/payment',
                    //     state: {
                    //         ticketTypeID,
                    //         ticketName,
                    //         totalPayment,
                    //         redemptionDate,
                    //         place
                    //     }
                    // })
                }
            })
            .catch(error => {
                this.setState({
                     shake: true
                 })
                     toast.error('Vui lòng đăng nhập trước khi đặt vé!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
              });
            // .catch(function (error) {
            //     // this.setState({
            //     //     shake: true
            //     // })
            //     toast.error('Vui lòng đăng nhập trước khi đặt vé!', {
            //         position: "bottom-right",
            //         autoClose: 3000,
            //         hideProgressBar: true,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            // });
            this.setState({
                shake: false
            })
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
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
    callVisitorTypeRemainApi = async (idVisitorTypeList, redemptionDate, ticketTypeID, ticketName, totalPayment, place) => {
        const { showLoader, hideLoader, visitorTypeFromRedux } = this.props;
        let data = new FormData();
        data.append('idList', idVisitorTypeList);
        data.append('date', this.formatDate(redemptionDate));
        showLoader()
        // await callApi('visitorType/remaining', 'POST', data)
        //     .then(res => {
        //         // console.log(res.data);
        //         const visitorTypeFromDb = res.data;
        //         // console.log(visitorTypeFromRedux)
        //         var checkRemainAll = true;
        //         for (let index = 0; index < visitorTypeFromDb.length; index++) {

        //             const remainDb = visitorTypeFromDb[index].remaining;
        //             const idDb = visitorTypeFromDb[index].id;

        //             for (let index = 0; index < visitorTypeFromRedux.length; index++) {
        //                 const remainRedux = visitorTypeFromRedux[index].quantity;
        //                 const idRedux = visitorTypeFromRedux[index].visitorTypeId;
        //                 const nameRedux = visitorTypeFromRedux[index].visitorTypeName;

        //                 if (idDb === idRedux) {

        //                     if (remainDb >= remainRedux) {
        //                     } else if (remainDb < remainRedux) {
        //                         checkRemainAll = false;
        //                         toast.error(`Số lượng vé còn lại của loại vé ${nameRedux} không đủ!`, {
        //                             position: "bottom-right",
        //                             autoClose: 3000,
        //                             hideProgressBar: true,
        //                             closeOnClick: true,
        //                             pauseOnHover: true,
        //                             draggable: true,
        //                             progress: undefined,
        //                         });
        //                     }
        //                 }

        //             }

        //         }
        //         if (checkRemainAll === true) {
        //             // this.props.removeZeroQuantity();
        //             const paymentToken = this.storeTokenPaymentInLocal(5);
        //             localStorage.setItem('tokenPayment', JSON.stringify(paymentToken));
        //             this.props.history.push({
        //                 pathname: '/payment',
        //                 state: {
        //                     ticketTypeID,
        //                     ticketName,
        //                     totalPayment,
        //                     redemptionDate,
        //                     place
        //                 }
        //             })
        //         }
        //         hideLoader();
        //     }).catch(function (error) {
        //         if (error.response) {
        //             hideLoader();
        //         }
        //     });

        await axios.get(`${Config.API_URL}/visitorType/remaining`, {
            params: {
                idList: idVisitorTypeList,
                date: this.formatDate(redemptionDate)
            }
        }).then(res => {
            // console.log(res.data);
            const visitorTypeFromDb = res.data;
            // console.log(visitorTypeFromRedux)
            var checkRemainAll = true;
            for (let index = 0; index < visitorTypeFromDb.length; index++) {

                const remainDb = visitorTypeFromDb[index].remaining;
                const idDb = visitorTypeFromDb[index].id;

                for (let index = 0; index < visitorTypeFromRedux.length; index++) {
                    const remainRedux = visitorTypeFromRedux[index].quantity;
                    const idRedux = visitorTypeFromRedux[index].visitorTypeId;
                    const nameRedux = visitorTypeFromRedux[index].visitorTypeName;

                    if (idDb === idRedux) {

                        if (remainDb >= remainRedux) {
                        } else if (remainDb < remainRedux) {
                            checkRemainAll = false;
                            this.setState({
                                shake: true
                            })
                            toast.error(`Số lượng vé có thể đặt của loại vé ${nameRedux} không đủ!`, {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }

                }

            }
            if (checkRemainAll === true) {
                // this.props.removeZeroQuantity();
                const paymentToken = this.storeTokenPaymentInLocal(5);
                localStorage.setItem('tokenPayment', JSON.stringify(paymentToken));
                this.props.history.push({
                    pathname: '/payment',
                    state: {
                        ticketTypeID,
                        ticketName,
                        totalPayment,
                        redemptionDate,
                        place
                    }
                })
            }
            hideLoader();
        }).catch(error => {
            hideLoader()
        });
    }

    render() {
        // const { visitorType, totalPayment, ticketTypeID, ticketName, redemptionDate, place } = this.props;
        // console.log(ticketTypeID);
        const { totalPayment } = this.props;

        // console.log(ticketName);
        // console.log(redemptionDate);
        // console.log(totalPayment);
        // console.log(place)
        return (
            <div>
                {/* <div>
        <button onClick={this.notify}>Notify !</button> */}
                {/* <ToastContainer /> */}
                {/* </div> */}
                <div className="row-12 no-gutters">
                    {/* <div className="row ">
                        <div className="col">
                            <p className="titlePayment">Tổng</p>
                        </div>
                        <div className="col">
                            <p
                                className="pPayment"
                            > {this.convertCurrecyToVnd(totalPayment)}</p>
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col">
                            <p className="titlePayment">Giảm giá</p>
                        </div>
                        <div className="col">
                            <p
                                className="pPayment"
                            > 0 đ</p>
                        </div>
                    </div> */}
                    <div className="row ">
                        <div className="col">
                            <p className="titlePayment">Số tiền thanh toán</p>
                        </div>
                        <div className="col">
                            <p className="ppPayment">
                                {this.convertCurrecyToVnd(totalPayment)}
                            </p>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row-12 no-gutters">
                    <div className="row no-gutters">
                        {/* <div
                            onClick={this.reset}
                            style={{ display: "table" }}
                            className="col-5">
                            <p className="deleteAllTitle"
                            >Xóa tất cả</p>
                        </div> */}
                        <div className="col"
                            style={{ padding: "0px" }}
                        >
                            {/* <Link to={{
                                pathname: "/payment",
                                state: { ticketTypeID, ticketName, totalPayment, redemptionDate }
                            }} >

                                <button className="bookingBtn">
                                    Đặt vé ngay
                            </button>
                            </Link> */}
                            <form onSubmit={this.checkLogin}>
                                <span style={{ visibility: this.state.checkLoginFlag === true ? "hidden" : "visible" }} >Vui Lòng đăng nhập trước khi đặt vé</span>
                                <Shake duration={1000} when={this.state.shake}>
                                    <button
                                        // onClick={this.checkLogin}
                                        type="submit"
                                        className="bookingBtn">
                                        Đặt vé ngay
                                    </button>
                                </Shake>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        visitorTypeFromRedux: state.Ticket
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        remove: () => {
            dispatch(removeVisitorType())
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        },
        removeZeroQuantity: () => {
            dispatch(removeZeroQuantity())
        }
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(TotalPayment);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TotalPayment));

// export default TotalPayment;
