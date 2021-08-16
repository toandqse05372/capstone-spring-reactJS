import * as types from '../constants/ActionType';
var data = JSON.parse(localStorage.getItem('visitorTypeList'));
var initialState = data ? data : [];

// var initialState = [];

var Ticket = (state = initialState, action) => {
    var { id, qty, price, name, item, remaining, removeId } = action;
    var index = -1;
    var index2 = -1;
    switch (action.type) {
        case types.ADD_VISITOR_TYPE_CART:
            index = state.findIndex(myItem => myItem.visitorTypeId === id)
            if (index !== -1) { //found
                // if (qty !== 0) {
                state[index].quantity = qty;
                if (state[index].quantity === 0) {
                    state.splice(index, 1);
                }

            } else {
                state.push({
                    visitorTypeId: id,
                    quantity: qty,
                    myPrice: price,
                    visitorTypeName: name,
                    ticketRemaining: remaining
                })
            }
            // index2 = state.findIndex(myItem => myItem.quantity === 0)
            // state.splice(state[index2], 1);

            localStorage.setItem('visitorTypeList', JSON.stringify(state));
            return [...state];
        case types.REMOVE_ALL_VISITORTYPE_QUANTITY_EQUAL_ZERO:
            // index2 = state.findIndex(myItem => myItem.visitorTypeId === removeId)
            // return [...state.splice(state[index2], 1)];
            // index2 = state.findIndex(myItem => myItem.quantity === 0)
            // console.log(index2)
            // if (index2 !== -1) {
            //     for(var i = state.length - 1; i >= 0; i--) {
            //         if(state[i].visitorTypeId === index2) {
            //             state.splice(state[index2], 1);
            //         }
            //     }
            // }
            // index2 = state.findIndex(myItem => myItem.quantity === 0)
            // console.log(state[index2].quantity)

            for (let index = 0; index < state.length; index++) {
                const qty = state[index].quantity;
                const id = state[index].visitorTypeId;
                if (qty === 0) {
                    index2 = state.findIndex(myItem => myItem.visitorTypeId === id)
                    // console.log(index2)
                    state.splice(index2, 1);
                }
            }

            localStorage.setItem('visitorTypeList', JSON.stringify(state));
            return [...state];
        // break;
        case types.REMOVE_VISITORTYPE:
            state = [];
            return [...state];
        case types.ADD_VISITOR_TYPE_CART_ALL:
            state = item;
            return [...state];
        default: return state;
    }
}


export default Ticket;