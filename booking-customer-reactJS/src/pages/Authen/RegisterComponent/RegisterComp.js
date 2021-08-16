import React, { Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../config/utils/apiCaller';
import { getUserLogin, showLoader, hideLoader } from '../../../actions/index';
import DatePicker, { registerLocale } from 'react-datepicker';
import backG from '../../../img/LoginPaper.png';
import Menu from '../../../components/Menu/Menu';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';
import * as regex from '../../../constants/Regex';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function FormError(props) {
    if (props.isHidden) { return null; }
    return (
        <div style={{ color: "red", position: 'absolute' }} className="form-warning">
            {props.errorMessage}
        </div>
    )
}

class RegisterComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // startDate: '',
            check: false,
            visibility: true,
            visibility1: true,
            startDate: '',
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
                isInputValid: false,
                errorMessage: ''
            },
            phoneNumber: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            myfirstName: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            dob: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            }
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] }; /* dummy object */
        newState.value = value;
        this.setState({ [name]: newState });
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
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
            case "password":
                // regexp = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,20}$/;
                regexp = regex.PASSWORD;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Mật khẩu phải từ 8-20 kí tự, bao gồm số và chữ, có ít nhất 1 chữ cái viết hoa và kí tự đặc biệt'
                    };
                }
            case "RePassword":
                const { password } = this.state;
                if (checkingText === password.value && checkingText !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                }
                if (checkingText !== password.value) {
                    return {
                        isInputValid: false,
                        errorMessage: 'Mật khẩu không khớp'
                    };
                }
                else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Mật khẩu không khớp'
                    };
                }
            case "myfirstName":
                // regexp = /^[^\s].+[^\s]$/;
                // regexp = /^[^\s][a-zA-Z ][^\s]*$/;
                regexp = regex.FIRST_NAME;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Không chứa kí tự đặc biệt'
                    };
                }
            case "lastName":
                // regexp = /^[^\s][a-zA-Z ][^\s]*$/;
                regexp = regex.LAST_NAME;
                checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: ''
                    };
                } else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Không chứa kí tự đặc biệt'
                    };
                }
            case "dob":
                // regexp = /^(?:(?:(?:(?:(?:[1-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:[2468][048]|[13579][26])00))(\/|-|\.)(?:0?2\1(?:29)))|(?:(?:[1-9]\d{3})(\/|-|\.)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[13-9]|1[0-2])\2(?:29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8])))))$/;
                regexp = regex.DATE_OF_BIRTH;
                checkingResult = regexp.exec(checkingText.toString());
                if (checkingResult !== null) {
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
                if (checkingResult !== null) {
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

    toggleShow = () => {
        this.setState({
            visibility: !this.state.visibility
        });
    }
    toggleShow1 = () => {
        this.setState({
            visibility1: !this.state.visibility1
        });
    }

    handleOnBlur = (e) => {
        // console.log(e.target.value);
        const regexp = regex.DATE_OF_BIRTH;
        var checkingResult = regexp.exec(e.target.value.toString());
        if (checkingResult !== null) {
            // if (true) {
            // return {
            //     isInputValid: true,
            //     errorMessage: ''
            // };
            this.setState({
                dob: {
                    value: e.target.value,
                    isInputValid: true,
                    errorMessage: ''
                }
            })
        } else {
            // return {
            //     isInputValid: false,
            //     errorMessage: 'Không đúng định dạng'
            // };
            this.setState({
                dob: {
                    value: '',
                    isInputValid: false,
                    errorMessage: 'Không đúng định dạng'
                }
            })
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

    apiRegister = async (email, password, myfirstName, lastName, dob, phoneNumber, mailRegis) => {
        const { showLoader, hideLoader } = this.props;
        showLoader()
        await callApi('user/register', 'POST', {
            mail: email.value,
            password: password.value,
            firstName: myfirstName.value,
            lastName: lastName.value,
            dob: dob.value,
            phoneNumber: phoneNumber.value
        }).then(res => {
            hideLoader()
            this.props.history.push({
                pathname: '/verify',
                state: { mailRegis }
            })
        }).catch(function (error) {

            if (error.response) {
                // Request made and server responded
                if (error.response.data === "EMAIL_EXISTED") {
                    toast.error(`Email đăng kí đã tồn tại`, {
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
            hideLoader()
        });
    }

    onClickRegister = (e) => {
        const { email, password, myfirstName,
            lastName, RePassword, dob, phoneNumber } = this.state;
        e.preventDefault();

        
        if (email.isInputValid === false ||
            password.isInputValid === false ||
            RePassword.isInputValid === false ||
            lastName.isInputValid === false ||
            myfirstName.isInputValid === false ||
            dob.isInputValid === false ||
            phoneNumber.isInputValid === false) {
            switch (true) {
                case this.mailInput && email.isInputValid === false:
                    setTimeout(() => {

                        this.mailInput.focus();

                    }, 1);
                    break;
                case this.pass && password.isInputValid === false:
                    setTimeout(() => {

                        this.pass.focus();

                    }, 1);
                    break;
                case this.RePassword && RePassword.isInputValid === false:
                    setTimeout(() => {

                        this.RePassword.focus();

                    }, 1);
                    break;
                case this.myfirstName && myfirstName.isInputValid === false:
                    setTimeout(() => {

                        this.myfirstName.focus();

                    }, 1);
                    break;
                case this.lastName && lastName.isInputValid === false:
                    setTimeout(() => {

                        this.lastName.focus();

                    }, 1);
                    break;
                case this.dob && dob.isInputValid === false:
                    setTimeout(() => {

                        this.dob.focus();


                    }, 1);
                    break;
                case this.phoneNumber && phoneNumber.isInputValid === false:
                    setTimeout(() => {

                        this.phoneNumber.focus();

                    }, 1);
                    break;
                default:
                    return null;
            }
        }
        if (
            email.isInputValid === false ||
            password.isInputValid === false ||
            RePassword.isInputValid === false ||
            lastName.isInputValid === false ||
            myfirstName.isInputValid === false ||
            dob.isInputValid === false ||
            phoneNumber.isInputValid === false
        ) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const mailRegis = email.value;
           
            if (password.value !== RePassword.value) {
                toast.error(`Mật khẩu nhập lại chưa chính xác`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                this.apiRegister(email, password, myfirstName, lastName, dob, phoneNumber, mailRegis);
            }
           
        }
    }

    showDate = () => {
        const { check } = this.state;
        this.setState({
            check: !check
        })

    }

    render() {
        showLoader();
        return (
            <div>
                <Menu />
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div
                                style={{ backgroundImage: "url(" + backG + ")" }}
                                className="login100-more ">
                            </div>
                            <form
                                className="was-validated login100-form validate-form"
                                onSubmit={this.onClickRegister}
                                noValidate
                            >
                                <div className="mrt-30 loginPanel1">
                                    Đăng ký
                            </div>

                                {/* Email field */}
                                <div>
                                    <div className="wrap-input100">
                                        <input
                                            className="input100"
                                            ref={(input) => { this.mailInput = input; }}
                                            type="text"
                                            name="email"
                                            maxLength="320"
                                            onChange={this.handleInput}
                                            onBlur={this.handleInputValidation}
                                            required
                                        />
                                        {/* <span className="focus-input100"></span> */}
                                        <span className="label-input100">Email<span className="turnRed"> *</span></span>
                                    </div>
                                    <FormError
                                        type="email"
                                        isHidden={this.state.email.isInputValid}
                                        errorMessage={this.state.email.errorMessage} />
                                    <br></br>
                                </div>
                                {/* End email field */}

                                {/* Password fiels */}
                                <div>
                                    <div className="wrap-input100">
                                        <input
                                            className="input100"
                                            ref={(input) => { this.pass = input; }}
                                            type={this.state.visibility ? "password" : "text"}
                                            // type="password"
                                            name="password"
                                            placeholder=" "
                                            onChange={this.handleInput}
                                            onBlur={this.handleInputValidation}
                                            required
                                        />
                                        {/* <span className="focus-input100"></span> */}
                                        <span className="label-input100">Mật khẩu<span className="turnRed"> *</span></span>
                                        <span
                                            onClick={this.toggleShow}
                                            style={{ marginLeft: "87%", paddingRight: "0px", cursor: "pointer" }}
                                            className="label-input99">
                                            {this.state.visibility
                                                ?
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M1 1L23 23" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                :
                                                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                                                    <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                        </span>

                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <FormError
                                                type="password"
                                                isHidden={this.state.password.isInputValid}
                                                errorMessage={this.state.password.errorMessage} />
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                                {/* End password fiels */}

                                {/* Repassword fiels */}
                                <div>
                                    <div className="wrap-input100">
                                        <input
                                            className="input100"

                                            ref={(input) => { this.RePassword = input; }}
                                            type={this.state.visibility1 ? "password" : "text"}
                                            name="RePassword"
                                            onChange={this.handleInput}
                                            onBlur={this.handleInputValidation}
                                            required
                                        />
                                        {/* <span className="focus-input100"></span> */}
                                        <span className="label-input100">Nhập lại mật khẩu<span className="turnRed"> *</span></span>
                                        <span
                                            onClick={this.toggleShow1}
                                            style={{ marginLeft: "87%", paddingRight: "0px", cursor: "pointer" }}
                                            className="label-input99">
                                            {this.state.visibility1
                                                ?
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M1 1L23 23" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                :
                                                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                                                    <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                        </span>
                                    </div>
                                    <FormError
                                        type="RePassword"
                                        isHidden={this.state.RePassword.isInputValid}
                                        errorMessage={this.state.RePassword.errorMessage} />
                                    <br></br>
                                </div>
                                {/* End repassword fiels */}

                                {/* Full name field */}
                                <div className="row">
                                    {/* First Name field */}
                                    <div className="col">
                                        <div className="wrap-input100">
                                            <input
                                                className="input100"

                                                ref={(input) => { this.myfirstName = input; }}
                                                type="text"
                                                name="myfirstName"
                                                onChange={this.handleInput}
                                                onBlur={this.handleInputValidation}
                                                required
                                            />

                                            {/* <span className="focus-input100"></span> */}
                                            <span className="label-input100">Tên<span className="turnRed"> *</span></span>

                                        </div>
                                        <FormError
                                            type="myfirstName"
                                            isHidden={this.state.myfirstName.isInputValid}
                                            errorMessage={this.state.myfirstName.errorMessage} />
                                        <br></br>
                                    </div>

                                    {/* End First name field */}

                                    {/* Last Name field */}
                                    <div className="col">
                                        <div className="wrap-input100">
                                            <input
                                                className="input100"

                                                ref={(input) => { this.lastName = input; }}
                                                type="text"
                                                name="lastName"
                                                onChange={this.handleInput}
                                                onBlur={this.handleInputValidation}
                                                required
                                            />
                                            {/* <span className="focus-input100"></span> */}
                                            <span className="label-input100">Họ<span className="turnRed"> *</span></span>

                                        </div>
                                        <FormError
                                            type="lastName"
                                            isHidden={this.state.lastName.isInputValid}
                                            errorMessage={this.state.lastName.errorMessage} />
                                        <br></br>
                                    </div>
                                    {/* End Last name field */}
                                </div>
                                {/* End full name field */}

                                {/* DOB & Phone Number field */}
                                <div className="row">
                                    {/* DOB field */}
                                    <div className="col">
                                        <div onClick={this.showDate} className="wrap-input100">
                                            <input
                                                className="input100"
                                                ref={(input) => { this.dob = input; }}
                                                type="date"
                                                name="dob"
                                                onChange={this.handleInput}
                                                onBlur={this.handleInputValidation}
                                                required
                                            />
                                            {/* <DatePicker
                                                className="input100"
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                open={false}
                                                placeholderText="dd/mm/yyyy"
                                                 onBlur={this.handleInputValidation}
                                                onBlur={this.handleOnBlur}
                                            /> */}
                                            {/* <span className="focus-input100"></span> */}
                                            <span className="label-input98">Ngày sinh<span className="turnRed"> *</span></span>
                                        </div>
                                        <FormError
                                            type="dob"
                                            isHidden={this.state.dob.isInputValid}
                                            errorMessage={this.state.dob.errorMessage} />
                                    </div>
                                    {/* End DOB field */}


                                    {/* Phone number field */}
                                    <div className="col">
                                        <div className="wrap-input100">
                                            <input
                                                className="input100"
                                               
                                                ref={(input) => { this.phoneNumber = input; }}
                                                type="text"
                                                name="phoneNumber"
                                                onChange={this.handleInput}
                                                onBlur={this.handleInputValidation}
                                                required
                                            />
                                            {/* <span className="focus-input100"></span> */}
                                            <span className="label-input100">Số Điện thoại<span className="turnRed"> *</span></span>

                                        </div>
                                        <FormError
                                            type="phoneNumber"
                                            isHidden={this.state.phoneNumber.isInputValid}
                                            errorMessage={this.state.phoneNumber.errorMessage} />
                                    </div>
                                    {/* End Phone number field */}
                                </div>
                                {/* End DOB & Phone Number field */}





                                <div className="flex-sb-m w-full p-t-3 p-b-32">
                                   
                                </div>

                                <div className="container-login100-form-btn">
                                    <button type="submit" className="login100-form-btn">
                                        Xác nhận
						        </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>

                <FullPageLoader />
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        loader: state.Loader
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComp);
