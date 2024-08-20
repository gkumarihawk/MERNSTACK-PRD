// 06-02-2024 - Cancelled Orders
// Save the order to CancelledOrders collection (should have userid, cancelled, dateTime)
// Make API to Save and Fetch from CancelledOrders
// Make a component CancelledOrders to Show all cancelled Orders of current user in Latest First
// Add a button to Buy Again, (also show a message - This offer is much more exciting)
// Upon Adding this should get appended to the existing Cart that is shown in Carts App


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCancelledOrders } from "../../../State/orders/orderAction";
import { useEffect } from "react";
import { addItemToCart, removeItem } from "../../../State/Cart/CartAction";

const CancelledOrderComponent = () => {
    const orders = useSelector((state) => state.ordersReducer.orders);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.UserReducer.User);
    const userId = useSelector((state) => state.UserReducer.User._id);

    console.log("Cancelled order rerender");
    //console.log(orders)

    console.log("Why not working?: ", orders);

    useEffect(() => {
        if(userId){
            dispatch(fetchCancelledOrders(userId));
            //dispatch(removeOrderFromStore(orders._id))
        }
    }, [userId]);

    let func = (cart)=>{   
        console.log(cart);
        for (const product of cart){
            dispatch(addItemToCart(product));
        }
}

    return(
        <div>
            <h1> Cancelled Orders </h1>
            {
                orders && orders.length > 0 ?
                    orders.map((order) => {
                        
                        console.log("Order: ", order);
                        const formattedDate = new Date(order.dateTime).toLocaleString();
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
                                   
                                    {<button onClick={() => func(order.cart)}>Reorder</button>}
                                    </table>
                                ))}
                            </div>   
                        )
                        
                    })
                    : <h3> No Orders Found </h3>
            }
        </div>
    )

        }
export default CancelledOrderComponent;
