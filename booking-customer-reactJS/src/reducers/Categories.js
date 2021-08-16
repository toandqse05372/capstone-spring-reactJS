import * as types from '../constants/ActionType';
// var data = JSON.parse(localStorage.getItem('USER'));
// var inititalState = ({});
// var initialState = data ? data : [];

var initialState = [];

var Categories = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CATEGORY:
            state = action.listCategory;
            // localStorage.setItem('USER', JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default Categories;