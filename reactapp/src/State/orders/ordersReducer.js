// 05-02-2024 - Recentorder Page 
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)
// Make API to Save and Fetch from RecentOrders
// Make a component RecentOrders to Show all previous Orders of current user
// Add a button to Cancel (like) we have remove in CartComponent and then save again, 
// order can be cancelled within 2 days after that it should be marked delivered


import * as ActionTypes from '../actionTypes';

const INITIAL_STATE = {
    orders: [],
    loading: false,
    error: null
}


export default function ordersReducer(state = INITIAL_STATE, action){
    console.log("Orders Reducer", state, action);
    switch(action.type){
        case ActionTypes.ADD_RECENT_ORDER:
            return {...state, loading: true, error: null}
        //case ActionTypes.UPDATE_RECENT_ORDERS:
        //    if(order._id == action.payload.order._id){
        //        return Object.assign(order,{status: action.payload.status});
        //    }
        //    else return order;
        //case ActionTypes.REMOVE_RECENT_ORDER:
        //    return state.filter(order => order._id != action.payload.order._id);
        case ActionTypes.GET_RECENT_ORDERS_SUCCESS:
            return {...state, orders: action.payload.orders, loading: false, error: null}
        case ActionTypes.GET_RECENT_ORDERS_FAILED:
            return {...state,orders: action.payload.orders, loading: false, error: action.payload.error}
        case ActionTypes.CANCEL_ORDER_SUCCESS:
            const updatedOrders = state.orders.filter(order => order._id != action.payload);
            console.log("Updated Orders", updatedOrders )
            return {...state, orders: updatedOrders, loading: false, error: null}
        case ActionTypes.CANCEL_ORDER_FAILED:
            return {...state, loading: false, error: action.payload.error}
        case ActionTypes.GET_CANCELLED_ORDERS_SUCCESS:
            return {...state, orders: action.payload.orders, loading: false, error: null}
        case ActionTypes.GET_CANCELLED_ORDERS_FAILED:
            return {...state, orders: action.payload.orders, loading: false, error: action.payload.error}
        case ActionTypes.REMOVE_ORDER:
            return {...state, orders: state.orders.filter(order => order._id != action.payload.orderid)}
        case ActionTypes.UPDATE_STATUS:
            return {...state, orders: state.orders.map(order => order._id == action.payload.orderid ? {...order, status: action.payload.status} : order)}
        default:
            return state;
    }
}



