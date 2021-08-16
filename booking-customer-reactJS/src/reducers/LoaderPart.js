import * as types from '../constants/ActionType';

var initialStatePart = {
    loading: false
}

var LoaderPart = (state = initialStatePart, action) => {
    switch (action.type) {
        case types.SHOW_LOADER_PART:
            return { ...state, loading: true };
        case types.HIDE_LOADER_PART:
            return { ...state, loading: false };
        default: return state;
    }
}
export default LoaderPart;
