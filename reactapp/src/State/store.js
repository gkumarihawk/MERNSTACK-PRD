import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';

//import thunk from "redux-thunk"; //is used to pipeline the dispatched objects and give us a feeling of sync execution by being async

import UserReducer from "./User/userReducer";
import ProductReducer from "./Product/productReducer";
import CartReducer from "./Cart/cartReducer";
import CouponReducer from "./Coupon/CouponReducer";
import ordersReducer from "./orders/ordersReducer";
import ReviewReducer from "./Review/reviewReducer";
import NotificationReducer from "./Notification/notificationReducer";

//combine reducer is used to combine all the reducers we need in our store/state
const rootReducer = combineReducers({ 
    UserReducer, ProductReducer, CartReducer, CouponReducer, ordersReducer, ReviewReducer, NotificationReducer //UserReducer : UserReducer  //state.UserReducer.User.userName
})

//create or configure and export the store from this code
export default configureStore(
    {reducer : rootReducer},
    {},//inital state if we want to set from store instead of reducer
    //applyMiddleware(thunk)
)


//
//this would be the definition of store which will get all the reducers combined as one state and do the job broadcasting
//new state to each subscribed component
//import reducers, create/configures store, import middle ware to make calls, combineReducer, export store
//only one store is allowed in one applicaiton, applications data model,
//one reducer per store so we need to combine if multilpe reducers are there
//store sends notification to view for change of state
//this allows to inject middlewares like thunk, promise in application 

//redux - 
//1. store <is centralized data source for react app, combination of multiple state>
//2. reducers/callbacks <initiliaze state(userState) and write functions(reducer) to create new state, upon actions>
//3. action - is an object that contains (actionType - what to do(addproduct removeproduct) and payload (product data in json))