import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducers,
  productDetailsReducers,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";

import { authReducer, forgotPasswordReducer, userReducer, allUsersReducer, userDetailsReducer  } from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";

import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducers = combineReducers({
  products: productReducers,
  product: productReducer,
  productDetails: productDetailsReducers,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart : cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,   
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});
 
let initialState = {
  cart:{
    cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
  }
};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
