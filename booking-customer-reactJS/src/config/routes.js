import React from 'react';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import VerifyEmail from '../pages/Authen/VerifyEmail/VerifyEmail';
import CfMail from '../pages/Authen/confirmedMail/CfMail';
import LoginComp from '../pages/Authen/LoginComponent/LoginComp';
import RegisterComp from '../pages/Authen/RegisterComponent/RegisterComp';
import SearchedPlace from '../pages/SearchedPlace/SearchedPlace';
import MyMul from '../components/HomepageComponents/Search/MyMul';
import PlaceDetail from '../pages/Detail/PlaceDetail/PlaceDetail';
import Payment from '../pages/Payment/Payment';
import PaymentSucess from '../components/PaymentComponents/PaymentSucess';
import TotalPayment from '../components/DetailComponents/TotalPayment/TotalPayment';
import UserProfile from '../pages/UserProfile/UserProfile';
import ForgotPassword from '../pages/Authen/ForgotPassword/ForgotPassword';
import CfNewPassword from '../pages/Authen/cfNewPassword/CfNewPassword';
import AboutUs from '../pages/AboutUs/AboutUs';


const routers = [
    {
        path: '/login',
        exact: false,
        main: ({ history, location }) => <LoginComp history={history} location={location} />

    },
    {
        path: '/totalPayment',
        exact: false,
        main: ({ history, location }) => <TotalPayment history={history} location={location} />

    },
    {
        path: '/register',
        exact: false,
        main: ({ history, location }) => <RegisterComp history={history} location={location} />
    },
    {
        path: '/verify',
        exact: false,
        main: ({ history, location }) => <VerifyEmail history={history} location={location} />

    },
    {
        path: '/confirmMail',
        exact: false,
        main: ({ match, history, location }) =>
            <CfMail history={history} location={location} match={match} />
    },
    {
        path: '/forgotPassword',
        exact: false,
        main: ({ history, match, location }) => <ForgotPassword location={location} history={history} match={match} />
    },
    {
        path: '/newPassword',
        exact: false,
        main: ({ history, match, location }) => <CfNewPassword location={location} history={history} match={match} />
    },
    {
        path: '/searchedPlace',
        exact: false,
        main: ({ match, history, location }) =>
            <SearchedPlace history={history} location={location} match={match} />
    },
    {
        path: '/mul',
        exact: false,
        main: ({ match, history, location }) =>
            <MyMul history={history} location={location} match={match} />
    },
    {
        path: '/placeDetail/:id',
        exact: false,
        main: ({ history, match }) => <PlaceDetail history={history} match={match} />
    },
    {
        path: '/payment',
        exact: false,
        main: ({ history, match, location }) => <Payment location={location} history={history} match={match} />
    },
    {
        path: '/paymentSucess',
        exact: false,
        main: ({ history, match, location }) => <PaymentSucess location={location} history={history} match={match} />
    },
    {
        path: '/userProfile',
        exact: false,
        main: ({ history, match, location }) => <UserProfile location={location} history={history} match={match} />
    },
    {
        path: '/aboutUs',
        exact: false,
        main: ({ history, match, location }) => <AboutUs location={location} history={history} match={match} />
    },
    {
        path: '/',
        exact: true,
        main: ({ history, location }) => <HomePage history={history} location={location} />
    },
    {
        path: '',
        exact: false,
        main: ({ history, location }) => <NotFoundPage history={history} location={location} />

    }
];
export default routers;