import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../img/Logo.png';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import callApi from '../../config/utils/apiCaller';
import { withRouter } from 'react-router-dom';
import { showLoader, hideLoader, getUserLogin, removeUserLogin } from '../../actions/index';
import NavBarSearch from './NavBarSearch/NavBarSearch';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    logOut = () => {
        callApi("login/logout", 'POST', null)
            .then(res => {
                localStorage.removeItem('tokenLogin');  //remove tokenLogin store in local Storage
                localStorage.removeItem('USER');        //remove User infor store in local Storage
                localStorage.removeItem('visitorTypeList');
                localStorage.removeItem('tokenPayment');
                this.props.removeUserLogin();           //remove User infor from redux store
                this.props.history.push("/login");      //redirect to login page
            }).catch(function (error) {

            });
    }

    render() {
        var tokenLogin = JSON.parse(localStorage.getItem('tokenLogin'));
        return (
            <nav
                style={{ paddingTop: "0px", paddingBottom: "0px", zIndex: this.props.loader.loading === false ? "1000" : "0" }}
                className={`navbar navbar-light bg-light bg-white fixed-top`}>
                <Link className="navbar-brand" to='/'>
                    <img className="navLogo"
                        src={logo}
                        alt="Fail Loading"
                        width="125.608"
                        height="38.704"
                    />
                </Link>
                <div style={{
                    //Decide which path search box in navbar will appear.
                    display: this.props.location.pathname === "/"
                        || this.props.location.pathname === "/login"
                        || this.props.location.pathname === "/searchedPlace"
                        || this.props.location.pathname === "/register"
                        || this.props.location.pathname === "/forgotPassword"
                        ? "none" : ""
                }} >
                    <NavBarSearch />
                </div>
                <ul className="nav navbar-expand-lg">
                    <Link
                        style={{ textDecoration: "none", display: this.props.location.pathname === "/" ? "none" : "" }} to="/">
                        <button style={{ display: tokenLogin ? "" : "" }} className="none1 nav-link">
                            <svg className="svgNav" width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 10.625L12.625 1.58337L24.25 10.625V24.8334C24.25 25.5185 23.9778 26.1756 23.4934 26.6601C23.0089 27.1445 22.3518 27.4167 21.6667 27.4167H3.58333C2.89819 27.4167 2.24111 27.1445 1.75664 26.6601C1.27217 26.1756 1 25.5185 1 24.8334V10.625Z" stroke="#5B5B5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.75 27.4167V14.5H16.5V27.4167" stroke="#5B5B5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Trang chủ
                        </button>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/userProfile/myOrders">
                        <button style={{ display: tokenLogin ? "" : "none" }} className="none1 nav-link">
                            <svg className="svgNav" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.75 1H3.75C3.02065 1 2.32118 1.28973 1.80546 1.80546C1.28973 2.32118 1 3.02065 1 3.75V25.75C1 26.4793 1.28973 27.1788 1.80546 27.6945C2.32118 28.2103 3.02065 28.5 3.75 28.5H20.25C20.9793 28.5 21.6788 28.2103 22.1945 27.6945C22.7103 27.1788 23 26.4793 23 25.75V9.25L14.75 1Z" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.75 1V9.25H23" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 16.125H6.5" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 21.625H6.5" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.25 10.625H7.875H6.5" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {' '}Đặt chỗ của tôi
                        </button>
                    </Link>
                    <Link style={{ display: this.props.location.pathname === "/login" ? "none" : "" }} to="/login">
                        <button style={{ display: tokenLogin ? "none" : "" }} className="loginbtn">Đăng Nhập
                    </button>
                    </Link>
                    <Link style={{ display: this.props.location.pathname === "/register" ? "none" : "" }} to="/register">
                        <button style={{ display: tokenLogin ? "none" : "" }} className="registerbtn">
                            Đăng ký
                    </button>
                    </Link>
                    <div
                        style={{ paddingRight: "0px" }}
                        className="nav-link">
                        <button
                            style={{ display: tokenLogin ? "" : "none" }} className="userNamebefore">
                            Hello!
                        </button>
                    </div>
                    &nbsp;
                    <div
                        style={{ paddingLeft: "0px", paddingRight: "0px" }}
                        className="nav-link">
                        <Dropdown style={{ display: tokenLogin ? "" : "none" }}>
                            <Dropdown.Toggle id="userName">
                                {this.props.UserDetail.firstName}&nbsp;{this.props.UserDetail.lastName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link className="itemDrop" to="/userProfile/myProfile">
                                    <svg width="14.4" height="16" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21V18.7778C19 17.599 18.5259 16.4686 17.682 15.6351C16.8381 14.8016 15.6935 14.3333 14.5 14.3333H5.5C4.30653 14.3333 3.16193 14.8016 2.31802 15.6351C1.47411 16.4686 1 17.599 1 18.7778V21" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 9.88889C12.4853 9.88889 14.5 7.89904 14.5 5.44444C14.5 2.98985 12.4853 1 10 1C7.51472 1 5.5 2.98985 5.5 5.44444C5.5 7.89904 7.51472 9.88889 10 9.88889Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg> &nbsp;
                                    Hồ sơ của tôi
                                    </Link>
                                <button className="itemDrop" onClick={this.logOut}>
                                    <svg width="14.4" height="16" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.365 5.64001C17.6234 6.8988 18.4803 8.50246 18.8273 10.2482C19.1743 11.994 18.9959 13.8034 18.3146 15.4478C17.6334 17.0921 16.4798 18.4976 14.9998 19.4864C13.5199 20.4752 11.7799 21.0029 10 21.0029C8.2201 21.0029 6.48016 20.4752 5.00018 19.4864C3.5202 18.4976 2.36664 17.0921 1.68537 15.4478C1.00409 13.8034 0.825693 11.994 1.17272 10.2482C1.51975 8.50246 2.37663 6.8988 3.635 5.64001" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.005 1V11" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg> &nbsp;
                                    Đăng xuất
                                    </button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <img
                        style=
                        {{
                            borderRadius: "50%",
                            marginRight: "43.2px",
                            display: tokenLogin ? "" : "none",
                            visibility: this.props.UserDetail.avatarLink === null ? "hidden" : "visible"
                        }}
                        src={this.props.UserDetail.avatarLink}
                        width="36.8"
                        height="36.8"
                        alt=""
                    />
                </ul>
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return {
        UserDetail: state.User,
        loader: state.Loader,
    }
};

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
        },
        removeUserLogin: () => {
            dispatch(removeUserLogin())
        }
    }
}
// export default Menu;
// export default connect(mapStateToProps, null)(Menu);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
