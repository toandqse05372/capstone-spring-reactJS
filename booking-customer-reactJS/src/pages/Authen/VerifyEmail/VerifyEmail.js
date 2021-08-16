import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './login2.css'
import './verify.css';
// import callApi from '../../../config/utils/apiCaller';
import { getUserLogin, showLoader, hideLoader } from '../../../actions/index';
import { Link, Redirect } from 'react-router-dom';
import backG from '../../../img/LoginPaper.png';
import callApi from '../../../config/utils/apiCaller';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myMail: '',
        }
    }
    onLogin = (e) => {
        const{showLoader, hideLoader} = this.props;
        e.preventDefault();
        const { myMail } = this.state;
        
        let data = new FormData();
        data.append('mail', myMail);
        showLoader();
        callApi("user/resent-email", 'POST', data)
            .then(res => {
                hideLoader()
                toast.success('Gửi lại mail xác nhận thành công!', {
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
                }
            });
    }

    componentDidMount = () => {
        const { location } = this.props;
        if (location.state !== undefined) {
            this.setState({
                myMail: location.state.mailRegis
            })
        }
    }

    render() {
        const { location } = this.props;
        const { myMail } = this.state;
        if (location.state === undefined) {
            return (
                <Redirect to="/" />
            )
        } else
            return (
                <div>
                
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
                                <Link to="/">
                                    <svg width="126.4" height="39.2" viewBox="0 0 158 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.6295 5.80529H27.4465C28.4172 5.80529 29.2166 5.00587 29.2166 4.03515V2.03661C29.2166 1.0659 28.4172 0.266479 27.4465 0.266479H24.6295C23.6588 0.266479 22.8594 1.0659 22.8594 2.03661V4.03515C22.8594 5.00587 23.6588 5.80529 24.6295 5.80529Z" fill="#FF7062" />
                                        <path d="M27.085 10.5257H25.2958C23.8683 10.5257 23.145 11.3061 23.145 12.3148V12.5052C21.9649 11.6867 20.6325 11.0396 19.224 10.6018C18.1582 10.1831 16.8258 9.87852 15.1699 9.87852C15.0557 9.87852 14.9605 9.87852 14.8463 9.87852C14.7321 9.87852 14.6179 9.87852 14.5037 9.87852C6.47146 9.87852 0 15.7219 0 23.9254C0 32.186 6.47146 37.9723 14.5037 37.9723C17.492 37.9723 20.2519 37.1729 22.574 35.7453V36.1831C22.574 40.9606 19.1098 42.7117 14.9986 42.7117C12.5242 42.7117 10.8492 42.1787 9.59299 41.7029C8.16546 41.227 7.38508 41.5887 6.81407 42.921L6.39533 44.1202C5.82431 45.4906 6.18596 46.3852 7.55638 46.9562C9.40265 47.7556 12.3909 48.3837 15.3983 48.3837C22.022 48.3837 29.2738 44.9196 29.2738 35.7073V12.7336C29.2548 11.3061 28.5125 10.5257 27.085 10.5257ZM14.7702 32.3573C10.2972 32.3573 6.68083 28.6077 6.68083 23.9825C6.68083 19.3573 10.2972 15.6077 14.7702 15.6077C14.9605 15.6077 15.1508 15.6077 15.3221 15.6267C15.3412 15.6267 15.3412 15.6267 15.3412 15.6267C15.3983 15.6267 15.4554 15.6457 15.5315 15.6457C19.6428 16.0454 22.8595 19.6238 22.8595 23.9825C22.8595 28.6077 19.2431 32.3573 14.7702 32.3573Z" fill="#5B5B5B" />
                                        <path d="M44.9768 9.89752C53.1232 9.89752 59.7469 15.7409 59.7469 23.9254C59.7469 32.186 53.1232 37.9532 44.9768 37.9532C36.8303 37.9532 30.2637 32.167 30.2637 23.9254C30.2447 15.7218 36.8303 9.89752 44.9768 9.89752ZM44.9768 32.2812C49.3355 32.2812 52.9709 28.9122 52.9709 23.9254C52.9709 18.9766 49.3355 15.5696 44.9768 15.5696C40.618 15.5696 37.0397 18.9956 37.0397 23.9254C37.0397 28.9312 40.599 32.2812 44.9768 32.2812Z" fill="#5B5B5B" />
                                        <path d="M107.693 9.89752C115.839 9.89752 122.463 15.7409 122.463 23.9254C122.463 32.186 115.839 37.9532 107.693 37.9532C99.5462 37.9532 92.9795 32.167 92.9795 23.9254C92.9605 15.7218 99.5271 9.89752 107.693 9.89752ZM107.693 32.2812C112.051 32.2812 115.687 28.9122 115.687 23.9254C115.687 18.9766 112.051 15.5696 107.693 15.5696C103.334 15.5696 99.7555 18.9956 99.7555 23.9254C99.7365 28.9312 103.315 32.2812 107.693 32.2812Z" fill="#5B5B5B" />
                                        <path d="M76.5727 9.89753C76.5156 9.89753 76.4394 9.89753 76.3823 9.89753C76.3252 9.89753 76.2681 9.89753 76.211 9.89753C75.621 9.89753 75.05 9.93559 74.5361 10.0308C72.1378 10.3163 69.9299 11.1347 68.0646 12.3719C68.0646 12.2387 68.0646 12.1054 68.0646 11.9722V2.20791C68.0646 0.780382 67.3223 0 65.8567 0H63.5917C62.1642 0 61.3838 0.780382 61.3838 2.20791V35.1172C61.3838 36.5828 62.1642 37.3251 63.5917 37.3251H65.3809C66.8465 37.3251 67.5888 36.5828 67.5888 35.4408V35.1933C69.0353 36.2211 70.6913 36.9825 72.4995 37.4583C73.4321 37.7629 74.5361 37.9722 75.7923 37.9722C75.9065 37.9722 76.0397 37.9722 76.1539 37.9722C76.2872 37.9722 76.4394 37.9722 76.5727 37.9722C84.7191 37.9722 91.3428 32.186 91.3428 23.9254C91.3428 15.7218 84.7191 9.89753 76.5727 9.89753ZM75.64 32.2431C71.7001 31.8053 68.6166 28.5696 68.6166 23.9254C68.6166 19.4524 71.5478 16.2358 75.3355 15.6647C75.7352 15.6076 76.1539 15.5696 76.5727 15.5696C80.9314 15.5696 84.5668 18.9956 84.5668 23.9254C84.5668 28.9122 80.9314 32.2812 76.5727 32.2812C76.2491 32.2812 75.9446 32.2621 75.64 32.2431Z" fill="#5B5B5B" />
                                        <path d="M124.404 2.20791C124.404 0.780382 125.185 0 126.612 0H128.877C130.343 0 131.085 0.780382 131.085 2.20791V19.9854H134.397L139.974 11.9912C140.602 10.9444 141.401 10.5256 142.601 10.5256H145.113C146.902 10.5256 147.473 11.7438 146.483 13.1523L139.803 22.5169V22.6311L147.683 34.7175C148.577 36.2402 148.006 37.3441 146.217 37.3441H143.381C142.163 37.3441 141.382 36.8683 140.811 35.8214L134.549 25.6194H131.085V35.1362C131.085 36.6018 130.343 37.3441 128.877 37.3441H126.612C125.185 37.3441 124.404 36.6018 124.404 35.1362V2.20791Z" fill="#5B5B5B" />
                                        <path d="M150.328 3.78771V2.20791C150.328 0.780382 151.07 0 152.479 0H154.801C156.229 0 157.009 0.780382 157.009 2.20791V3.78771C157.009 5.21524 156.229 5.93852 154.801 5.93852H152.479C151.051 5.95755 150.328 5.21524 150.328 3.78771ZM150.328 12.7336C150.328 11.306 151.07 10.5256 152.479 10.5256H154.801C156.229 10.5256 156.952 11.306 156.952 12.7336V35.1362C156.952 36.6018 156.21 37.3441 154.801 37.3441H152.479C151.051 37.3441 150.328 36.6018 150.328 35.1362V12.7336Z" fill="#5B5B5B" />
                                    </svg>
                                </Link>
                                <div className="loginPanelEmail">
                                    Xác nhận Email
                            </div>
                                <br></br>
                                <br></br>
                                <div className="row det">
                                    <div className="col">
                                        <p className="det1">Vui lòng kiểm tra email để xác nhận đăng ký &emsp;
                                                </p>
                                        < i className="det3">{myMail}</i>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="row no-gutters">
                                    <div className="col-6">
                                        <Link to="/" type="button" className="toMain"> Trang Chủ </Link>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" className="toMain2"> Gửi lại </button>
                                    </div>
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

export default connect(null, mapDispatchToProps)(VerifyEmail);

