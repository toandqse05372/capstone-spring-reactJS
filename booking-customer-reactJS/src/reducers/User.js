import * as types from '../constants/ActionType';
// import { showLoader, hideLoader } from '../actions/index';
// import callApi from '../config/utils/apiCaller';
// import { connect } from 'react-redux';

// var data = JSON.parse(localStorage.getItem('USER'));
// var inititalState = ({});
// var initialState = data ? data : [];

var initialState = [];


var User = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_LOGIN:
            state = action.user;
            // localStorage.setItem('USER', JSON.stringify(state));
            return state;
        case types.REMOVE_USER_LOGIN:
            state = [];
            // localStorage.setItem('USER', JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default User;
