import * as types from '../constants/ActionType';
var initialState = [];

var City = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CITY:
            state = action.listCity;
            // localStorage.setItem('USER', JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default City;