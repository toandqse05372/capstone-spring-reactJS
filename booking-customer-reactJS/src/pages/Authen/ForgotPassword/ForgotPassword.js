import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ForgotPassword.css';
import callApi from '../../../config/utils/apiCaller';
import { getUserLogin, showLoader, hideLoader } from '../../../actions/index';
// import { Link } from 'react-router-dom';
import backG from '../../../img/LoginPaper.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';
import * as regex from '../../../constants/Regex';
import Menu from '../../../components/Menu/Menu';

function FormError(props) {
    if (props.isHidden) { return null; }
    return (
        <div style={{ color: "red", position: 'absolute' }} className="form-warning">
            {props.errorMessage}
        </div>
    )
}

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            visibility: true,
            checkResent: false
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] }; /* dummy object */
        newState.value = value;
        this.setState({ [name]: newState });
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
            default:
                return null;
        }
    }

    handleInputValidation = event => {
        const { name } = event.target;
        const { isInputValid, errorMessage } = this.validateInput(name, this.state[name].value);
        const newState = { ...this.state[name] }; /* dummy object */
        newState.isInputValid = isInputValid;
        newState.errorMessage = errorMessage;
        this.setState({ [name]: newState })
    }

    apiForgotPass = async (data) => {
        const { showLoader, hideLoader } = this.props;
        showLoader()
        await callApi('user/forgotPassword', 'POST', data)
            .then(res => {
                // console.log(res);
                this.setState({
                    checkResent: true
                })
                hideLoader()
                toast.success('Vui lòng kiểm tra email!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    // console.log(error.response);
                    toast.success('Something Wrong!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    hideLoader()
                }
            });
    }

    onLogin = (e) => {
        e.preventDefault();
        const { email } = this.state;
        // console.log(email.value);
        const myMail = email.value;
        // let data = new FormData();
        // data.append('mail', myMail);
        // callApi('user/forgotPassword', 'POST', data)
        // .then(res => {
        //     // console.log(res);
        //     this.setState({
        //         checkResent: true
        //     })
        // }).catch(function (error) {
        //     if (error.response) {
        //         // Request made and server responded
        //         console.log(error.response);
        //     }
        // });


        if (this.mailInput && email.isInputValid === false) {
            setTimeout(() => {
                this.mailInput.focus();
            }, 1);
        }

        if (email.isInputValid === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            // console.log("GO to susscess")

            let data = new FormData();
            data.append('mail', myMail);
            this.apiForgotPass(data);
            // callApi('', 'POST', {
            //     mail: email.value,
            //     password: password.value
            // }).then(res => {
            //     console.log(res);
            // }).catch(function (error) {
            //     if (error.response) {
            //         // Request made and server responded
            //         console.log(error.response.data);
            //         alert("Wrong User Name or Password");
            //     }
            // });
        }
    }


    toggleShow = () => {
        this.setState({
            visibility: !this.state.visibility
        });
    }

    render() {
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
                            onSubmit={this.onLogin}
                            noValidate
                        >
                            <div style={{marginTop: "150px"}} className="loginPanel1">
                                Quên mật khẩu
                            </div>
                            <label className="subHeader">Vui lòng nhập địa chỉ của bạn</label>
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
                                <span className="label-input100">Email</span>
                            </div>
                            <FormError
                                type="email"
                                isHidden={this.state.email.isInputValid}
                                errorMessage={this.state.email.errorMessage} />

                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Gửi email xác thực
						        </button>
                            </div>
                        </form>
                    </div>
                </div>
                <FullPageLoader />
            </div>
            </div>
        );
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

export default connect(null, mapDispatchToProps)(ForgotPassword);
