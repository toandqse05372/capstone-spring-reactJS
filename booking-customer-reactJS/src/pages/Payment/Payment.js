import React, { Component } from 'react';
import './payment.css';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Menu from '../../components/Menu/Menu';
import Footer2 from '../../components/Footer/Footer2/Footer2';
import { Accordion, Card } from 'react-bootstrap'
import CardDemo from './cartDemo/CardDemo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import callApi from '../../config/utils/apiCaller';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showLoader, hideLoader, removeVisitorType, getUserLogin } from '../../actions/index';
import * as regex from '../../constants/Regex';
import { Collapse } from 'react-bootstrap';
import NotLogin from '../NotLogin/NotLogin';
import { Link } from 'react-router-dom';


//Payment
class Payment extends Component {

    constructor(props) {
        super(props);
        this.myRef1 = React.createRef()
        this.myRef2 = React.createRef()
        this.state = {
            myPercen: 0,
            activeRadius1: false,
            activeRadius2: true,
            checkLoginPar: false,
            checkChangeFirstName: false,
            checkChangeLastname: false,
            checkChangePhoneNumb: false,
            open: true,
            lastName: {
                value: '',
                isInputValid: true,
                errorMessage: ''
            },
            phoneNumber: {
                value: '',
                isInputValid: true,
                errorMessage: ''
            },
            myfirstName: {
                value: '',
                isInputValid: true,
                errorMessage: ''
            },
        }
    }
    scrollToStep1 = () => window.scrollTo({ top: this.myRef1.current.offsetTop, behavior: 'smooth' });
    // scrollToStep2 = () => window.scrollTo({ top: this.myRef2.current.offsetTop, behavior: 'smooth' });
    scrollToStep2 = () => {
        this.setState({
            myPercen: 50,
            open: false,
            open2: true
        }, () => {
            window.scrollTo({ top: this.myRef2.current.offsetTop, behavior: 'smooth' })
        })
    }
    handleInput = event => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] }; /* dummy object */
        newState.value = value;
        if (name === "myfirstName") {
            this.setState({
                [name]: newState,
                checkChangeFirstName: true,
            });
        }
        if (name === "lastName") {
            this.setState({
                [name]: newState,
                checkChangeLastname: true
            });
        }
        if (name === "phoneNumber") {
            this.setState({
                [name]: newState,
                checkChangePhoneNumb: true,
            });
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.checkLogin();
    }

    validateInput = (type, checkingText) => {
        var regexp = '';
        var checkingResult = '';
        switch (type) {
            case "email":
                // regexp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/;
                regexp = regex.EMAIL;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Email c?? d???ng abc@xyz.ghi(.xnh)'
                    };
                }
            case "myfirstName":
                regexp = regex.FIRST_NAME;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null || this.state.myfirstName.value === '') {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'kh??ng ch???a kho???ng tr???ng ??? ?????u v?? cu???i!'
                    };
                }
            case "lastName":
                // regexp = /^[^\s].+[^\s]$/;
                regexp = regex.LAST_NAME;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null || this.state.lastName.value === '') {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'kh??ng ch???a kho???ng tr???ng ??? ?????u v?? cu???i!'
                    };
                }
            case "dob":
                regexp = regex.DATE_OF_BIRTH;
                checkingResult = regexp.exec(checkingText.toString());
                if (checkingResult !== null || this.state.dob.value === '') {
                    // if (true) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Kh??ng ????ng ?????nh d???ng'
                    };
                }
            case "phoneNumber":
                // regexp = /^\d{10,11}$/;
                regexp = regex.PHONE_NUMBER;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null || this.state.phoneNumber.value === '') {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'S??? ??i???n tho???i ch???a 10-11 s???'
                    };
                }
            default:
                return null;
        }
    }

    handleInputValidation = event => {
        const { check } = this.state;
        const { name } = event.target;
        const { isInputValid, errorMessage } = this.validateInput(name, this.state[name].value);
        const newState = { ...this.state[name] }; /* dummy object */
        newState.isInputValid = isInputValid;
        newState.errorMessage = errorMessage;
        if (name === "dob" && check === false) {
            this.setState({
                check: true
            })
        } else if (name === "dob" && check === true) {
            this.setState({
                check: false
            })
        }
        this.setState({
            [name]: newState,
        })
    }

    showVisitorTypeNameChoosed = (VisitorTypeArr) => {
        var result = null;
        if (VisitorTypeArr.length > 0) {
            result = VisitorTypeArr.map((item, index) => {
                return (
                    <p key={index} >{item.visitorTypeName}: {item.quantity}</p>
                )
            });
        }
        return result;
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

    updateUserDetail = () => {
        const { myfirstName, lastName, phoneNumber } = this.state;
        const { loggedUser } = this.props;
        const id = loggedUser.id;
        if (myfirstName.value === '' && lastName.value === '' &&
            phoneNumber.value === '') {
            this.scrollToStep2();
        }
        else
            if (lastName.isInputValid === false) {
                toast.error('H??? kh??ng ch???a k?? t??? ?????c bi???t!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            } else if (myfirstName.isInputValid === false) {
                toast.error('T??n Kh??ng ch???a k?? t??? ?????c bi???t!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            } else if (phoneNumber.isInputValid === false) {
                toast.error('S??? ??i???n tho???i ch???a 10-11 s???!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else {
                this.callAPIChangeUserInfor(id);
            }
    }


    callAPIChangeUserInfor = async (id) => {
        const { dob, myfirstName, lastName, phoneNumber } = this.state;
        const { loggedUser, showLoader, hideLoader } = this.props;
        showLoader();
        await callApi(`userClient/${id}`, 'PUT',
            {
                firstName: myfirstName.value !== '' ? myfirstName.value : loggedUser.firstName,
                lastName: lastName.value !== '' ? lastName.value : loggedUser.lastName,
                dob: loggedUser.dob,
                phoneNumber: phoneNumber.value !== '' ? phoneNumber.value : loggedUser.phoneNumber,
            })
            .then(res => {
                this.props.fetchUserDetail(res.data);
                hideLoader();
                toast.success('Thay ?????i th??ng tin th??nh c??ng!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.scrollToStep2();
            }).catch(function (error) {
                if (error.response) {
                    hideLoader();
                }
            });
    }

    purchaseLater = () => {
        const { location, visitorType, loggedUser } = this.props;
        if (this.state.myPercen === 0) {
            toast.error('B???n c???n x??c th???c th??ng tin li??n l???c!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                open: true,
                open2: false
            })
            window.scrollTo({ top: this.myRef1.current.offsetTop, behavior: 'smooth' })
        } else {
            var orderItems = [];
            var item = {
                visitorTypeId: null,
                visitorTypeName: null,
                quantity: null
            }
            for (let index = 0; index < visitorType.length; index++) {
                item = {
                    visitorTypeId: visitorType[index].visitorTypeId,
                    quantity: visitorType[index].quantity
                }
                orderItems.push(item)
            }
            this.callApiPurchaseLater(location.state.ticketTypeID, location.state.ticketName, loggedUser.id, loggedUser.firstName, loggedUser.lastName, loggedUser.mail, loggedUser.phoneNumber, location.state.totalPayment, location.state.redemptionDate, orderItems)
        }
    }

    callApiPurchaseLater = async (ticketTypeId, ticketTypeName, userId, firstName, lastName, mail, phoneNumber, totalPayment, redemptionDate, orderItems) => {
        const { showLoader, hideLoader, location } = this.props;
        if (this.state.checkLoginPar === false) {
            toast.error('B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            showLoader();
            await callApi('order', 'post', {
                ticketTypeId: ticketTypeId,
                ticketTypeName: ticketTypeName,
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                mail: mail,
                phoneNumber: phoneNumber,
                totalPayment: totalPayment,
                purchaseDay: new Date(),
                redemptionDate: redemptionDate,
                orderItems: orderItems,
                placeId: location.state.place.id
            })
                .then(res => {
                    console.log(res.data);
                    hideLoader();
                    localStorage.removeItem('tokenPayment');
                    this.props.history.push({
                        pathname: '/paymentSucess',
                        state: { orderDetail: res.data }
                    })
                   
                }).catch(function (error) {
                    if (error.response) {
                        hideLoader();
                    }
                });
        }
    }

    onActiveRadio1 = () => {
        this.setState({
            activeRadius1: !this.state.activeRadius1,
            activeRadius2: false,
        })

    }

    onActiveRadio2 = () => {
        this.setState({
            activeRadius2: !this.state.activeRadius2,
            activeRadius1: false,
            // open2: true
        })
    }

    checkLogin = async () => {
        await callApi('login/checkToken', 'post', null)
            .then(res => {
                this.setState({
                    checkLoginPar: true
                })
            }).catch(function (error) {
            });
    }


    render() {
        var tokenPayment = JSON.parse(localStorage.getItem('tokenPayment'));
        const { location, visitorType, loggedUser } = this.props;
        if (tokenPayment === null) {
            return (
                <Redirect to="/" />
            )
        }
        if (location.state === undefined || loggedUser.id === undefined) {
            return (
                <div>
                    <NotLogin />
                </div>
            )
        } else {
            var dateType = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            };
            var prnDt = location.state.redemptionDate.toLocaleDateString('vi', dateType);
            // x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            const totalPayment = location.state.totalPayment.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
            const myLocation = location;
            const ticketName = myLocation.state.ticketName;
            const { loggedUser } = this.props;
            return (
                <div
                    style={{ backgroundColor: "#F2F2F2" }}
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
                                                    <div
                                                    >
                                                        <div
                                                            // onClick={this.scrollToStep1, () => { this.setState({ myPercen: 0 }) }}
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
                                                            <p

                                                                style={{
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
                                                   
                                                    <div
                                                    >
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
                                        style={{ color: this.state.myPercen === 50 ? "#FF7062" : "#A5A5A5", textAlign: "center" }} >
                                        <span>Thanh to??n</span>
                                    </div>
                                    <div className="textProgressbar col"
                                        style={{ color: this.state.myPercen === 100 ? "#FF7062" : "#A5A5A5", paddingRight: "4.5rem", textAlign: "right" }}>
                                        <span>??ang x??? l??</span>
                                    </div>
                                </div>

                                {/* Step 1 */}
                                {/* <form> */}
                                <div
                                    className="borderBox col-12">
                                    <div
                                        aria-controls="example-collapse-text"
                                        aria-expanded={this.state.open}
                                        id="tries" className="col-12">
                                        <h1 style={{ color: this.state.open === true ? "#FF7062" : "#19CF78" }} className="step1h">B?????c 1:X??c nh???n th??ng tin kh??ch du l???ch</h1>
                                    </div>
                                    <hr style={{ border: "1.2px solid #E3E3E3", borderRadius: "2px" }} />
                                    <Collapse in={this.state.open}>
                                        <div id="example-collapse-text">
                                            <div ref={this.myRef1} className="col-12 alertStep1">
                                                <p>
                                                    Xin ?????m b???o th??ng tin ??i???n v??o l?? ch??nh x??c.
                                                    B???n s??? kh??ng th??? thay ?????i th??ng tin sau khi thanh to??n
                                        </p>
                                            </div>
                                            <div className="col-12">
                                                <div className="row no-gutters">
                                                    <div className="col-8">
                                                        <div id="inline">
                                                            <div className="bulletListCustome"></div>
                                                            <div className="content">Th??ng tin li??n l???c</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="UpdateDetail2" >
                                                            <Link className="UpdateDetail2" to="/userProfile/ediProfile">Ch???nh s???a</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <p className="attention">Ch??ng t??i s??? th??ng b??o m???i thay ?????i v??? ????n h??ng cho b???n</p>
                                            </div>
                                            
                                            <div className="mrt-30 col-12">
                                                <div className="row">
                                                    <div className="col">
                                                        <span className="labelHolder"> T??n </span><span className="turnRed">*</span>
                                                        <div className="customWrap-input100">
                                                            <input
                                                                className="input100"
                                                                type="text"
                                                                name="myfirstName"
                                                                onChange={this.handleInput}
                                                                onBlur={this.handleInputValidation}
                                                                value={this.state.checkChangeFirstName === false ? loggedUser.firstName : this.state.myfirstName.value}
                                                            // placeholder={loggedUser.firstName}
                                                            />
                                                        </div>
                                                        <label className="cmt">Nh?? tr??n CMND (kh??ng d???u)</label>
                                                    </div>
                                                    <div className="col">
                                                        <span className="labelHolder"> H??? </span><span className="turnRed">*</span>
                                                        <div className="customWrap-input100">
                                                            <input
                                                                className="input100"
                                                                type="text"
                                                                name="lastName"
                                                                onChange={this.handleInput}
                                                                onBlur={this.handleInputValidation}
                                                                // placeholder={loggedUser.lastName}
                                                                value={this.state.checkChangeLastname === false ? loggedUser.lastName : this.state.lastName.value}
                                                            />
                                                        </div>
                                                        <label className="cmt">Nh?? tr??n CMND (kh??ng d???u)</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mrt-30 col-12">
                                                <div className="row">

                                                    <div className="col">
                                                        <span className="labelHolder"> S??? ??i???n tho???i </span><span className="turnRed">*</span>
                                                        <div className="customWrap-input100">
                                                            <input
                                                                className="input100"
                                                                type="text"
                                                                name="phoneNumber"
                                                                onChange={this.handleInput}
                                                                onBlur={this.handleInputValidation}
                                                                // placeholder={loggedUser.phoneNumber}
                                                                value={this.state.checkChangePhoneNumb === false ? loggedUser.phoneNumber : this.state.phoneNumber.value}
                                                            />
                                                        </div>
                                                        <label className="cmt">S??? ??i???n tho???i s??? d???ng ????? x??c th???c giao d???ch</label>
                                                    </div>
                                                    <div className="col">
                                                        <label>Email</label><span className="turnRed"> *</span>
                                                        <input type="text" disabled value={loggedUser.mail} className="textDisable form-control"
                                                            placeholder="H???" />
                                                        <label className="cmt">(V?? c???a b???n s??? ???????c g???i v??? ?????a ch??? email tr??n,
                                                        xin vui l??ng ki???m tra k??? th??ng tin.)
                                            </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pdt-30 col-12">
                                                <div className="row">
                                                    <div className="col">
                                                    </div>
                                                    <div className="col">
                                                        {/* <button onClick={this.scrollToStep2} className="proceedPaymentBtn">Ti???n h??nh thanh to??n</button> */}
                                                        <button onClick={this.updateUserDetail} className="proceedPaymentBtn">Ti???n h??nh thanh to??n</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>

                                </div>
                                {/* </form> */}


                                {/* Step 2 */}
                                <form>
                                    <div
                                        style={{
                                            marginTop: "50px"
                                        }}
                                        className="borderBox col-12">
                                        <div
                                            // onClick={() => this.setState({ open: !this.state.open, open2: !this.state.open2 })}
                                            aria-controls="example-collapse-text2"
                                            aria-expanded={this.state.open2}
                                            className="col-12">
                                            <h1 style={{ color: this.state.open2 === true ? "#FF7062" : "#A5A5A5" }} className="step2h">B?????c 2: X??c nh???n ????? thanh to??n</h1>
                                        </div>
                                        <hr ref={this.myRef2} style={{ border: "1.2px solid #E3E3E3", borderRadius: "2px" }} />
                                        <Collapse in={this.state.open2}>
                                            <div id="example-collapse-text2">
                                                <div className="col-12 alertStep2">
                                                    <p>
                                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="#197ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="#197ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg> &nbsp;
                                        T???t c??? th??ng tin c???a th??? s??? ???????c m?? ho??, b???o m???t v?? b???o v???
                                            </p>
                                                </div>

                                                <Accordion className="pdt-30 pdb-30" defaultActiveKey="1">
                                                    <Card id="cardHeade">
                                                        <Accordion.Toggle onClick={this.onActiveRadio1} id="cardHeade2" as={Card.Header} eventKey="0">
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <p className={this.state.activeRadius1 === false ? "circleBtn2" : "circle"}></p>
                                                                </div>
                                                                <div className="poiterHover col">
                                                                    <span>Chuy???n kho???n qua ng??n h??ng</span>
                                                                </div>
                                                            </div>
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <div className="purchaseLaterBox">
                                                                    <h1>Vietcombank H???i s??? ch??nh</h1>
                                                                    <p>Ch??? t??i kho???n: Ph??ng Tr?? ?????c</p>
                                                                    <p>S??? t??i kho???n: 000000000000000000</p>
                                                                    <br></br>
                                                                    <h1>TPBank H?? ????ng</h1>
                                                                    <p>Ch??? t??i kho???n: Ph??ng Tr?? ?????c</p>
                                                                    <p>S??? t??i kho???n: 000000000000000000</p>
                                                                </div>
                                                                <br></br>
                                                                <div className="row">
                                                                    <div className="policyPayment col-7">
                                                                        <p>Khi nh???p v??o "Thanh to??n sau", b???n ???? ?????c v?? ?????ng ?? v???i
                                                                            <Link to="/aboutUs/termsConditions"><span className="pol"> ??i???u kho???n s??? d???ng </span></Link>v??
                                                                            <Link to="/aboutUs/policy"><span className="pol"> Ch??nh s??ch hu??? tr???</span></Link></p>
                                                                    </div>
                                                                    <div className="col">
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div
                                                                            style={{ visibility: !location.state.orderStatus ? "visible" : "hidden" }}
                                                                            className="purchaseLaterBtn"
                                                                            onClick={this.purchaseLater}
                                                                        >
                                                                            Thanh to??n sau
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card id="cardHeade">
                                                        <Accordion.Toggle onClick={this.onActiveRadio2} id="cardHeade2" as={Card.Header} eventKey="1">
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <p className={this.state.activeRadius2 === false ? "circleBtn2" : "circle"}></p>
                                                                </div>
                                                                <div className="poiterHover col">
                                                                    <span> Th??? Credit/Debit</span>
                                                                </div>
                                                            </div>
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="1">
                                                            <Card.Body>
                                                                {/* <div
                                                                    className="paymentMethodBox row"> */}
                                                                <div>
                                                                    <CardDemo
                                                                        checkStep1={this.state.myPercen}
                                                                        checkLogin={this.state.checkLoginPar}
                                                                        history={this.props.history}
                                                                        orderDetail={myLocation} />
                                                                </div>
                                                                {/* </div> */}

                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </div>
                                        </Collapse>

                                    </div>
                                </form>

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
                                        <div className="col-4">
                                            <p>??p d???ng cho: </p>
                                        </div>
                                        <div style={{ textAlign: "left" }} className="col">
                                            {visitorType.length !== 0 ? this.showVisitorTypeNameChoosed(visitorType) : "Ch??a ?????t"}
                                        </div>
                                    </div>

                                    <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />
                                    <div className="row no-gutters">
                                        <div className="col-5">
                                            <p>T???ng: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <p> {totalPayment}</p>
                                        </div>
                                    </div>

                                    <div className="row no-gutters">
                                        <div className="col">
                                            <p>S??? ti???n thanh to??n: </p>
                                        </div>
                                        <div style={{ textAlign: "right" }} className="col">
                                            <span className="totalPaymentRightPart">{totalPayment}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer2 />
                    <FullPageLoader />
                </div >

            );
        }
    }

}


const mapStateToProps = state => {
    return {
        loggedUser: state.User,
        visitorType: state.Ticket,
        loader: state.Loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserDetail: (user) => {
            dispatch(getUserLogin(user))
        },
        removeVisitorType: () => {
            dispatch(removeVisitorType())
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);