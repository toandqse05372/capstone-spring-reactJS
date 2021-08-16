import * as types from '../constants/ActionType';

var initialState = {
    loading: false
}

var Loader = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return { ...state, loading: true };
        case types.HIDE_LOADER:
            return { ...state, loading: false };
        default: return state;
    }
}

export default Loader;
