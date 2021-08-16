import * as types from '../constants/ActionType';
// import callApi from '../config/utils/apiCaller';
// import axios from 'axios';



// export const actFetchlistAllParkRequest = () => {
//     return (dispatch) => {
//         return callApi('parks', 'GET', null).then(res => {
//             // console.log(res.data);
//             dispatch(actFetchlistAllPark(res.data))
//         });
//     };
// }

// export const actFetchlistAllPark = (a) => {
//     return {
//         type: types.FETCH_PARK,
//         a
//     }
// }

// export const actNameP = (nameP) => {
//     return {
//         type: types.SEARCH_PARK_BY_NAME,
//         nameP
//     }
// }

// export const getParkID = (id) => {
//     return {
//         type: types.GET_PARK_ID,
//         id
//     }
// }

export const getUserLogin = (user) => {
    return {
        type: types.GET_USER_LOGIN,
        user
    }
}

// export const actAddToCart = (product, quantity) => {
//     return {
//         type : types.ADD_TO_CART,
//         product : product,
//         quantity : quantity
//     }
// }

export const actUpdateProductIncart = (product, quantity) => {
  return {
      type : types.UPDATE_TICKET,
      product,
      quantity
  }
}

export const addVisitorTypeCart = (item) => {
  return {
      type : types.ADD_VISITOR_TYPE_CART,
      item,
      
  }
}

export const fetchVisitor = (item) => {
  return {
      type: types.ADD_VISITOR_TYPE_CART_ALL,
      item
  }
}

export const fetchVisitor2 = (id, qty ,price, name, remaining) => {
  return {
      type: types.ADD_VISITOR_TYPE_CART,
      id,
      qty,
      price,
      name,
      remaining
  }
}

export const removeZeroQuantity2 = () => {
  return {
      type: types.REMOVE_ALL_VISITORTYPE_QUANTITY_EQUAL_ZERO,
  }
} 

export const removeZeroQuantity = (removeId) => {
  return {
      type: types.REMOVE_ALL_VISITORTYPE_QUANTITY_EQUAL_ZERO,
      removeId
  }
} 

export const removeVisitorType = () => {
  return {
      type: types.REMOVE_VISITORTYPE,
  }
}

export const showLoader = () => {
  return {
      type: types.SHOW_LOADER,
  }
}

export const hideLoader= () => {
  return {
      type: types.HIDE_LOADER,
  }
}

export const showLoaderPart = () => {
  return {
      type: types.SHOW_LOADER_PART,
  }
}

export const hideLoaderPart  = () => {
  return {
      type: types.HIDE_LOADER_PART,
  }
}
export const fetchAllCategory = (listCategory) => {
  return {
      type: types.GET_ALL_CATEGORY,
      listCategory
  }
}

export const fetchAllCity = (listCity) => {
  return {
      type: types.GET_ALL_CITY,
      listCity
  }
}

export const removeUserLogin = () => {
  return {
      type: types.REMOVE_USER_LOGIN,
  }
}
