// 05-02-2024 - Recentorder Page 
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)
// Make API to Save and Fetch from RecentOrders
// Make a component RecentOrders to Show all previous Orders of current user
// Add a button to Cancel (like) we have remove in CartComponent and then save again, 
// order can be cancelled within 2 days after that it should be marked delivered

import * as ActionTypes from '../actionTypes';

export const addOrderToStore = (order)=>{
    return {type: ActionTypes.ADD_RECENT_ORDER, payload: order}
}
export const removeOrder = (orderid) => ({
    type: ActionTypes.REMOVE_ORDER,
    payload: { orderid }//id: 4
});

export const updateOrderStatus = (orderid, status) => ({
    type: ActionTypes.UPDATE_STATUS,
    payload: {
        orderid, //id : 5
        status // update the quantity
    }
});

//export const removeOrderFromStore = (orderid)=>{
//    return {type: ActionTypes.REMOVE_ORDER, payload: orderid}
//}


export const saveOrderToDb = (userid, cart, date=new Date(), status = "pending",)=>{

    console.log("Items To Be Saved", cart); 
    return function(dispatch) {
        //dispatch(loading(true));
        window.fetch("http://localhost:9000/recentorders/api/placedOrder",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid, cart, dateTime: date, status})})
        .then (response => response.json())
        .then (orderresponse => {
            //console.log("response ", orderresponse);
            //dispatch(addOrderToStore(orderresponse.data));
            dispatch({type: ActionTypes.ADD_RECENT_ORDER, payload: orderresponse.data}) 
            // addOrderToStore(orderresponse.data);
            //dispatch(loading(false));
        })
        .catch((err)=>{
            //dispatch(loading(false));
            console.log("Error While Saving Orders", err);
        }) 
    }
}

export const fetchRecentOrders = (userid) => {
    return function(dispatch) {
       // console.log("Get List Of orders");
        //console.log("userId", userid);
        window.fetch("http://localhost:9000/recentorders/api/getRecentOrders",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userid})})
        .then (response => response.json())
        .then (orderresponse => {
            //console.log("Are we getting here")
            //console.log("response - get user Orders", orderresponse);
            dispatch({type: ActionTypes.GET_RECENT_ORDERS_SUCCESS, payload: {orders: orderresponse.data}})
        })
        .catch((err)=>{
            console.log("Error While Login", err)
        })  
    }
}

export const isWithinRange = (dateTime) => {
    const now = new Date();   
    const orderDate = new Date(dateTime);
    const diff = (now.getTime() - orderDate.getTime())< 2*24*60*60*1000 ;
    return diff;
}

export const cancelOrder = (orderId, userid) => {
    return (dispatch, getState) => {
        console.log("order to cancel", orderId)
        const { orders: recentOrders } = getState().ordersReducer;
        //console.log("recentOrders", recentOrders);
        const orderToCancel = recentOrders.find(order => order._id === orderId);

        if (orderToCancel && isWithinRange(orderToCancel.dateTime)) {
    
            window.fetch("http://localhost:9000/recentorders/api/cancelOrder",{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({orderId})})
            .then (response => response.json())
            .then (orderresponse => {
                orderresponse.status === "Cancelled" ? console.log("Order Cancelled") : console.log("Order Not Cancelled")
                console.log("response - get user Orders", orderresponse);
                //console.log(" LALALA" ,orderresponse.success)
                //if (orderresponse.success) {
                if (orderresponse.status === "Cancelled") {
                    console.log("Are we getting here");
                    //console.log("Hello from gauri")
                    dispatch({type: ActionTypes.CANCEL_ORDER_SUCCESS, payload: {orderId}})
                    dispatch(fetchRecentOrders(userid));
                    //dispatch(removeOrder(orderId));
                    
                    dispatch(updateOrderStatus(orderId, "cancelled"))
                    //dispatch({type: ActionTypes.REMOVE_ORDER, payload: {orderId}})
                }
                else{
                    dispatch({type: ActionTypes.CANCEL_ORDER_FAILED, payload: {orderId}})
                }
            })
            .catch((err)=>{
                console.log("Error While Login", err)
            })
        } else {
            dispatch({type: ActionTypes.CANCEL_ORDER_FAILED, payload: {orderId}})
        }
    }
}

export const fetchCancelledOrders = ( userid) => {
    return function(dispatch) {
        console.log("Get List Of Cancelled orders");
        window.fetch("http://localhost:9000/recentorders/api/getCancelledOrders",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userid})})
        .then (response => response.json())
        .then (orderresponse => {
            //console.log("response - get user Orders", orderresponse);
            dispatch({type: ActionTypes.GET_CANCELLED_ORDERS_SUCCESS, payload: {orders: orderresponse.data}})
            //dispatch(removeOrder(orderId))
        })
        .catch((err)=>{
            console.log("Error While Login", err)
        })  
    }
}



//export const fetchRecentOrders = (userid) => {
//    return function(dispatch) {
//        console.log("Get List Of orders");
//        window.fetch("http://localhost:9000/order/api/getRecentOrders",{
//            method: 'POST',
//            body: JSON.stringify({userid})})
//        .then (response => response.json())
//        .then (orderresponse => {
//            console.log("response - get user Orders", orderresponse);
//            for (const order of orderresponse.order) {
//            dispatch(addOrderToStore(order));
//            }
//        })
//        .catch((err)=>{
//            console.log("Error While Login", err)
//        })  
//    }
//}
//
//export const cancelOrder = (id) => {
//    return function(dispatch) {
//        console.log("Get List Of orders");
//        window.fetch("http://localhost:9000/order/api/cancelOrder",{
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({id})})
//        .then (response => response.json())
//        .then (orderresponse => {
//            console.log("response - get user Orders", orderresponse);
//            dispatch(updateOrderStatus(id, "cancelled"));
//            dispatch(addOrderToStore(orderresponse.data));
//        })
//        .catch((err)=>{
//            console.log("Error While Login", err)
//        })  
//    }
//}
//
//export const updateOrder = (id, status) => {
//    return function(dispatch) {
//        console.log("Get List Of orders");
//        window.fetch("http://localhost:9000/order/api/updateOrder",{
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            })
//        .then (response => response.json())
//        .then (orderresponse => {
//            for (const order of orderresponse.order) {
//                switch (status) {
//                    case "delivered order":
//                        dispatch(addOrderToStore(orderresponse.data));
//                    case "cancelled order":
//                        //dispatch(updateOrderStatus(order._id, "cancelled"));   
//                    default:
//                    let dateDiff = new Date() - new Date(order.dateOrdered).getTime();   
//                    if (dateDiff > 172800000) {
//                        dispatch(updateOrderStatus(order._id, "delivered order"));
//                        dispatch(addOrderToStore(orderresponse.data));
//                    }
//                }
//            }
//        })
//        .catch((err)=>{
//            console.log("Error While Login", err)
//        })  
//    }
//}
//


