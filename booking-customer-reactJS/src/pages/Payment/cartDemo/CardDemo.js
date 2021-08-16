import React, { Component } from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { connect } from 'react-redux';
import callApi from '../../../config/utils/apiCaller';
import { showLoader, hideLoader, removeVisitorType } from '../../../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
    checkWrong: true
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({
        errorMessage: error.message,
        checkWrong: false
      }, () => {
      });
    } else {
      this.setState({
        checkWrong: null
      })
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { orderDetail, visitorType, loggedUser, checkLogin, checkStep1, removeVisitorType } = this.props;
    if (checkLogin === false) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (checkStep1 !== 50) {
      toast.error('Bạn cần xác thực thông tin liên lạc!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.checkWrong === false) {
      toast.error(`Vui lòng điền lại số thẻ`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (this.state.checkWrong === true) {
      toast.error(`Vui lòng điền số thẻ`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (orderDetail.state.orderStatus) {

      } else {
      }

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

      var order = {
        ticketTypeId: orderDetail.state.ticketTypeID,
        ticketTypeName: orderDetail.state.ticketName,
        userId: loggedUser.id,
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        mail: loggedUser.mail,
        phoneNumber: loggedUser.phoneNumber,
        totalPayment: orderDetail.state.totalPayment,
        purchaseDay: new Date(),
        redemptionDate: orderDetail.state.redemptionDate,
        orderItems: orderItems,
        id: orderDetail.state.orderStatus ? orderDetail.state.orderId : null,
        placeId: orderDetail.state.place !== undefined ? orderDetail.state.place.id : orderDetail.state.placeId
      }
      if (this.props.stripe) {
        this.props.stripe.createToken()
          .then(res => {
            const paymentToken = res.token.id;
            let data = new FormData();
            const myStatus = "existed";
            const myNewStatus = "new";
            data.append('order', JSON.stringify(order));
            data.append('token', paymentToken);
            data.append('action', orderDetail.state.orderStatus ? myStatus : myNewStatus);
            this.callPayment(data, orderDetail);
          })
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    }
  };

  callPayment = async (data, orderDetail) => {
    const { showLoader, hideLoader } = this.props;
    showLoader();
    await callApi('payment', 'POST', data)
      .then(res => {
        hideLoader();
        if (res) {
          localStorage.removeItem('tokenPayment');
          this.props.history.push({
            pathname: '/paymentSucess',
            state: { orderDetail: orderDetail }
          })
        }
      })
      .catch(function (error) {
        if (error.response) {
          hideLoader();
        }
      });
  }

  render() {


    return (
      <div className="CardDemo">
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <div
          className="paymentMethodBox row">
          <div
            className="paymentMethodBox row">
            <div className="row">
              <div className="col">
                <label>Số thẻ</label>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <CardElement
                  onChange={this.handleChange}
                  {...createOptions()}
                />
              </div>
              <br></br>
              <br></br>
              <div
                className="lockLogoPayment col-1">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="#A5A5A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="#A5A5A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="moreInfor col">
                <p>
                  Thông tin giao dịch của bạn được mã hóa an toàn bởi các hệ thống thanh toán uy tín.
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="policyPayment col-7">
            <p>Khi nhấp vào "Thanh toán ngay", bạn đã đọc và đồng ý với
            <Link to="/aboutUs/termsConditions"><span className="pol"> Điều khoản sử dụng </span></Link>và
            <Link to="/aboutUs/policy"><span className="pol"> Chính sách huỷ trả</span></Link></p>
          </div>
          <div className="col-4">
            <button className="proceedPaymentBtn"
              onClick={this.handleSubmit.bind(this)}>
              Thanh toán ngay
          </button>
          </div>
        </div>
        {/* </Link> */}
        {/* </form> */}
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

class CardDemo extends Component {
  render() {
    const { removeVisitorType, orderDetail, visitorType, loggedUser, showLoader, hideLoader, checkLogin, checkStep1 } = this.props;
    
    return (

      <StripeProvider apiKey='pk_test_51Gs1CYGtpdysubsWvXC2vynpAmqeGq1vGggeXCHQsepXXX5TOxNBKlLFHBsar57TIkYsMYWuTSFg5H40uHBL4TW200nIV10yG5'>
        <Elements>
          <CardForm
            history={this.props.history}
            loggedUser={loggedUser}
            orderDetail={orderDetail}
            visitorType={visitorType}
            showLoader={showLoader}
            hideLoader={hideLoader}
            checkLogin={checkLogin}
            checkStep1={checkStep1}
            removeVisitorType={removeVisitorType}
          />
        </Elements>
      </StripeProvider>
    );
  }
}
// export default CardDemo;

const mapStateToProps = state => {
  return {
    visitorType: state.Ticket,
    loggedUser: state.User
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo);