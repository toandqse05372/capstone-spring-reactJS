import React, { Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../config/utils/apiCaller';
import { getUserLogin, showLoader, hideLoader } from '../../../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as regex from '../../../constants/Regex';
import './UserUpdateInformation.css'
// import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { registerLocale } from 'react-datepicker';
import Shake from 'react-reveal/Shake';
import vi from "date-fns/locale/vi";
// import { format } from 'date-fns';
registerLocale("vi", vi);

// function FormError(props) {
//     if (props.isHidden) { return null; }
//     return (
//         <div style={{ color: "red", position: 'absolute' }} className="form-warning">
//             {props.errorMessage}
//         </div>
//     )
// }

class UserUpdateInformation extends Component {

    constructor(props) {
        super(props);
        // const { loggedUser } = this.props;
        
        this.state = {
            checkChangeFirstName: false,
            checkChangeLastname: false,
            checkChangePhoneNumb: false,
            shake: false,
            email: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            password: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            RePassword: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
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
            dob: {
                value: '',
                isInputValid: true,
                errorMessage: ''
            },
            // startDate: this.convertDateToLocalVN(loggedUser.dob),
            // startDate: new Date("2014/02/08"),
        }
    }
    handleInput = event => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] }; /* dummy object */
        newState.value = value;
        // this.setState({ [name]: newState });
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
                        errorMessage: 'Email có dạng abc@xyz.ghi(.xnh)'
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
                        errorMessage: 'không chứa khoảng trắng ở đầu và cuối!'
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
                        errorMessage: 'không chứa khoảng trắng ở đầu và cuối!'
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
                        errorMessage: 'Không đúng định dạng'
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
                        errorMessage: 'Số điện thoại chứa 10-11 số'
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
        // console.log(check);
        if (name === "dob" && check === false) {
            this.setState({
                check: true
            })
            // console.log(check);
        } else if (name === "dob" && check === true) {
            this.setState({
                check: false
            })
        }
        this.setState({
            [name]: newState,
        })
        // console.log(check);
    }

    updateUserDetail = () => {
        const { dob, myfirstName, lastName, phoneNumber } = this.state;
        const { loggedUser } = this.props;
        const id = loggedUser.id;
        if (myfirstName.value === '' && lastName.value === '' &&
            phoneNumber.value === '' && dob.value === '') {
            this.setState({
                shake: true
            })
            toast.error('Vui lòng điền thông tin bạn muốn thay đổi', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } 
        else if (lastName.isInputValid === false) {
            this.setState({
                shake: true
            })
            toast.error('Họ không chứa kí tự đặc biệt!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else if (myfirstName.isInputValid === false) {
            this.setState({
                shake: true
            })
            toast.error('Tên Không chứa kí tự đặc biệt!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else if (phoneNumber.isInputValid === false) {
            this.setState({
                shake: true
            })
            toast.error('Số điện thoại chứa 10-11 số!', {
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
        // console.log(dob.value);
        showLoader();
        await callApi(`userClient/${id}`, 'PUT',
            {
                firstName: myfirstName.value !== '' ? myfirstName.value : loggedUser.firstName,
                lastName: lastName.value !== '' ? lastName.value : loggedUser.lastName,
                dob: dob.value !== '' ? dob.value : loggedUser.dob,
                phoneNumber: phoneNumber.value !== '' ? phoneNumber.value : loggedUser.phoneNumber,
            })
            .then(res => {
                // console.log(res);
                this.props.fetchUserDetail(res.data);
                hideLoader();
                toast.success('Thay đổi thông tin thành công!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.props.history.push("/userProfile/myProfile")
            }).catch(function (error) {
                if (error.response) {
                    hideLoader();
                    // console.log(error.response.data);
                }
            });
    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    }

    convertDateToLocalVN = (date) => {
        if (date !== undefined) {
            return this.formatter.format(Date.parse(date));
        }
    }

    formatter = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    render() {
        const { loggedUser } = this.props;
        return (
            <div
                className="col">
                <div className="rightBoxUserDetail">
                    <div style={{ padding: "30px" }} >
                        <div className="row">
                            <div className="col-12">
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Chỉnh sửa tài khoản</div>
                                </div>
                                <div className="col-12">
                                    <p className="attention">Thông tin này sẽ được tự động nhập vào đơn hàng của bạn. Thông tin của bạn sẽ được mã hoá và không chia sẻ với bên thứ 3</p>
                                </div>
                                <div className="mrt-30 col-12">
                                    <div className="row">
                                        <div className="col">
                                            <span className="labelHolder"> Tên </span><span className="turnRed">*</span>
                                            <div className="customWrap-input100">
                                                <input
                                                    className="input100"
                                                    type="text"
                                                    name="myfirstName"
                                                    onChange={this.handleInput}
                                                    onBlur={this.handleInputValidation}
                                                    // placeholder={loggedUser.firstName}
                                                    value={this.state.checkChangeFirstName === false ? loggedUser.firstName : this.state.myfirstName.value}

                                                />
                                            </div>
                                            <label className="cmt">Như trên CMND (không dấu)</label>
                                        </div>
                                        <div className="col">
                                            <span className="labelHolder"> Họ </span><span className="turnRed">*</span>
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
                                            <label className="cmt">Như trên CMND (không dấu)</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mrt-30 col-12">
                                    <div className="row">

                                        <div className="col">
                                            <span className="labelHolder"> Số điện thoại </span><span className="turnRed">*</span>
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
                                            <label className="cmt">Số điện thoại sử dụng để xác thực giao dịch</label>
                                        </div>
                                        <div className="col">
                                            <label>Email</label><span className="turnRed"> *</span>
                                            <input type="text" disabled value={loggedUser.mail} className="textDisable form-control"
                                                placeholder="Họ" />
                                            <label className="cmt">(Vé của bạn sẽ được gửi về địa chỉ email trên,
                                            xin vui lòng kiểm tra kỹ thông tin.)
                                            </label>
                                        </div>
                                      
                                    </div>
                                </div>
                                
                                <div className="pdt-30 col-12">
                                    <div className="row">
                                        <div className="col-3">
                                        <Shake duration={700} when={this.state.shake}>

                                            <button type="submit"
                                                onClick={this.updateUserDetail}
                                                className="proceedPaymentBtn">Lưu</button>
                                        </Shake>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div>

        );
    }

}

// export default UserUpdateInformation;
const mapStateToProps = state => {
    return {
        loggedUser: state.User
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserDetail: (user) => {
            dispatch(getUserLogin(user))
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdateInformation);