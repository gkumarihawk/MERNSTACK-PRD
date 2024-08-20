
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecentOrders, cancelOrder, removeOrder } from "../../../State/orders/orderAction";
//import CartComponent from "../Cart/CartComponent";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItem } from "../../../State/Cart/CartAction";
import { saveReviewTODb } from "../../../State/Review/reviewAction";

const isWithinRange = (dateTime) => {
  const now = new Date();   
  const orderDate = new Date(dateTime);
  const diff = (now.getTime() - orderDate.getTime())< 2*24*60*60*1000;
  return diff;
};

const RecentOrderComponent = () => {
    const orders = useSelector((state) => state.ordersReducer.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.UserReducer.User);
    const userId = useSelector((state) => state.UserReducer.User._id);
    const productId = useSelector((state) => state.ProductReducer.Product._id);

    //console.log("MAybe print this" + orders.cart)


    const orderStatus = (orderId) => {
        if (isWithinRange(orderId)){
            orders.status = "Cancelled";
        }
        orders.status = "fulfilled";
    }


    console.log("Recent order rerender");

    //const productid = ()
    

    useEffect(() => {
        if(userId){
            dispatch(fetchRecentOrders(userId));
        }
    }, [userId]);

    const handleCancelOrder = (orderId) => {
        //console.log("Order Id: ", orderId);
        if(isWithinRange){
        dispatch(cancelOrder(orderId, userId));
        dispatch(removeItem(orderId));
        }
    }

    //console.log("orders.cart" + orders.cart)
    const handleReview = (id) => {
        //console.log("Product: ", product);
        navigate("/reviews/"+id);
        //dispatch(saveReviewTODb(product));
    }


    let func = (cart)=>{   
            console.log(cart);
            for (const product of cart){
                dispatch(addItemToCart(product));
            }
    }
    
    return(
        <div>
            <h1> Recent Orders </h1>
            {
                orders && orders.length > 0 ?
                    orders.map((order) => {
                        
                        //console.log("Order: ", order);
                        const formattedDate = new Date(order.dateTime).toLocaleString();
                        //console.log(order.dateTime)
                        //console.log("formattedDate: ", formattedDate);
                        //console.log(order.cart)
                        if (order.cart === undefined) {
                            return null;
                        }
                        return (
                            <div key={order._id}>
                                {order.cart.map((item) => (
                                    <table>
                                        <tr>
                                            <th>User</th>
                                            <th>Order</th>
                                            <th>Order Date</th>
                                        </tr>

                                        <tr>
                                            <td>{user.userName}</td>
                                            <td>{item.name}</td>
                                            <td>{formattedDate}</td>
                                        </tr>
                                        <button onClick={() => handleCancelOrder(order._id)} disabled={!isWithinRange(order.dateTime)}>Cancel Order</button>
                                        {!isWithinRange(order.dateTime) && <button onClick={()=>func(order.cart)} >Reorder</button> }
                                        {<button onClick={() => handleReview(item._id)}>Review</button>}
                                    </table>
                                ))}
                            </div>
                        )
                 })
                    : <h4>No Orders To Display</h4>
            }


        </div>

    )

    ////return (
    //    <div>
    //        <h1>Recent Orders</h1>
    //        {
    //            orders && orders.length > 0 ?
    //                orders.map((order) => {
    //                    console.log("Order: ", order);
    //                    const formattedDate = new Date(order.dateTime).toLocaleString();
    //                    console.log(order.dateTime)
    //                    console.log("formattedDate: ", formattedDate);
    //                    if (order.cart === undefined) {
    //                        return null;
    //                    }
    //                    return (
    //                        <div key={order._id}>
    //                            <h3>Order Id: {order._id}</h3>
    //                            <h4>Order Date: {formattedDate} </h4>
    //                            <h4>Status: {orderStatus(order._id)}</h4>
    //                            { <h4>Items: {order.cart.length}</h4> }
    //                            <button onClick={() => handleCancelOrder(order._id)} disabled={!isWithinRange(order.dateTime)}>Cancel Order</button>
    //                            {isWithinRange(order.date) && <button onClick={() => handleReorder(order)}>Reorder</button>}
    //                        </div>
    //                    )
    //                })
    //                : <h4>No Orders To Display</h4>
    //        }
    //    </div>
    //)

}

export default RecentOrderComponent;